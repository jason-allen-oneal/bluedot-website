import { NextRequest, NextResponse } from "next/server";
import { apiRateLimit } from "@/lib/rateLimit";
import { getResponse } from "@/lib/gemini";

export async function POST(request: NextRequest) {
    try {
        const rateLimitResult = apiRateLimit(request);
        if (rateLimitResult) {
            return rateLimitResult;
        }

        // Read prompt from POST body
        const { prompt: userPrompt = "" } = await request.json().catch(() => ({}));
        const response = await getResponse(userPrompt);
        console.log(response);
        return NextResponse.json({ response });
    } catch (error) {
        console.error("Error fetching gemini response:", error);
        return NextResponse.json(
          { error: "Failed to fetch response" },
          { status: 500 }
        );
      }
}