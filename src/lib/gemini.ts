import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const SYSTEM_INSTRUCTION = process.env.GEMINI_SYSTEM || "";

// Uses a built-in system prompt (from env) automatically
export async function getResponse(prompt: string) {
  const req: any = {
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction: { parts: [{ text: "I have a website that emulates a terminal in javascript. give a fake output this command. create fake info for bluedot.it.com and Bluedot in general. do not give any real information or distros. give only the command output." }] },
    },
  };

  const response = await ai.models.generateContent(req);
  return response.text;
}

