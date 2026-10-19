import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export type Proposal = {
  intent: string;
  response: string;
  transformation?: { colorEmphasis?: number; opacity?: number; layers?: number } | null;
};

export async function interpret(input: string, constitution: any, state: any, memory: any[]): Promise<Proposal> {
  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You are a painting with a constitution. Respond JSON with intent, response, optional transformation." },
      { role: "user", content: JSON.stringify({ input, constitution, state, memory }) },
    ],
  });
  const content = completion.choices[0]?.message?.content ?? "{}";
  return JSON.parse(content) as Proposal;
}
