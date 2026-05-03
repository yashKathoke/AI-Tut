import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, grade } = await req.json();

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
