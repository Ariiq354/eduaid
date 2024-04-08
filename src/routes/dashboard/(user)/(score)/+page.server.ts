import { db } from '$lib/server';
import { classTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const classData = await db.query.classTable.findMany({
    where: eq(classTable.userId, event.locals.user!.id)
  });

  return {
    classData
  };
};
