import { db } from '$lib/server';
import { tpTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions} from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params }) => {
  
    const capaianPembelajaran = await db.query.cpTable.findMany();
  
    return {
      form: await superValidate(zod(formSchema)),
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
      return {
        form
      };
    }
};
