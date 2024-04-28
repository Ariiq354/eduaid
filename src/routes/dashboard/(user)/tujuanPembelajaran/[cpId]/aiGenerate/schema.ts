import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  cpId: z.string(),
  userId: z.string(),
  tujuanPembelajaran: z.string()
});

export type FormSchema = typeof formSchema;
