import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * CSRF Protection using the Double-Submit Cookie Pattern:
 * 1. On every response, set a `csrf-token` cookie (readable by JS, NOT httpOnly)
 * 2. On mutating requests (POST/PATCH/DELETE), verify that the `x-csrf-token` header matches the cookie
 * 3. This prevents cross-origin form submissions (attacker can't read the cookie from another domain)
 */

function generateToken(): string {
  // Generate a cryptographically random 32-byte hex string
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ── CSRF Token Management ──────────────────────────────────────────────
  const existingToken = request.cookies.get("csrf-token")?.value;

  // Only generate a new token if one doesn't exist
  if (!existingToken) {
    const token = generateToken();
    response.cookies.set({
      name: "csrf-token",
      value: token,
      httpOnly: false, // JS must be able to read this
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
  }

  // ── Enforce CSRF on mutating API requests ──────────────────────────────
  const isMutatingAPI =
    request.nextUrl.pathname.startsWith("/api/") &&
    ["POST", "PATCH", "PUT", "DELETE"].includes(request.method);

  // Exclude auth login (it's used before JS can set the header) and chat (streaming)
  const isExempt =
    request.nextUrl.pathname === "/api/auth/login" ||
    request.nextUrl.pathname === "/api/auth/logout" ||
    request.nextUrl.pathname === "/api/auth/verify" ||
    request.nextUrl.pathname === "/api/auth/reset" ||
    request.nextUrl.pathname === "/api/chat";

  if (isMutatingAPI && !isExempt) {
    const cookieToken = request.cookies.get("csrf-token")?.value;
    const headerToken = request.headers.get("x-csrf-token");

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      return NextResponse.json(
        { error: "CSRF token mismatch. Please refresh the page and try again." },
        { status: 403 }
      );
    }
  }

  return response;
}

// Apply to all routes except static assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.json|sw.js|images/).*)",
  ],
};
