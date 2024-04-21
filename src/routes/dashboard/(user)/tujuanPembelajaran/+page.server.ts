import { db } from '$lib/server';
import { tpTable, cpTable, classTable, subjectTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { count, eq, isNotNull, ne, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const sq = db
    .select({
      phase: sql<number>`CASE
    WHEN batch IN (1, 2) THEN 1
    WHEN batch IN (3, 4) THEN 2
    WHEN batch IN (5, 6) THEN 3
    ELSE NULL
    END `.as('phasecolumn')
    })
    .from(classTable)
    .where(eq(classTable.userId, event.locals.user!.id))
    .as('sq');

  const testData = await db
    .select({
      cpId: cpTable.id,
      capaianPembelajaran: cpTable.capaianPembelajaran,
      tpCount: count(tpTable.id)
    })
    .from(cpTable)
    .leftJoin(tpTable, eq(tpTable.cpId, cpTable.id))
    .leftJoin(subjectTable, eq(cpTable.subjectId, subjectTable.id))
    .leftJoin(sq, eq(subjectTable.phase, sq.phase))
    .where(isNotNull(sq.phase))
    .groupBy(cpTable.capaianPembelajaran);

  // const classData = await db.query.classTable.findFirst({
  //   where: eq(classTable.userId, event.locals.user!.id)
  // });

  // const cpData = await db.query.cpTable.findMany({});
  // const tpData = await db.query.tpTable.findMany({});

  // const filteredCpData = cpData.filter((cp) => {
  //   if (event.locals.user!.role === 2) {
  //     return cpData;
  //   } else if (classData!.batch === 1 || classData!.batch === 2) {
  //     return cp.phase === 1;
  //   } else if (classData!.batch === 3 || classData!.batch === 4) {
  //     return cp.phase === 2;
  //   } else if (classData!.batch === 5 || classData!.batch === 6) {
  //     return cp.phase === 3;
  //   }
  //   return false;
  // });

  return {
    testData
    // tpData
  };
};

export const actions: Actions = {
  delete: async ({ url }) => {
    const id = url.searchParams.get('id');
    if (!id) {
      return fail(400, { message: 'invalid request' });
    }

    try {
      await db.delete(tpTable).where(eq(tpTable.id, id));
    } catch (error) {
      return fail(500, { message: 'something went wrong' });
    }

    return;
  }
};
