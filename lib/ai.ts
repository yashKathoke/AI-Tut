import { GoogleGenAI } from "@google/genai";
import { GenerateResponse } from '@/types';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function generateContent(topic: string, grade: string): Promise<GenerateResponse> {
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
    
    Requirements:
    - Exactly 3-5 key points.
    - Exactly 3 quiz questions.
    - Language must be suitable for grade ${grade}.
    - Return ONLY the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    const text = response.text;
    
    if (!text) {
      throw new Error('AI response is empty');
    }
    
    // Clean potential markdown formatting if AI includes it
    const cleanedText = text.replace(/```json|```/g, '').trim();
    
    return JSON.parse(cleanedText) as GenerateResponse;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate content from AI');
  }
}
