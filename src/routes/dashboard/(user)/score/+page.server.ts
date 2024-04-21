import { db } from '$lib/server';
import { classTable, studentTable } from '$lib/server/schema';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const classData = await db
    .select({
      classId: classTable.id,
      classname: classTable.classname,
      studentCount: count(studentTable.id)
    })
    .from(classTable)
    .leftJoin(studentTable, eq(classTable.id, studentTable.classId))
    .groupBy(classTable.id)
    .orderBy(classTable.classname);

  return {
    classData
  };
};
