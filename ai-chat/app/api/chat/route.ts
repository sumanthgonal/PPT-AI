import { NextRequest, NextResponse } from "next/server";
import {
  generatePresentationFromPrompt,
  updatePresentationFromPrompt,
} from "@/services/geminiService";
import { PresentationData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { prompt, currentPresentation, conversationHistory } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let presentationData: PresentationData;

    // If there's a current presentation, update it; otherwise, create new
    if (currentPresentation) {
      presentationData = await updatePresentationFromPrompt(
        currentPresentation,
        prompt
      );
    } else {
      presentationData = await generatePresentationFromPrompt(
        prompt,
        conversationHistory
      );
    }

    return NextResponse.json({
      success: true,
      presentationData,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 }
    );
  }
}
