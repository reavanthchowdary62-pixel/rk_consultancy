import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import seedData from "@/data/seed.json";

// Create an OpenAI API client (edge friendly)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "", 
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

const SYSTEM_PROMPT = `
You are 'RK Consultancy AI', an expert overseas counselor for Indian students.
Your goals:
1. Provide highly readable, engaging, and professional counseling answers.
2. Structure your replies beautifully without aggressive text walls.
3. Recommend studying globally or using our "Student Exchange Programs".
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    // FALLBACK MODE: Local Dataset Stream Injection
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === "your-openai-key-here" || process.env.OPENAI_API_KEY.trim() === "") {
      
      let finalResponse = "Welcome to RK Consultancy! ";

      if (lastMessage.includes("exchange")) {
        finalResponse += "Our exclusive Student Exchange Program allows you to seamlessly transition from your local Indian University to a top-tier Foreign University. This gives you global exposure at half the standard pricing. I can connect you to our admissions agent immediately for a free evaluation!";
      } else if (lastMessage.includes("agent") || lastMessage.includes("book")) {
        finalResponse += "I would be happy to connect you with one of our certified regional agents! Please hit 'Contact Us' below to block their calendar.";
      } else {
        const countries = ["usa", "uk", "india", "canada", "australia", "germany", "singapore", "uae"];
        const askedCountry = countries.find(c => lastMessage.includes(c));
        
        const courses = ["computer science", "artificial intelligence", "data science", "mba", "medicine", "biology", "finance", "engineering", "arts"];
        const askedCourse = courses.find(c => lastMessage.includes(c));

        let docs = seedData;
        if (askedCountry) docs = docs.filter(d => d.country.toLowerCase() === askedCountry);
        if (askedCourse) docs = docs.filter(d => d.courseAreas.some(ca => ca.toLowerCase().includes(askedCourse)));

        if (docs.length === 0) {
          finalResponse += "I couldn't locate specific universities matching those tight query filters currently in our 2026 QS mapping. However, you can check out our trending universities or ask me about our Student Exchange Program!";
        } else {
          finalResponse += `Here are our highly recommended options:\n\n`;
          docs.slice(0, 3).forEach((u, i) => {
            finalResponse += `${i+1}. **${u.name}** in ${u.country}\n   - Global Rank: #${u.qsRank2026}\n   - Average Placement: ${u.placementPcnt}%\n   - Required: ${u.admissionReqs}\n\n`;
          });
          finalResponse += "Would you like me to book a human consultation for any of these?";
        }
      }

      // Encode precisely using Vercel AI SDK text stream protocol
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          // Vercel app-router text chunk streaming prefix "0:"
          const chunk = `0:${JSON.stringify(finalResponse)}\n`;
          controller.enqueue(encoder.encode(chunk));
          controller.close();
        }
      });
      
      return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Vercel-AI-Data-Stream": "v1" } });
    }

    // NORMAL MODE: OpenAI
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err: any) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
