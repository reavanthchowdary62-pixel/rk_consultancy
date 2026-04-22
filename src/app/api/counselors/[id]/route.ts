import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Counselor } from "@/lib/models";

// GET /api/counselors/[id] — Public counselor profile detail
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 500 });

    const counselor = await Counselor.findById(params.id).select("-userId -email");

    if (!counselor || counselor.status !== "APPROVED") {
      return NextResponse.json({ error: "Counselor not found" }, { status: 404 });
    }

    return NextResponse.json({ counselor });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Counselor detail error:", message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
