import { db } from '$lib/server';
import { tpTable, cpTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const cpId = params.cpId;

  const cp = await db.query.cpTable.findFirst({
    where: eq(cpTable.id, cpId),
    columns: {
      capaianPembelajaran: true
    },
    with: {
      subject: {
        columns: {
          subjectName: true
        }
      }
    }
  });

  const tpData = await db.query.tpTable.findMany({
    where: and(eq(tpTable.userId, locals.user!.id), eq(tpTable.cpId, cpId))
  });

  return {
    tpData,
    cpId,
    cp
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
