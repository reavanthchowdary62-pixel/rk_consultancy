import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import seedData from "@/data/seed.json";
import { rateLimit } from "@/lib/rateLimit";

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
    // RATE LIMITING PROTECTION: Max 15 messages per minute per IP to prevent OpenAI credit drain
    const ip = req.headers.get('x-forwarded-for') || "127.0.0.1";
    const allowed = rateLimit(ip, 15, 60 * 1000);
    if (!allowed) {
      return new Response('Rate limit exceeded. Please wait a minute before sending more messages.', { status: 429 });
    }

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    // FALLBACK MODE: Local Dataset Stream Injection
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === "your-openai-key-here" || process.env.OPENAI_API_KEY.trim() === "") {
      
      let finalResponse = "";
      
      const greetings = ["hi", "hello", "hey", "greetings", "good morning", "good evening", "good afternoon"];
      const thanks = ["thanks", "thank you", "appreciate", "great", "awesome"];
      const howAreYou = ["how are you", "how're you", "how do you do", "what's up"];

      if (greetings.some(g => lastMessage === g || lastMessage.includes(`${g} `) || lastMessage.includes(` ${g}`))) {
        finalResponse += "Hello there! 👋 I'm the RK Consultancy AI. How can I assist you with your study abroad plans today?\n";
      } else if (howAreYou.some(h => lastMessage.includes(h))) {
        finalResponse += "I'm just a bot, but I'm doing fantastic, thanks for asking! 💙 I'm ready to help you find the best universities. What are you looking to study?\n";
      } else if (thanks.some(t => lastMessage === t || lastMessage.includes(` ${t}`) || lastMessage.includes(`${t} `))) {
        finalResponse += "You're very welcome! Let me know if you need anything else—like booking a free session with our human counselors. ✨\n";
      } else if (lastMessage.includes("exchange")) {
        finalResponse += "Oh, you're interested in our **Student Exchange Program**! That's a brilliant choice. 🌟\n\nIt allows you to seamlessly transition from your local Indian University to a top-tier Foreign University. This gives you global exposure at half the standard pricing. I can connect you to our admissions agent immediately for a free evaluation! Would you like that?\n";
      } else if (lastMessage.includes("agent") || lastMessage.includes("book") || lastMessage.includes("human")) {
        finalResponse += "I would be absolutely thrilled to connect you with one of our certified regional counselors! 📅\n\nPlease click on the **'Book Counselor'** tab at the top or hit 'Contact Us' to block their calendar. They usually respond within 24 hours.\n";
      } else {
        const countries = ["usa", "uk", "india", "canada", "australia", "germany", "singapore", "uae", "united states", "united kingdom"];
        const askedCountry = countries.find(c => lastMessage.includes(c));
        
        const courses = ["computer science", "artificial intelligence", "data science", "mba", "medicine", "biology", "finance", "engineering", "arts", "business", "it"];
        const askedCourse = courses.find(c => lastMessage.includes(c));

        if (!askedCountry && !askedCourse) {
            finalResponse += "Hmm, that's an interesting question! 🤔 To give you the best advice, could you tell me a bit more?\n\nFor example, what specific course are you interested in, or which country are you planning to study in? (e.g., 'MBA in USA' or 'Computer Science in UK')\n";
        } else {
            let docs = seedData;
            if (askedCountry) {
              const cName = askedCountry === "united states" ? "usa" : askedCountry === "united kingdom" ? "uk" : askedCountry;
              docs = docs.filter(d => d.country.toLowerCase() === cName);
            }
            if (askedCourse) docs = docs.filter(d => d.courseAreas.some(ca => ca.toLowerCase().includes(askedCourse)));

            if (docs.length === 0) {
              finalResponse += `I looked into our 2026 QS mapping for ${askedCourse ? askedCourse : "that course"} in ${askedCountry ? askedCountry : "that region"}, but couldn't find an exact match holding our high placement criteria. 😔\n\nHowever, we do have some amazing alternatives, or you could chat with our human experts to explore custom pathways!\n`;
            } else {
              finalResponse += `I found some excellent options for you! 🎉 Here are highly recommended institutions based on your interest:\n\n`;
              docs.slice(0, 3).forEach((u, i) => {
                finalResponse += `${i+1}. **${u.name}** in ${u.country}\n   - 🏆 QS Global Rank: #${u.qsRank2026}\n   - 💼 Average Placement: ${u.placementPcnt}%\n   - 💰 Avg Tuition: ₹${(u.tuitionFeeINR / 100000).toFixed(1)}L/yr\n\n`;
              });
              finalResponse += "Do any of these catch your eye? I can help you understand their admission requirements or book a consultation for you! ✨";
            }
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
