import { db } from '$lib/server';
import { soalTable, tpTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params, locals }) => {
  const id = params.id;

  const tp = await db.query.tpTable.findMany({
    where: eq(tpTable.userId, locals.user!.id)
  });

  const data = await db.query.soalTable.findFirst({
    where: eq(soalTable.id, id)
  });

  return {
    form: await superValidate(data, zod(formSchema)),
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
      .insert(soalTable)
      .values({
        id: form.data.id,
        tpId: form.data.tpId,
        userId: event.locals.user!.id,
        soal: form.data.soal,
        answer: form.data.answer,
        title: form.data.title
      })
      .onConflictDoUpdate({
        target: soalTable.id,
        set: {
          tpId: form.data.tpId,
          soal: form.data.soal,
          title: form.data.title,
          answer: form.data.answer
        }
      });

    return {
      form
    };
  }
};
