import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  tpId: z.string(),
  nilai: z.number().min(0).max(100)
});

export type FormSchema = typeof formSchema;
