// /app/api/getContent/route.ts (Note the .ts extension for TypeScript)

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse, NextRequest } from 'next/server'; // Import NextResponse and NextRequest

// Define a custom error type for situations where the response is not a string
interface CustomError extends Error {
  code?: string; // Option to add a custom code to the error.
}

export async function GET(req: NextRequest) {
  // Correctly type the req object
  try {
    // Replace with your API URL and token
    const model_name = 'gemini-1.5-flash';
    const apiToken = process.env.GEMINI_API_TOKEN; // Access environment variable

    if (!apiToken) {
      throw new Error('GEMINI_API_TOKEN environment variable is not set.');
    }

    const genAI = new GoogleGenerativeAI(apiToken); // Correct: Pass API key directly
    const model = genAI.getGenerativeModel({ model: model_name });

    const searchParams = req.nextUrl.searchParams;
    const prompt = searchParams.get('prompt'); // Get from the query paramater named 'prompt'

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing 'prompt' parameter in the query." },
        { status: 400 },
      );
    }

    const result = await model.generateContent(prompt);
    const response = await result.response; // get the response of the result

    if (!response.text()) {
      // Correctly check for text content
      throw new Error('No text response from Gemini API.');
    }

    const data = response.text();

    return NextResponse.json(
      { data },
      {
        status: 200,
      },
    );
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message; // Use error.message which is always a string if it is an error object
      if ((error as CustomError).code === 'NO_TEXT_RESPONSE') {
        statusCode = 502; // Custom error code
      }
    }

    return NextResponse.json({ error: errorMessage, status: statusCode });
  }
}
