import { validateAIResponse, AIResponseOutput } from './validation';

/**
 * Handles the messy reality of LLM outputs.
 * Cleans markdown, attempts JSON recovery, and enforces our schema.
 */
export function processAIResponse(rawResponse: string): AIResponseOutput {
  try {
    // Strip markdown wrappers (```json ... ```) that models often include
    const cleaned = rawResponse.replace(/```json|```/g, '').trim();
    
    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      // Fallback: If the model blabbered before/after the JSON, try to extract the first {} block
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON structure found in AI response');
      parsed = JSON.parse(jsonMatch[0]);
    }

    // Strictly enforce the schema defined in validation.ts
    const validation = validateAIResponse(parsed);
    
    if (!validation.success) {
      // Log the specific validation errors for debugging but don't leak internals to the client
      console.error('AI Schema Mismatch:', validation.error.format());
      throw new Error('AI output failed to meet project structural requirements');
    }

    return validation.data;
  } catch (error) {
    console.error('Response Processing Failed:', error);
    throw error;
  }
}
