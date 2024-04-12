import { db } from '$lib/server';
import { classTable } from '$lib/server/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const classData = await db.query.classTable.findMany({
    where: eq(classTable.userId, event.locals.user!.id)
  });

  return {
    classData
  };
};
