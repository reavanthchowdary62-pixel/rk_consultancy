import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    
    if (!session) {
      return NextResponse.json({ error: "You must be logged in first. Go to /login." });
    }

    if (session.email !== "reavanthchowdary4@gmail.com") {
      return NextResponse.json({ error: "Only the founder can run this upgrade." }, { status: 403 });
    }

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database error" }, { status: 500 });

    const user = await User.findByIdAndUpdate(session.id, { role: "ADMIN" }, { new: true });

    return NextResponse.json({ 
      success: true, 
      message: "🎉 SUCCESS! Your account has been upgraded to ADMIN.",
      nextSteps: "IMPORTANT: You must log out and log back in right now for the Admin features to unlock.",
      email: user.email,
      role: user.role
    });

  } catch (error: unknown) {
    return NextResponse.json({ error: "Server Error", details: String(error) }, { status: 500 });
  }
}
