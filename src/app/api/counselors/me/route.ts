import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Counselor } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { z } from "zod";

const editSchema = z.object({
  bio: z.string().max(1000).optional(),
  specializations: z.array(z.string().max(50)).max(10).optional(),
  countries: z.array(z.string().max(50)).max(10).optional(),
  languages: z.array(z.string().max(30)).max(5).optional(),
  experience: z.number().min(0).max(50).optional(),
  hourlyRate: z.number().min(0).max(100000).optional(),
  profileImage: z.string().url().max(500).optional().or(z.literal("")),
  availability: z.object({
    days: z.array(z.string()).min(1),
    timeSlots: z.array(z.string()).min(1),
  }).optional(),
});

// GET /api/counselors/me — Get own counselor profile
export async function GET() {
  try {
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 500 });

    const counselor = await Counselor.findOne({ userId: session.id });
    if (!counselor) return NextResponse.json({ error: "Not a counselor" }, { status: 404 });

    return NextResponse.json({ counselor });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown";
    console.error("Counselor me error:", msg);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/counselors/me — Update own counselor profile
export async function PATCH(req: Request) {
  try {
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session || session.role !== "COUNSELOR") {
      return NextResponse.json({ error: "Unauthorized: Counselors only" }, { status: 403 });
    }

    const body = await req.json();
    const validData = editSchema.parse(body);

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 500 });

    const counselor = await Counselor.findOneAndUpdate(
      { userId: session.id },
      { $set: validData },
      { new: true }
    );

    if (!counselor) return NextResponse.json({ error: "Counselor profile not found" }, { status: 404 });

    return NextResponse.json({ success: true, counselor });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    const msg = error instanceof Error ? error.message : "Unknown";
    console.error("Counselor edit error:", msg);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
