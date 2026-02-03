import { GoogleGenAI, Type } from "@google/genai";
import { MarketTrend } from "../types";

// Initialize the Gemini AI client
// NOTE: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIResponse = async (userPrompt: string): Promise<string> => {
  try {
    const systemInstruction = `
      You are Aura AI, a sophisticated investment advisor for Aura Hospitality Investments.
      Your tone is professional, elegant, and data-driven.
      You help potential investors understand the hotel market, calculate potential ROI, and learn about Aura's unique value proposition.
      Aura specializes in high-yield luxury properties in Europe, Asia, and North Africa.
      Keep responses concise (under 100 words), persuasive, and formatting clean.
      Do not offer financial advice, but rather "market insights" and "projections".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I am currently analyzing the latest market data. Please try again in a moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our systems are currently experiencing high traffic. Please try again shortly.";
  }
};

export const fetchMarketTrends = async (): Promise<MarketTrend[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Identify 3 emerging, high-impact trends in the global luxury hospitality investment market for the upcoming year. Focus on asset value drivers.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          }
        },
        systemInstruction: "You are a senior real estate investment analyst. Provide concise, high-value insights suitable for institutional investors. Descriptions should be under 25 words."
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.trends || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch market trends", error);
    // Return fallback data if API fails to ensure UI integrity
    return [
       { title: "Experiential Luxury", description: "Shift from material opulence to transformative, authentic local experiences driving higher ADR." },
       { title: "Sustainable High-End", description: "Eco-conscious design and carbon-neutral operations becoming a primary driver of asset valuation." },
       { title: "Wellness Integration", description: "Comprehensive medical-grade wellness facilities becoming a standard expectation for ultra-luxury tier." }
    ];
  }
};