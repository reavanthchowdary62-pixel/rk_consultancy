import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Completely destroy the user session
  cookies().delete("rk-auth-session");
  
  return NextResponse.json({ success: true });
}
