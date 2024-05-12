import { db } from '$lib/server';
import { classTable, studentTable, userTable } from '$lib/server/schema';
import { count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const classAdminData = await db
    .select({
      count: count()
    })
    .from(classTable);

  const userAdminData = await db
    .select({
      count: count()
    })
    .from(userTable);

  const studentAdminData = await db
    .select({
      count: count()
    })
    .from(studentTable);

  return {
    classAdminData,
    studentAdminData,
    userAdminData
  };
};
