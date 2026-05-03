import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

/**
 * Simplifies a given text to a specific grade level.
 * This acts as our second-pass paraphrasing layer to ensure readability.
 */
export async function paraphraseForGrade(text: string, grade: string): Promise<string> {
  const prompt = `
    Rewrite the following educational text to be much simpler for a grade ${grade} student.
    Use analogies, shorter sentences, and avoid jargon.
    
    Text to simplify: "${text}"
    
    Output: Only the simplified text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text?.trim() || text; // Fallback to original text if AI fails
  } catch (error) {
    console.error('Paraphrasing Failed:', error);
    return text;
  }
}
