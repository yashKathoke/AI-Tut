import { z } from 'zod';

export const generateRequestSchema = z.object({
  topic: z.string().min(1, "Topic is required").max(100, "Topic is too long"),
  grade: z.string().min(1, "Grade is required"),
});

export const quizQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string()).length(4, "Each question must have exactly 4 options"),
  correct_answer: z.string().min(1),
});

export const aiResponseSchema = z.object({
  summary: z.string().min(1),
  simplified_summary: z.string().min(1),
  key_points: z.array(z.string()).min(3).max(5),
  quiz: z.array(quizQuestionSchema).length(3, "Quiz must have exactly 3 questions"),
});


export function validateGenerateRequest(data: any) {
  return generateRequestSchema.safeParse(data);
}

export function validateAIResponse(data: any) {
  return aiResponseSchema.safeParse(data);
}
