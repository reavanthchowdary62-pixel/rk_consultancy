// Simple In-Memory Rate Limiter for Next.js API Routes
// Note: In Serverless functions on Vercel, memory is ephemeral per region/instance.
// For true global rate-limiting across scaled regions, a database like Upstash Redis/KV is required.
// However, this in-memory Map provides a significant barrier against script-kiddie looping and basic DDoS bots.

type RateLimitStore = {
  count: number;
  lastReset: number;
};

const rateLimitMap = new Map<string, RateLimitStore>();

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true; // Allowed
  }

  // If window has passed, reset their counter
  if (now - record.lastReset > windowMs) {
    record.count = 1;
    record.lastReset = now;
    return true; // Allowed
  }

  // Window hasn't passed, check count
  if (record.count >= limit) {
    return false; // Rate Limited (Blocked)
  }

  // Increment and allow
  record.count += 1;
  return true;
}
