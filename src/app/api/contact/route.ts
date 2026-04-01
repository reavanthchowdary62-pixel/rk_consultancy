import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ContactMessage } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const db = await connectDB();

    if (db) {
      const msg = await ContactMessage.create({ name, email, phone, message });
      console.log(`✅ Contact message saved: ${msg._id}`);
      return NextResponse.json({ success: true, id: msg._id.toString() });
    }

    // Fallback — just log it
    console.log("ℹ️  Contact message received (no DB):", { name, email, message });
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Contact error:", error.message);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) return NextResponse.json({ messages: [], error: "Database not connected" });
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
