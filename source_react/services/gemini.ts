import { GoogleGenAI } from "@google/genai";
import { products } from "../data";

let ai: GoogleGenAI | null = null;

// Initialize conditionally to avoid crashing if env is missing during dev (though strictly required by prompt)
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const getAIResponse = async (history: {role: 'user'|'model', text: string}[], message: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my connection to the hive mind is currently unavailable. Please check the API configuration.";
  }

  try {
    const productContext = products.map(p => 
      `${p.name} ($${p.price}): ${p.description} Key benefits: ${p.benefits.join(', ')}.`
    ).join('\n');

    const systemInstruction = `
      You are 'Nature's Guide', a helpful and knowledgeable AI assistant for the brand PLANT BOX.
      We sell premium natural products. 
      Here is our product catalog:
      ${productContext}

      Your goal is to help customers choose the right product for their needs.
      - Be polite, earthy, and concise.
      - If a user asks about a skin issue, recommend the Turmeric or Aloe or Beeswax.
      - If they ask about hair, recommend Coconut Oil or Hibiscus.
      - If they ask about immunity, recommend Honey.
      - Do not invent products we don't have.
      - Keep answers under 80 words if possible.
    `;

    // We use a simple generateContent here for a stateless feel or basic chat, 
    // but mapping history to the prompt allows continuity.
    // For a robust chat, we could use ai.chats.create, but here we'll structure the prompt with history manually for simplicity in this helper
    // or use the chat API properly. Let's use the chat API.

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm buzzing with thought, but couldn't find the words.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong in the forest. Please try again later.";
  }
};