import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Counselor } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { z } from "zod";

const approvalSchema = z.object({
  action: z.enum(["APPROVED", "REJECTED", "SUSPENDED"]),
});

// GET /api/admin/counselors — List all counselor applications (admin only)
export async function GET() {
  try {
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const db = await connectDB();
    if (!db) return NextResponse.json({ counselors: [], error: "Database not connected" });

    const counselors = await Counselor.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ counselors });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Admin counselors error:", message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/admin/counselors — Approve/reject a counselor (admin only)
export async function PATCH(req: Request) {
  try {
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const body = await req.json();
    const { action } = approvalSchema.parse(body);
    const { searchParams } = new URL(req.url);
    const counselorId = searchParams.get("id");

    if (!counselorId) {
      return NextResponse.json({ error: "Counselor ID required" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 500 });

    const update: Record<string, unknown> = { status: action };
    if (action === "APPROVED") update.approvedAt = new Date();

    const counselor = await Counselor.findByIdAndUpdate(counselorId, update, { new: true });
    if (!counselor) {
      return NextResponse.json({ error: "Counselor not found" }, { status: 404 });
    }

    console.log(`🔧 Admin ${action} counselor: ${counselor.name} (${counselor.email})`);

    return NextResponse.json({ success: true, counselor });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Admin counselor update error:", message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
