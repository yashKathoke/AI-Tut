import { GoogleGenAI } from "@google/genai";
import { GenerateResponse } from '@/types';
import { processAIResponse } from './processing';
import { paraphraseForGrade } from './paraphrase';

const ai = new GoogleGenAI({});

export async function generateContent(topic: string, grade: string): Promise<GenerateResponse> {
  const prompt = `
    You are an educational assistant. Generate structured educational content for a grade ${grade} student on the topic: "${topic}".
    
    You MUST return a valid JSON object with the following structure:
    {
      "summary": "A clear, age-appropriate explanation of the topic.",
      "simplified_summary": "A placeholder for simplification.",
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
    
    const text = response.text;
    if (typeof text !== 'string') {
      throw new Error('AI response is missing or malformed');
    }
    
    const content = processAIResponse(text);

    // Second pass: Enhancing the simplified summary for better quality
    content.simplified_summary = await paraphraseForGrade(content.summary, grade);

    return content;
  } catch (error) {
    console.error('Content Generation Workflow Failed:', error);
    throw error;
  }
}
