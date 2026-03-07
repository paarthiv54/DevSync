import { GoogleGenAI, Type } from "@google/genai";

export const generateProjectScaffold = async (prompt) => {
    // Initialize the Gemini client using the environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = `You are an expert software architect. 
Given a high-level project description, generate a professional project description and a list of relevant technology stack tags. 
Keep the description concise, professional, and between 2-4 sentences. 
For tags, list the primary programming languages, frameworks, and methodologies (e.g., React, Node.js, MongoDB, Agile).`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            desc: {
                type: Type.STRING,
                description: "A professional, fleshed-out description of the project based on the user prompt."
            },
            tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Relevant technology stack tags and programming languages (e.g., React, Node.js, Python, Agile)."
            }
        },
        required: ["desc", "tags"]
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });

        // The response text is guaranteed to match the JSON schema
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Warp Drive Generation Error:", error);
        throw new Error("Failed to generate project details via AI.");
    }
};
