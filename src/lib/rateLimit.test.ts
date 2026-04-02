import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rateLimit } from './rateLimit';

describe('Rate Limiter Utility', () => {
  beforeEach(() => {
    // We can't easily reset the internal Map of rateLimit.ts without modifying it,
    // but we can test fresh IPs or rely on time-based expiration.
    vi.useFakeTimers();
  });

  it('should allow requests within the limit', () => {
    const ip = '1.1.1.1';
    expect(rateLimit(ip, 2, 60000)).toBe(true);
    expect(rateLimit(ip, 2, 60000)).toBe(true);
  });

  it('should block requests exceeding the limit', () => {
    const ip = '2.2.2.2';
    rateLimit(ip, 2, 60000); // 1
    rateLimit(ip, 2, 60000); // 2
    expect(rateLimit(ip, 2, 60000)).toBe(false); // 3 (blocked)
  });

  it('should reset limit after the window expires', () => {
    const ip = '3.3.3.3';
    const windowMs = 60000;
    rateLimit(ip, 1, windowMs);
    expect(rateLimit(ip, 1, windowMs)).toBe(false);

    // Fast-forward time
    vi.advanceTimersByTime(windowMs + 1);
    
    expect(rateLimit(ip, 1, windowMs)).toBe(true);
  });
});
