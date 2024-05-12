import { db } from '$lib/server';
import { cpTable, modulTable, subjectTable, tpTable } from '$lib/server/schema';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const tpData = await db
    .select({
      tpId: tpTable.id,
      tpName: tpTable.tujuanPembelajaran,
      subjectName: subjectTable.subjectName,
      modulCount: count(modulTable.id)
    })
    .from(tpTable)
    .leftJoin(modulTable, eq(modulTable.tpId, tpTable.id))
    .leftJoin(cpTable, eq(cpTable.id, tpTable.cpId))
    .leftJoin(subjectTable, eq(cpTable.subjectId, subjectTable.id))
    .groupBy(tpTable.id)
    .where(eq(tpTable.userId, event.locals.user!.id));

  return {
    tpData
  };
};
