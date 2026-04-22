import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Counselor } from "@/lib/models";

// GET /api/counselors — Public list of approved counselors
export async function GET(req: Request) {
  try {
    const db = await connectDB();
    if (!db) return NextResponse.json({ counselors: [], error: "Database not connected" });

    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");
    const specialization = searchParams.get("specialization");

    // Build filter — only show APPROVED counselors
    const filter: Record<string, unknown> = { status: "APPROVED" };
    if (country) filter.countries = country;
    if (specialization) filter.specializations = specialization;

    const counselors = await Counselor.find(filter)
      .select("-userId -email") // Don't expose private fields publicly
      .sort({ rating: -1, totalSessions: -1 })
      .limit(50);

    return NextResponse.json({ counselors });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Counselors list error:", message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
