import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const { name, email, goal, agentId, agentName, date, time } = await req.json();

    if (!name || !email || !agentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = await connectDB();

    if (db) {
      const booking = await Booking.create({
        name, email, goal, agentId, agentName, date, time,
        status: "PENDING",
      });
      console.log(`✅ Booking saved to MongoDB: ${booking._id}`);
      return NextResponse.json({ success: true, bookingId: booking._id.toString() });
    }

    // Fallback if no DB — just confirm
    console.log("ℹ️  Booking received (no DB configured):", { name, email, agentName, date, time });
    return NextResponse.json({ success: true, bookingId: `mock-${Date.now()}` });

  } catch (error: any) {
    console.error("Booking error:", error.message);
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await connectDB();
    if (!db) return NextResponse.json({ bookings: [], error: "Database not connected" });
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
