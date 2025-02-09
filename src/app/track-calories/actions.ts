"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function estimateCalories(imageDataUrl: string) {
  try {
    const base64Image = imageDataUrl.split(",")[1];

    const { text } = await generateText({
      model: openai("gpt-4-vision-preview"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "How many calories are in the food shown in this image? Please provide an estimate and a brief explanation.",
            },
            { type: "image", image: base64Image },
          ],
        },
      ],
    });

    return text;
  } catch (error) {
    console.error("Error estimating calories:", error);
    return "Sorry, there was an error estimating the calories. Please try again.";
  }
}
