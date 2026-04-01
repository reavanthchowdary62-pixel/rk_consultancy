import { SignJWT, jwtVerify, JWTPayload } from "jose";

// In production, this MUST point to process.env.JWT_SECRET.
// For the MVP, we use a strong fallback to avoid 500 crashes if you forget to set it on Vercel immediately.
const JWT_SECRET = process.env.JWT_SECRET || "super-secure-rk-secret-key-2026-fallback-never-use-in-prod";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload extends JWTPayload {
  id: string;
  email: string;
  role: string;
}

export async function createSessionToken(payload: Omit<SessionPayload, "createdAt" | "exp" | "iat">) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  try {
    if (!token) return null;
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}
