import { db } from '$lib/server';
import {
  classTable,
  cpTable,
  nilaiTable,
  studentTable,
  subjectTable,
  tpTable
} from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { and, eq, isNotNull, ne, sql } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async ({ params, locals }) => {
  const studentId = params.studentId;
  const classId = params.classId;
  const id = params.nilaiId;

  const data = await db.query.nilaiTable.findFirst({
    where: eq(nilaiTable.id, id)
  });

  const student = await db.query.studentTable.findFirst({
    where: eq(studentTable.id, studentId),
    columns: {
      studentName: true
    }
  });

  const tpData = await db
    .select({
      tpId: tpTable.id,
      tpName: tpTable.tujuanPembelajaran
    })
    .from(tpTable)
    .where(eq(tpTable.userId, locals.user!.id));

  return {
    form: await superValidate(data, zod(formSchema)),
    tpData,
    studentId,
    classId,
    student
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

    const exist = await db.query.nilaiTable.findFirst({
      where: and(ne(nilaiTable.id, form.data.id), eq(nilaiTable.tpId, form.data.tpId))
    });

    if (exist) {
      return setError(form, 'tpId', 'Score already exist for this tp');
    }

    await db
      .insert(nilaiTable)
      .values({
        id: form.data.id,
        tpId: form.data.tpId,
        nilai: form.data.nilai,
        studentId: event.params.studentId
      })
      .onConflictDoUpdate({
        target: nilaiTable.id,
        set: {
          tpId: form.data.tpId,
          nilai: form.data.nilai
        }
      });

    return {
      form
    };
  }
};
