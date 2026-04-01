import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import { createSessionToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    // RATE LIMITING PROTECTION: Stop brute force password guessing (max 5 tries per minute)
    const ip = req.headers.get('x-forwarded-for') || "127.0.0.1";
    const allowed = rateLimit(ip, 5, 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    
    // ZOD SANITIZATION: Prevents Bcrypt DoS (max 72 chars) and NoSQL Crashes
    const authSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6).max(72),
      name: z.string().max(100).optional(),
      action: z.string().optional()
    });
    
    let validData;
    try {
      validData = authSchema.parse(body);
    } catch (zError: any) {
      return NextResponse.json({ error: "Invalid login payload format." }, { status: 400 });
    }

    const { email, password, name, action } = validData;

    // Try MongoDB first, fall back to mock auth if DB not configured
    const db = await connectDB();

    if (db) {
      // ── REAL MongoDB Authentication ──────────────────────────
      if (action === "signup") {
        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
          return NextResponse.json({ error: "Account already exists with this email" }, { status: 409 });
        }
        // Hash password and create user
        const hashed = await bcrypt.hash(password, 12);
        const newUser = await User.create({
          name: name || email.split("@")[0],
          email: email.toLowerCase(),
          password: hashed,
        });
        console.log(`✅ New user registered: ${newUser.email}`);
      } else {
        // Login - verify credentials
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return NextResponse.json({ error: "No account found with this email. Try signing up first." }, { status: 401 });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
        }
        console.log(`✅ User login: ${user.email}`);
      }
    } else {
      // ── FALLBACK: Mock authentication (no DB needed) ──────────
      console.log("ℹ️  Using mock auth (MONGODB_URI not set). Any credentials accepted.");
    }

    let sessionToken = "";
    
    // If DB connects, sign real context. If mock fallback, just sign a fake context.
    if (db) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        sessionToken = await createSessionToken({ id: user._id.toString(), email: user.email, role: user.role });
      }
    } else {
      sessionToken = await createSessionToken({ id: "mock-id", email, role: "STUDENT" });
    }

    if (!sessionToken) {
      return NextResponse.json({ error: "Failed to generate secure session." }, { status: 500 });
    }

    // Set secure session cookie (7 days)
    // Importing cookies dynamically to avoid edge conflicts
    const { cookies } = await import("next/headers");
    cookies().set({
      name: "rk-auth-session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Auth error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
