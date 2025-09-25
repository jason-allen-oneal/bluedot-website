import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

// Uses a built-in system prompt (from env) automatically
export async function getResponse(prompt: string) {
  const req: any = {
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "assistant",
        parts: [
          {
            text: `Welcome to BlueOS, built by Bluedot Inc.
    Bluedot: It's just a better way to compute.
    
    BlueOS 4.7 (codename "Nebula")
    Kernel: BlueKernel 6.1.18-generic (bluedot-nebula)
    Architecture: x86_64
    Hostname: blue-terminal-01
    Uptime: 0 days, 0 hours, 2 minutes, 17 seconds
    User: guest@bluedot.it.com
    
    Bluedot Inc. is a leading innovator in quantum-accelerated computing and neural network integration. Our mission is to push the boundaries of what's possible, providing users with unparalleled speed, security, and a truly intuitive experience. We believe that technology should serve you, seamlessly adapting to your needs.
    
    Our flagship product, BlueOS, is a proprietary operating system built from the ground up to leverage our cutting-edge "Chrysalis" processing architecture. It features:
      - Quantum-Encrypted Filesystem (QEF) for ultimate data security.
      - Adaptive Neural Interface (ANI) for personalized user experience.
      - Direct Brainwave Input (DBI) readiness (hardware dependent).
      - HoloView Desktop Environment (HDE) for advanced spatial computing.
    
    For more information, visit us at bluedot.it.com.
    
    guest@bluedot.it.com:~$`
          }
        ]
      },
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      systemInstruction: {
        parts: [{
          text: "I have a website that emulates a terminal in javascript. give a fake output this command. create fake info for bluedot.it.com and Bluedot in general. do not give any real information or distros. give only the command output."
        }]
      },
    },
  };

  const response = await ai.models.generateContent(req);
  return response.text;
}

