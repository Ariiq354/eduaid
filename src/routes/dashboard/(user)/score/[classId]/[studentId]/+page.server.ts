import { db } from '$lib/server';
import { cpTable, nilaiTable, studentTable, subjectTable, tpTable } from '$lib/server/schema';
import { eq, avg } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const studentId = params.studentId;
  const classId = params.classId;

  const scoreData = await db
    .select({
      subjectName: subjectTable.subjectName,
      tpName: tpTable.tujuanPembelajaran,
      score: nilaiTable.nilai
    })
    .from(nilaiTable)
    .where(eq(nilaiTable.studentId, studentId))
    .fullJoin(tpTable, eq(nilaiTable.tpId, tpTable.id))
    .fullJoin(cpTable, eq(tpTable.cpId, cpTable.id))
    .fullJoin(subjectTable, eq(cpTable.subjectId, subjectTable.id));

  return {
    scoreData,
    classId
  };
};
