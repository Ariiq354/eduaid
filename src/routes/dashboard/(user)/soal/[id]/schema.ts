import { Title } from '$lib/components/ui/card';
import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  tpId: z.string().min(1, { message: 'Tujuan Pembelajaran must be selected' }),
  soal: z.string(),
  answer: z.string(),
  title: z.string()
});

export type FormSchema = typeof formSchema;
