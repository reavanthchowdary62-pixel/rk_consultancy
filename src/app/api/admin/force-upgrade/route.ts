import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const secret = searchParams.get("secret");

    if (secret !== "supersecret123") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "DB error" }, { status: 500 });

    const user = await User.findOneAndUpdate(
      { email: { $regex: new RegExp(`^${email}$`, 'i') } },
      { $set: { role: "ADMIN" } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found. Are you sure they are registered?" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Server Error", details: String(error) }, { status: 500 });
  }
}
