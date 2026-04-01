import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const { email, password, name, action } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

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

    // Set secure session cookie (7 days)
    cookies().set({
      name: "rk-auth-session",
      value: Buffer.from(JSON.stringify({ email, ts: Date.now() })).toString("base64"),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Auth error:", error.message);
    return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 });
  }
}
