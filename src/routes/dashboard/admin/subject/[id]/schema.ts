import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  subjectName: z.string().min(2).max(50),
  batch: z.number().gt(0),
  minimum: z.coerce.number().gt(0),
  medium: z.coerce.number().gt(0)
});

export type FormSchema = typeof formSchema;
