"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function estimateCalories(imageDataUrl: string) {
  try {
    const base64Image = imageDataUrl.split(",")[1];

    // const { text } = await generateText({
    //   model: openai("gpt-4-vision-preview"),
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         {
    //           type: "text",
    //           text: "How many calories are in the food shown in this image? Please provide an estimate and a brief explanation.",
    //         },
    //         { type: "image", image: base64Image },
    //       ],
    //     },
    //   ],
    // });
    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral",
          messages: [
            {
              role: "user",
              content:
                "How many calories, protein, fats and carbs are there in belgian waffle one. BE VERY CONSISE",
            },
            // { type: "image", image: base64Image },
          ],
          stream: false,
        }),
      });

      const data = await response.json();
      console.log(data);
      return data.message.content;
    } catch (error) {
      console.error("Error:", error);
    }
  } catch (error) {
    console.error("Error estimating calories:", error);
    return "Sorry, there was an error estimating the calories. Please try again.";
  }
}
