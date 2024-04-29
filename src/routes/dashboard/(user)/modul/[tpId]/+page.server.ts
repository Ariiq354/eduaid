import { db } from '$lib/server';
import { tpTable, modulTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
  const tpId = params.tpId;

  const tp = await db.query.tpTable.findFirst({
    where: eq(tpTable.id, tpId),
    columns: {
      tujuanPembelajaran: true
    }
  });

  const modulData = await db.query.modulTable.findMany({
    where: and(eq(modulTable.userId, locals.user!.id), eq(modulTable.tpId, tpId))
  });

  return {
    modulData,
    tp,
    tpId
  };
};

export const actions: Actions = {
  delete: async ({ url }) => {
    const id = url.searchParams.get('id');
    if (!id) {
      return fail(400, { message: 'invalid request' });
    }

    try {
      await db.delete(modulTable).where(eq(modulTable.id, id));
    } catch (error) {
      return fail(500, { message: 'something went wrong' });
    }

    return;
  }
};
