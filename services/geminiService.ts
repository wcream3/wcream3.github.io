
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiPrankSuggestion, Player } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateCreativePrank(target: Player): Promise<GeminiPrankSuggestion> {
  const prompt = `Generate a creative, harmless, and hilarious "troll" action for a Minecraft 'All The Mons' server. 
  Target Player: ${target.name}
  Current Activity: ${target.recentActivity}
  Inventory: ${target.inventorySummary}
  
  The prank should be unique and take advantage of the Pokémon-themed environment. Avoid anything that actually deletes data or permanently ruins their game.`;

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

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return {
      title: "The Phantom Magikarp",
      description: "Replace all wild pokemon spawns near the player with Level 100 Shiny Magikarps that are uncatchable.",
      logic: "It gives them high hopes only to realize the absurdity of a 100-Magikarp raid.",
      command: "/troll spawn-raid magikarp shiny " + target.name
    };
  }
}
