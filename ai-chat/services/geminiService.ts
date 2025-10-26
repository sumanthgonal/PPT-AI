import { GoogleGenerativeAI } from "@google/generative-ai";
import { PresentationData } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generatePresentationFromPrompt(
  prompt: string,
  conversationHistory: string = ""
): Promise<PresentationData> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp"
    });

    const systemPrompt = `You are an AI assistant that creates PowerPoint presentations.

Your task is to generate structured presentation content based on user prompts.

IMPORTANT: You must respond ONLY with valid JSON in this exact format:
{
  "title": "Presentation Title",
  "slides": [
    {
      "title": "Slide Title",
      "content": ["Point 1", "Point 2", "Point 3"],
      "layout": "titleAndContent",
      "notes": "Optional speaker notes"
    }
  ]
}

Rules:
1. Generate 5-10 slides for a complete presentation
2. Each slide should have a clear title
3. Content should be in bullet points (array of strings)
4. Layout can be: "title", "content", or "titleAndContent"
5. Include speaker notes when appropriate
6. Make content professional and well-structured
7. Return ONLY the JSON object, no additional text or markdown formatting

${conversationHistory ? `\n\nPrevious conversation context:\n${conversationHistory}` : ""}

User prompt: ${prompt}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    let text = response.text();

    // Clean the response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const presentationData: PresentationData = JSON.parse(text);

    return presentationData;
  } catch (error) {
    console.error("Error generating presentation:", error);
    throw new Error("Failed to generate presentation content");
  }
}

export async function updatePresentationFromPrompt(
  currentPresentation: PresentationData,
  updatePrompt: string
): Promise<PresentationData> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp"
    });

    const systemPrompt = `You are an AI assistant that edits PowerPoint presentations.

Current presentation:
${JSON.stringify(currentPresentation, null, 2)}

User wants to make this change: ${updatePrompt}

IMPORTANT: You must respond ONLY with valid JSON in this exact format:
{
  "title": "Updated Presentation Title",
  "slides": [
    {
      "title": "Slide Title",
      "content": ["Point 1", "Point 2", "Point 3"],
      "layout": "titleAndContent",
      "notes": "Optional speaker notes"
    }
  ]
}

Apply the requested changes and return the complete updated presentation.
Return ONLY the JSON object, no additional text or markdown formatting.`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    let text = response.text();

    // Clean the response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const updatedPresentation: PresentationData = JSON.parse(text);

    return updatedPresentation;
  } catch (error) {
    console.error("Error updating presentation:", error);
    throw new Error("Failed to update presentation content");
  }
}
