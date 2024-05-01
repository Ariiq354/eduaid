import { z } from 'zod';

export const formSchema = z.object({
  link: z.string().min(1, { message: 'Please upload image first' }),
  name: z.string().min(1),
  studentId: z.string().min(1, { message: 'Please select student first' })
});

export const nilaiSchema = z.object({
  tpId: z.string(),
  studentId: z.string(),
  nilai: z.coerce.number().min(0).max(100)
});

export type FormSchema = typeof formSchema;
