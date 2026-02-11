
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiPrankSuggestion, Player } from "../types";

// Safety check for API key to prevent 'ReferenceError' or crashes
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

export async function generateCreativePrank(target: Player): Promise<GeminiPrankSuggestion> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    // Return a default prank if no API key is configured
    return {
      title: "The Ghost Connection",
      description: "Send a series of fake disconnect packets that make the player think their internet is failing, but only when they are near a Legendary.",
      logic: "Panic is the best form of comedy in a high-stakes hunting environment.",
      command: "/troll fake-lag " + target.name
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Generate a creative, harmless, and hilarious "troll" action for a Minecraft 'All The Mons' server. 
  Target Player: ${target.name}
  Current Activity: ${target.recentActivity}
  Inventory: ${target.inventorySummary}
  
  The prank should be unique and take advantage of the Pokémon-themed environment. Avoid anything that actually deletes data or permanently ruins their game.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            logic: { type: Type.STRING, description: "The psychological logic of why this prank is funny." },
            command: { type: Type.STRING, description: "A mock server command that would execute this." }
          },
          required: ["title", "description", "logic", "command"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.warn("Gemini Error:", e);
    return {
      title: "The Phantom Magikarp",
      description: "Replace all wild pokemon spawns near the player with Level 100 Shiny Magikarps that are uncatchable.",
      logic: "It gives them high hopes only to realize the absurdity of a 100-Magikarp raid.",
      command: "/troll spawn-raid magikarp shiny " + target.name
    };
  }
}
