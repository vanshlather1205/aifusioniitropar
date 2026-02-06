
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API client using the environment variable directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeMail = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following campus email into a concise, actionable bullet list for a student: \n\n${content}`,
      config: {
        systemInstruction: "You are a helpful campus assistant. Focus on deadlines, locations, and required actions.",
        temperature: 0.7,
      }
    });
    // response.text is a getter property, not a method
    return response.text;
  } catch (error) {
    console.error("Error summarizing mail:", error);
    return "Failed to summarize email. Please try again later.";
  }
};

export const getSmartDiningAdvice = async (currentMenu: string, dietaryPreferences: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Current Menu: ${currentMenu}\nPreferences: ${dietaryPreferences}\nRecommend what I should eat and why.`,
      config: {
        systemInstruction: "You are a campus nutritionist. Give short, punchy advice based on the menu.",
        temperature: 0.5,
      }
    });
    // response.text is a getter property, not a method
    return response.text;
  } catch (error) {
    console.error("Error getting dining advice:", error);
    return "Enjoy your meal!";
  }
};
