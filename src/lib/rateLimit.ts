// ─── Global Rate Limiter (Upstash Redis + In-Memory Fallback) ─────────────────
// Priority: attempts Upstash Redis first (globally consistent across Vercel instances),
// falls back gracefully to in-memory Map if UPSTASH env vars are not configured.

let upstashRatelimit: any = null;
let upstashRedis: any = null;

// Lazily initialize Upstash only if environment variables are present
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const { Redis } = require("@upstash/redis");
    const { Ratelimit } = require("@upstash/ratelimit");
    upstashRedis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    // Sliding window: max 5 requests per 60 seconds per IP (globally consistent)
    upstashRatelimit = new Ratelimit({
      redis: upstashRedis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      analytics: true, // Tracks usage in Upstash dashboard
      prefix: "@rk-consultancy/ratelimit",
    });
    console.log("✅ Upstash Redis Rate Limiter initialized (global mode).");
  } catch (e) {
    console.warn("⚠️ Upstash init failed, falling back to in-memory rate limiter:", e);
  }
}

// ─── Fallback: In-Memory Store (single-instance only) ────────────────────────
type RateLimitStore = { count: number; lastReset: number };
const rateLimitMap = new Map<string, RateLimitStore>();

function inMemoryRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (now - record.lastReset > windowMs) {
    record.count = 1; record.lastReset = now; return true;
  }
  if (record.count >= limit) return false;
  record.count += 1;
  return true;
}

// ─── Unified Export ───────────────────────────────────────────────────────────
// All API routes call this single function — it auto-selects the best available engine.
export async function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): Promise<boolean> {
  if (upstashRatelimit) {
    try {
      const { success } = await upstashRatelimit.limit(ip);
      return success;
    } catch (e) {
      console.warn("Upstash rate limit check failed, using in-memory fallback:", e);
      return inMemoryRateLimit(ip, limit, windowMs);
    }
  }
  return inMemoryRateLimit(ip, limit, windowMs);
}
