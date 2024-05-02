import { db } from '$lib/server';
import { cpTable, tpTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params }) => {
  const id = params.tpId;
  const cpId = params.cpId;

  const cp = await db.query.cpTable.findFirst({
    where: eq(cpTable.id, cpId),
    columns: {
      capaianPembelajaran: true
    }
  });

  const data = await db.query.tpTable.findFirst({
    where: eq(tpTable.id, id)
  });

  return {
    form: await superValidate(data, zod(formSchema)),
    cpId,
    cp
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
      form.data.id = generateIdFromEntropySize(10);
    }

    await db
      .insert(tpTable)
      .values({
        id: form.data.id,
        cpId: event.params.cpId,
        userId: event.locals.user!.id,
        tujuanPembelajaran: form.data.tujuanPembelajaran
      })
      .onConflictDoUpdate({
        target: tpTable.id,
        set: {
          tujuanPembelajaran: form.data.tujuanPembelajaran
        }
      });

    return {
      form
    };
  }
};
