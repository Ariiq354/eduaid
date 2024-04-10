import { db } from '$lib/server';
import { tpTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params }) => {
    const id = params.id;
    const data = await db.query.tpTable.findFirst({
      where: eq(tpTable.id, id),
      with: {
        cp: true
      }
    });
  
    const capaianPembelajaran = await db.query.cpTable.findMany();
  
    return {
      form: await superValidate(data, zod(formSchema)),
      capaianPembelajaran
    };
  };

  
export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    if (!form.data.id) {
      form.data.id = generateId(15);
    }

    await db
      .insert(tpTable)
      .values({
        id: form.data.id,
        cpId: form.data.cpId,
        userId: event.locals.user!.id,
        tujuanPembelajaran: form.data.tujuanPembelajaran
      })
      .onConflictDoUpdate({
        target: tpTable.id,
        set: {
          cpId: form.data.cpId,
          userId: event.locals.user!.id,
          tujuanPembelajaran: form.data.tujuanPembelajaran
        }
      });

    return {
      form
    };
  }
};