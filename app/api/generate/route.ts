import { NextResponse } from 'next/server';
import { validateGenerateRequest } from '@/lib/validation';
import { generateContent } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validation = validateGenerateRequest(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { topic, grade } = validation.data;

    // Generate real content using Gemini API
    const content = await generateContent(topic, grade);

    return NextResponse.json(content);
  } catch (error) {
    console.error('API Error:', error);
    
    // Check if it's an API key issue or something else
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
