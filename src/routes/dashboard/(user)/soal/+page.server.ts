import { db } from '$lib/server';
import { soalTable } from '$lib/server/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const soalData = await db.query.soalTable.findMany({
    where: eq(soalTable.userId, locals.user!.id),
    with: {
      tp: {
        columns: {
          tujuanPembelajaran: true
        }
      }
    }
  });

  return {
    soalData
  };
};

export const actions: Actions = {
  delete: async ({ url }) => {
    const id = url.searchParams.get('id');
    if (!id) {
      return fail(400, { message: 'invalid request' });
    }

    try {
      await db.delete(soalTable).where(eq(soalTable.id, id));
    } catch (error) {
      return fail(500, { message: 'something went wrong' });
    }

    return;
  }
};
