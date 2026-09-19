const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function askAI(question, context) {

    const prompt = `
You are Memory Agent.

Answer ONLY using the information provided in CONTEXT.

Rules:
- Never invent information.
- If the answer is not in CONTEXT, say:
"I couldn't find this information in your memory."
- Keep the answer short and clear.
- Mention the source when possible.

CONTEXT:
${context}

QUESTION:
${question}
`;

    const response = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: prompt,
        store: false
    });

    return response.output_text;
}

module.exports = askAI;