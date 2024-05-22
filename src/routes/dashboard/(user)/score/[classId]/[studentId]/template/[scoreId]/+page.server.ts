import { db } from '$lib/server';
import { cpTable, nilaiTable, studentTable, subjectTable, tpTable } from '$lib/server/schema';
import { avg, eq, max, min, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const studentData = await db.query.studentTable.findFirst({
    where: eq(studentTable.id, params.scoreId),
    with: {
      class: {
        columns: {
          classname: true
        }
      }
    }
  });
  const scoreData = await db
    .select({
      subjectName: subjectTable.subjectName,
      q1: subjectTable.minimum,
      q2: subjectTable.medium,
      averageScore: avg(nilaiTable.nilai),
      maxScore: max(nilaiTable.nilai),
      minScore: min(nilaiTable.nilai),
      maxTp: max(tpTable.tujuanPembelajaran),
      minTp: min(tpTable.tujuanPembelajaran)
    })
    .from(nilaiTable)
    .leftJoin(studentTable, eq(nilaiTable.studentId, studentTable.id))
    .leftJoin(tpTable, eq(nilaiTable.tpId, tpTable.id))
    .leftJoin(cpTable, eq(tpTable.cpId, cpTable.id))
    .leftJoin(subjectTable, eq(cpTable.subjectId, subjectTable.id))
    .groupBy(subjectTable.subjectName)
    .orderBy(subjectTable.subjectName)
    .where(eq(studentTable.id, params.scoreId));

  return {
    scoreData,
    studentData
  };
};

export const ssr = false;
