export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface GenerateRequest {
  topic: string;
  grade: string;
}

export interface GenerateResponse {
  summary: string;
  simplified_summary: string;
  key_points: string[];
  quiz: QuizQuestion[];
}

export interface ErrorResponse {
  error: string;
}
