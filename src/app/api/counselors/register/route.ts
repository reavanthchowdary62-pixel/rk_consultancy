import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User, Counselor } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  bio: z.string().max(1000),
  specializations: z.array(z.string().max(50)).min(1).max(10),
  countries: z.array(z.string().max(50)).min(1).max(10),
  languages: z.array(z.string().max(30)).min(1).max(5),
  experience: z.number().min(0).max(50),
  hourlyRate: z.number().min(0).max(100000),
  availability: z.object({
    days: z.array(z.string()).min(1),
    timeSlots: z.array(z.string()).min(1),
  }),
});

// POST /api/counselors/register — Self-registration for counselor role
export async function POST(req: Request) {
  try {
    // Must be logged in
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await req.json();
    const validData = registerSchema.parse(body);

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 500 });

    // Check if already registered as a counselor
    const existing = await Counselor.findOne({ userId: session.id });
    if (existing) {
      return NextResponse.json({ error: "You have already applied as a counselor.", status: existing.status }, { status: 409 });
    }

    // Get user info
    const user = await User.findById(session.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create counselor profile (PENDING approval)
    const counselor = await Counselor.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      ...validData,
      status: "PENDING",
    });

    // Update user role to COUNSELOR
    await User.findByIdAndUpdate(session.id, { role: "COUNSELOR" });

    console.log(`🎓 New counselor application: ${user.name} (${user.email})`);

    return NextResponse.json({
      success: true,
      message: "Application submitted! An admin will review your profile.",
      counselorId: counselor._id.toString(),
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid registration data", details: error.message }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Counselor registration error:", message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
