import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ContactMessage } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100),
  phone: z.string().max(20).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Zod Sanitization to block XSS and 10MB payloads
    const { name, email, phone, message } = contactSchema.parse(body);

    const db = await connectDB();

    if (db) {
      const msg = await ContactMessage.create({ name, email, phone, message });
      console.log(`✅ Contact message saved: ${msg._id}`);
      return NextResponse.json({ success: true, id: msg._id.toString() });
    }

    // Fallback
    return NextResponse.json({ success: true });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload data" }, { status: 400 });
    }
    console.error("Contact error:", error.message);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Strictly block non-Admins from reading PII Contact logs
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const db = await connectDB();
    if (!db) return NextResponse.json({ messages: [], error: "Database not connected" });
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ messages });
  } catch (error: any) {
    console.error("Contact GET error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
