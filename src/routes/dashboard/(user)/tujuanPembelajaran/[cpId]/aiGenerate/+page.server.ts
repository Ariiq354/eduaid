import { db } from '$lib/server';
import { tpTable, classTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions} from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params, locals }) => {

    const classData = await db.query.classTable.findFirst({
      where: eq(classTable.userId, locals.user!.id)
    });
  
    const capaianPembelajaran = await db.query.cpTable.findMany();

    const filteredCpData = capaianPembelajaran.filter(cp => {
      if (locals.user!.role === 2) {
        return capaianPembelajaran
      }  else if (classData!.batch === 1 || classData!.batch === 2) {
        return cp.phase === 1;
      } else if (classData!.batch === 3 || classData!.batch === 4) {
        return cp.phase === 2;
      } else if (classData!.batch === 5 || classData!.batch === 6) {
        return cp.phase === 3;
      }
      return false;
    });
  
  
    return {
      form: await superValidate(zod(formSchema)),
      capaianPembelajaran: filteredCpData
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
