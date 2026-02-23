
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrls = async (urls: string[]): Promise<AnalysisResponse> => {
  const urlListString = urls.join("\n");
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the following list of URLs and generate valid JSON-LD structured data for each one. 
    URLs:
    ${urlListString}

    For each URL:
    1. Determine the most appropriate Schema.org type based on the URL structure (e.g., Product, Article, FAQPage, BreadcrumbList, LocalBusiness, Organization, etc.).
    2. Generate a valid JSON-LD snippet. IMPORTANT: The JSON must be PRETTY-PRINTED with standard 2-space indentation and clear line breaks to ensure maximum readability.
    3. Provide a brief explanation of why that schema type was chosen.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          results: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                url: { type: Type.STRING },
                schemaType: { type: Type.STRING },
                jsonLd: { type: Type.STRING, description: "Full JSON-LD string, pretty-printed with 2-space indentation" },
                explanation: { type: Type.STRING, description: "Brief explanation of the schema choice" }
              },
              required: ["url", "schemaType", "jsonLd", "explanation"]
            }
          }
        },
        required: ["results"]
      },
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to get a response from Gemini");
  
  return JSON.parse(text) as AnalysisResponse;
};
