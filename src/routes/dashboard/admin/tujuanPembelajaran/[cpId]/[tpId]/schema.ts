import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  userId: z.string().min(1, { message: 'Teacher must be selected' }),
  tujuanPembelajaran: z.string().min(2)
});

export type FormSchema = typeof formSchema;
