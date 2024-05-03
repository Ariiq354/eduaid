import { db } from '$lib/server';
import { modulTable, tpTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params }) => {
  const id = params.tpId;
  const tpId = params.tpId;

  const tp = await db.query.tpTable.findFirst({
    where: eq(tpTable.id, tpId),
    columns: {
      tujuanPembelajaran: true
    },
    with: {
      cp: {
        with: {
          subject: {
            columns: {
              subjectName: true
            }
          }
        }
      }
    }
  });

  const data = await db.query.tpTable.findFirst({
    where: eq(tpTable.id, id)
  });

  return {
    form: await superValidate(data, zod(formSchema)),
    tpId,
    tp
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
      .insert(modulTable)
      .values({
        id: form.data.id,
        tpId: event.params.tpId,
        userId: event.locals.user!.id,
        modul: form.data.modul
      })
      .onConflictDoUpdate({
        target: modulTable.id,
        set: {
          modul: form.data.modul
        }
      });

    return {
      form
    };
  }
};
