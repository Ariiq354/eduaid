import { db } from '$lib/server';
import { classTable, modulTable, studentTable, userTable } from '$lib/server/schema';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

type count = {
  count: number;
};

export const load: PageServerLoad = async (event) => {
  let classAdminData: count[] = [];
  let userAdminData: count[] = [];
  let studentAdminData: count[] = [];

  if (event.locals.user!.role == 2) {
    classAdminData = await db
      .select({
        count: count()
      })
      .from(classTable);

    userAdminData = await db
      .select({
        count: count()
      })
      .from(userTable);

    studentAdminData = await db
      .select({
        count: count()
      })
      .from(studentTable);
  }
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
    .leftJoin(classTable, eq(classTable.id, studentTable.classId));

  const modulData = await db
    .select({
      count: count()
    })
    .from(modulTable)
    .where(eq(modulTable.userId, event.locals.user!.id));

  return {
    classData,
    studentData,
    modulData,
    classAdminData,
    studentAdminData,
    userAdminData
  };
};
