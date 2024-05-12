import { db } from '$lib/server';
import { classTable, modulTable, studentTable } from '$lib/server/schema';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const classData = await db
    .select({
      count: count()
    })
    .from(classTable)
    .where(eq(classTable.userId, event.locals.user!.id));

  const studentData = await db
    .select({
      count: count(studentTable.id)
    })
    .from(studentTable)
    .leftJoin(classTable, eq(classTable.id, studentTable.classId))
    .where(eq(classTable.userId, event.locals.user!.id));

  const modulData = await db
    .select({
      count: count()
    })
    .from(modulTable)
    .where(eq(modulTable.userId, event.locals.user!.id));

  return {
    classData,
    studentData,
    modulData
  };
};
