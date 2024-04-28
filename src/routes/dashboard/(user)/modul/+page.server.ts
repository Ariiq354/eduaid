import { db } from '$lib/server';
import { modulTable, cpTable, classTable, tpTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { count, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const tpData = await db
    .select({
      tpId: tpTable.id,
      tpName: tpTable.tujuanPembelajaran,
      modulCount: count(modulTable.id)
    })
    .from(tpTable)
    .leftJoin(modulTable, eq(modulTable.tpId, tpTable.id))
    .groupBy(tpTable.id)
    .where(eq(tpTable.userId, event.locals.user!.id));

  return {
    tpData
  };
};
