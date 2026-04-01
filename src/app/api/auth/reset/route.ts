import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { rateLimit } from "@/lib/rateLimit";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // RATE LIMITING PROTECTION: Stop email abuse (max 2 tries per minute)
    const ip = req.headers.get('x-forwarded-for') || "127.0.0.1";
    const allowed = rateLimit(ip, 2, 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many reset requests. Please try again later." }, { status: 429 });
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database offline" }, { status: 500 });

    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Security Best Practice: Do not reveal if email exists. Always return success.
    if (!user) {
      return NextResponse.json({ success: true, message: "If that email exists, a reset link has been generated." });
    }

    // Generate a secure, pseudo-random token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 Hour expiry
    await user.save();

    // In a real application, you would send an email here using Resend or Nodemailer.
    // For this MVP, we output securely to the server logs.
    const resetUrl = `https://your-domain.com/reset/${rawToken}`;
    console.log(`\n\n[SECURITY] Password Reset Requested for ${email}`);
    console.log(`[SECURITY] Magic Reset Link: ${resetUrl}\n\n`);

    return NextResponse.json({ success: true, message: "If that email exists, a reset link has been generated." });

  } catch (error: any) {
    console.error("Reset Flow Error:", error.message);
    return NextResponse.json({ error: "Failed to initiate reset." }, { status: 500 });
  }
}
