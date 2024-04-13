import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  subjectId: z.string().nullable(),
  capaianPembelajaran: z.string().min(2),
  phase: z.coerce.number().gt(0)
});

export type FormSchema = typeof formSchema;
