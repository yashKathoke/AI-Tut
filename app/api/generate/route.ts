import { NextResponse } from 'next/server';
import { validateGenerateRequest } from '@/lib/validation';

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

    // Mock response for now
    const mockData = {
      summary: `Detailed explanation of ${topic} for grade ${grade}.`,
      simplified_summary: `Easy explanation of ${topic} for a ${grade}th grader.`,
      key_points: [
        "Key discovery/concept 1",
        "Key discovery/concept 2",
        "Key discovery/concept 3"
      ],
      quiz: [
        {
          question: `What is a primary component of ${topic}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct_answer: "Option A"
        }
      ]
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
