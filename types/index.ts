import { z } from "zod";
import { generateRequestSchema, aiResponseSchema } from "@/lib/validation";

/**
 * Shared Type Definitions
 * We use a mix of static interfaces and Zod-inferred types.
 */

export type GenerateRequestInput = z.infer<typeof generateRequestSchema>;
export type AIResponseOutput = z.infer<typeof aiResponseSchema>;

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface GenerateResponse extends AIResponseOutput {}

export interface ErrorResponse {
  error: string;
}
