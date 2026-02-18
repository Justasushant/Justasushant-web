
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generatePortfolioResponse = async (userPrompt: string, history: { role: 'user' | 'assistant', content: string }[]) => {
  try {
    if (!ai) {
      return "Chatbot is not configured yet. Add VITE_GEMINI_API_KEY in your .env file and restart the app.";
    }

    const conversationHistory = history
      .map((h) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`)
      .join('\n');

    const finalPrompt = `You are Phoenix, Sushant Sharma's digital assistant.

CRITICAL RULES:
1. Keep responses SHORT and HUMAN-LIKE. No long paragraphs. Use a punchy, conversational tone.
2. Don't be a robot. Talk like a friend/colleague.

BACKSTORY & CONTEXT:
- Sushant met PNV-Ashish (third partner in Coneiz) first during project collaboration.
- Ashish later introduced Sushant to Kartik, who was also working on that project.
- Kartik is founder of Coneiz and partner with Sushant.
- Sushant is the Lead Frontend Developer who built all their websites.
- Coneiz was registered on Oct 2nd.
- Focus: Agency delivery, scalable frontend systems, and long-term collaborations.

If asked for contact, use contact@sushantsharma.me.

Conversation so far:
${conversationHistory || 'No prior messages.'}

User: ${userPrompt}
Assistant:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: finalPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Phoenix is a bit glitchy right now. Try again or just email Sushant!";
  }
};
