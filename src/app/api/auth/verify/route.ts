import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing verification token" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Wipe the token after use
    await user.save();

    // Redirect them to the dashboard with a success state, or just return JSON
    return NextResponse.redirect(new URL("/dashboard?verified=true", req.url));

  } catch (error: any) {
    console.error("Verification error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
