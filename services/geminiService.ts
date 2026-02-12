
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResponse } from "../types";

// Fixed: Initialized GoogleGenAI using process.env.API_KEY directly as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDomain = async (domain: string): Promise<AnalysisResponse> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the website domain: "${domain}". 
    1. Identify the 5-7 most common SEO segments of this website (e.g., Homepage, Blog/Articles, E-commerce/Product Pages, About/Corporate, Services, Contact, Help/Documentation). 
    2. For each segment, provide a plausible example URL based on the domain.
    3. For each example, generate a valid JSON-LD structured data snippet (e.g., Organization, Article, Product, BreadcrumbList, FAQPage).
    4. Provide a brief 1-sentence description of the JSON-LD schema type used for that segment.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          segments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                segmentName: { type: Type.STRING },
                urlExample: { type: Type.STRING },
                jsonLd: { type: Type.STRING, description: "Full JSON-LD string" },
                description: { type: Type.STRING, description: "Brief explanation of the schema used" }
              },
              required: ["segmentName", "urlExample", "jsonLd", "description"]
            }
          }
        },
        required: ["segments"]
      },
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to get a response from Gemini");
  
  return JSON.parse(text) as AnalysisResponse;
};
