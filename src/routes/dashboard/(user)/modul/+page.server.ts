import { db } from '$lib/server';
import { modulTable, cpTable, classTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ( event ) => {

  const tpData = await db.query.tpTable.findMany({})

  const modulData = await db.query.modulTable.findMany({
    where: eq(modulTable.userId, event.locals.user!.id),
    with: {
      tp: { 
        columns: {
          tujuanPembelajaran: true
        }
      }
    }
  });

  const filteredTpData = tpData.filter(tp => {
    if (event.locals.user!.role === 2) {
      return tpData;
    } else {
      return tp.userId === event.locals.user!.id;
    }
  });

  return {
    tpData: filteredTpData,
    modulData
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
