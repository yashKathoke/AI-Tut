import { z } from 'zod';

export const generateRequestSchema = z.object({
  topic: z.string().min(1, "Topic is required").max(100, "Topic is too long"),
  grade: z.string().min(1, "Grade is required"),
});

export type GenerateRequestInput = z.infer<typeof generateRequestSchema>;

export function validateGenerateRequest(data: any) {
  return generateRequestSchema.safeParse(data);
}
