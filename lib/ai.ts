import { GoogleGenAI } from "@google/genai";
import { GenerateResponse } from '@/types';
import { processAIResponse } from './processing';

/**
 * Entry point for AI content generation.
 * Uses Gemini 3.1 Flash for cost-effective, low-latency educational content.
 */
const ai = new GoogleGenAI({});

export async function generateContent(topic: string, grade: string): Promise<GenerateResponse> {
  // Enforce structured output via prompt engineering
  const prompt = `
    You are an educational assistant. Generate structured educational content for a grade ${grade} student on the topic: "${topic}".
    
    You MUST return a valid JSON object with the following structure:
    {
      "summary": "A clear, age-appropriate explanation of the topic.",
      "simplified_summary": "A very simple, beginner-friendly version of the summary.",
      "key_points": ["Point 1", "Point 2", "Point 3"],
      "quiz": [
        {
          "question": "A multiple choice question about the topic.",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correct_answer": "Option A"
        }
      ]
    }
    
    Constraints:
    - 3 to 5 key points.
    - Exactly 3 quiz questions with 4 options each.
    - Tone: Grade ${grade} appropriate.
    - Output: Valid JSON only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    if (!response.text) {
      throw new Error('Upstream AI returned an empty response');
    }
    
    // Delegate parsing and validation to the processing layer
    return processAIResponse(response.text);
  } catch (error) {
    console.error('Gemini API Invocation Failed:', error);
    throw error;
  }
}
