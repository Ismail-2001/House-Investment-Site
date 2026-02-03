import { GoogleGenAI, Type, Modality } from "@google/genai";
import { MarketTrend, AssetAnalysis, GroundingSource, Property } from "../types";

// Initialize the Gemini AI client
// Note: process.env.API_KEY is injected by the platform securely
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Utility for exponential backoff retries on transient API errors (429, 503)
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error.status === 429 || error.status >= 500)) {
      console.warn(`Gemini API transient error. Retrying in ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const generateAIResponse = async (userPrompt: string): Promise<{ text: string; sources: GroundingSource[] }> => {
  return withRetry(async () => {
    try {
      const systemInstruction = `
        You are Aura AI, a senior investment advisor for Aura Hospitality Investments.
        Your tone is authoritative, elegant, and highly professional.
        Use Google Search to provide up-to-date market data about luxury hospitality, current interest rates, or specific regional news.
        Always frame answers in the context of institutional real estate investment.
        If you use search data, ensure it is integrated naturally.
        Keep responses concise (under 120 words).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleSearch: {} }],
          temperature: 0.7,
        },
      });

      const sources: GroundingSource[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({
              title: chunk.web.title || "Market Source",
              uri: chunk.web.uri
            });
          }
        });
      }

      return { 
        text: response.text || "I am currently synthesizing global market data. Please rephrase your query.",
        sources: sources
      };
    } catch (error) {
      console.error("Gemini Advisor Error:", error);
      return { text: "Our intelligence systems are temporarily offline for calibration. Please try again shortly.", sources: [] };
    }
  });
};

export const analyzeAsset = async (property: Property): Promise<AssetAnalysis> => {
  return withRetry(async () => {
    try {
      const prompt = `Analyze this luxury hospitality asset for an institutional investor:
      Name: ${property.name}
      Location: ${property.location}
      Projected ROI: ${property.roi}%
      Valuation: ${property.value}
      Tags: ${property.tags.join(', ')}
      
      Provide a professional breakdown in JSON format.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              marketMoat: { type: Type.STRING, description: "Competitive advantage of the location and asset type." },
              revenueDrivers: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Key operational or market factors that will drive yield." 
              },
              riskMitigation: { type: Type.STRING, description: "How potential downsides are addressed." },
              exitStrategy: { type: Type.STRING, description: "Potential liquidity events or long-term hold benefits." }
            },
            required: ["marketMoat", "revenueDrivers", "riskMitigation", "exitStrategy"]
          },
          systemInstruction: "You are a top-tier private equity analyst. Be specific, data-oriented, and realistic. Do not use generic corporate speak."
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Asset Analysis Error:", error);
      throw error;
    }
  });
};

export const generateSpeech = async (text: string): Promise<Uint8Array | null> => {
  return withRetry(async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this investment update clearly and professionally: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return decode(base64Audio);
      }
      return null;
    } catch (error) {
      console.error("TTS Generation Error:", error);
      return null;
    }
  });
};

// Helper for Base64 Decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Fetches market trends with a 12-hour local cache to optimize API consumption.
 */
export const fetchMarketTrends = async (): Promise<MarketTrend[]> => {
  const CACHE_KEY = 'aura_market_trends_cache';
  const CACHE_TIME_KEY = 'aura_market_trends_timestamp';
  const TWELVE_HOURS = 12 * 60 * 60 * 1000;

  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < TWELVE_HOURS) {
    console.debug("Loading Market Trends from persistent cache...");
    return JSON.parse(cachedData);
  }

  return withRetry(async () => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Identify 3 emerging, high-impact trends in the global luxury hospitality investment market for 2025. Focus on asset value drivers.",
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
          systemInstruction: "Senior real estate investment analyst persona. Descriptions under 25 words."
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        const trends = data.trends || [];
        localStorage.setItem(CACHE_KEY, JSON.stringify(trends));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        return trends;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch market trends", error);
      return [
         { title: "Hyper-Personalization", description: "AI-driven guest profiles enabling ultra-bespoke stays that justify significant ADR premiums." },
         { title: "Net-Positive Assets", description: "Hotels generating their own power and water are seeing 15% valuation premiums." },
         { title: "Micro-Destination Alpha", description: "Investors moving into secondary luxury markets (Albania, Montenegro) for higher yield floors." }
      ];
    }
  });
};
