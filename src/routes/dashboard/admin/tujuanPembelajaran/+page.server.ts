import { db } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const cpData = await db.query.cpTable.findMany({
    with: {
      tp: true,
      subject: {
        columns: {
          subjectName: true
        }
      }
    }
  });

  return {
    cpData
  };
};
