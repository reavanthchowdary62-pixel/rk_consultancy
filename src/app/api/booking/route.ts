import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100),
  goal: z.string().max(1000).optional(),
  agentId: z.number(),
  agentName: z.string().max(100).optional(),
  date: z.string().max(50).optional(),
  time: z.string().max(50).optional()
});

export async function POST(req: Request) {
  try {
    // Authenticate POST request (only logged in users can book)
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    // Zod Input Validation & Sanitization
    const validData = bookingSchema.parse(body);

    const db = await connectDB();

    if (db) {
      const booking = await Booking.create({
        ...validData,
        email: session.email, // Force email from secure JWT override
        status: "PENDING",
      });
      console.log(`✅ Booking saved to MongoDB: ${booking._id}`);
      return NextResponse.json({ success: true, bookingId: booking._id.toString() });
    }

    // Fallback if no DB
    return NextResponse.json({ success: true, bookingId: `mock-${Date.now()}` });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload data" }, { status: 400 });
    }
    console.error("Booking error:", error.message);
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Strictly verify ADMIN role for Reading PII Data
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const db = await connectDB();
    if (!db) return NextResponse.json({ bookings: [], error: "Database not connected" });
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ bookings });
  } catch (error: any) {
    console.error("Booking error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
