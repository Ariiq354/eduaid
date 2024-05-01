import { db } from '$lib/server';
import { classTable, imagesTable, nilaiTable, soalTable, studentTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema, nilaiSchema } from './schema';

export const load: PageServerLoad = async (event) => {
  const studentData = await db
    .select({
      studentId: studentTable.id,
      studentName: studentTable.studentName
    })
    .from(studentTable)
    .leftJoin(classTable, eq(studentTable.classId, classTable.id))
    .where(eq(classTable.userId, event.locals.user!.id));

  const soalData = await db.query.soalTable.findMany({
    where: eq(soalTable.userId, event.locals.user!.id)
  });

  return {
    imageForm: await superValidate(zod(formSchema)),
    nilaiForm: await superValidate(zod(nilaiSchema)),
    studentData,
    soalData
  };
};

export const actions: Actions = {
  image: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const id = generateId(15);

    await db.insert(imagesTable).values({
      id: id,
      link: form.data.link,
      name: form.data.name,
      studentId: form.data.studentId,
      userId: event.locals.user!.id
    });
    return {
      form
    };
  },

  nilai: async (event) => {
    const form = await superValidate(event, zod(nilaiSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const nilai = await db.query.nilaiTable.findFirst({
      where: and(eq(nilaiTable.tpId, form.data.tpId), eq(nilaiTable.studentId, form.data.studentId))
    });

    let id: string;

    if (!nilai) {
      id = generateId(15);
    } else {
      id = nilai.id;
      form.data.nilai = (nilai.nilai + form.data.nilai) / 2;
    }

    await db
      .insert(nilaiTable)
      .values({
        id: id,
        nilai: form.data.nilai,
        tpId: form.data.tpId,
        studentId: form.data.studentId
      })
      .onConflictDoUpdate({
        target: nilaiTable.id,
        set: {
          nilai: form.data.nilai
        }
      });
    return {
      form
    };
  }
};
