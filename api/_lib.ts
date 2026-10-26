// Shared helpers for serverless handlers.
// NOTE: Files prefixed with "_" are NOT exposed as Vercel endpoints — safe to import.

const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Minimal in-memory per-IP rate limiter (per serverless instance).
 * Degrades gracefully without Upstash; blunts basic abuse / cache-miss floods.
 */
export function makeRateLimiter(maxRequests: number) {
  const buckets = new Map<string, { count: number; start: number }>();
  return function allow(key: string): boolean {
    const now = Date.now();
    const b = buckets.get(key);
    if (!b || now - b.start > RATE_WINDOW_MS) {
      buckets.set(key, { count: 1, start: now });
      return true;
    }
    if (b.count >= maxRequests) return false;
    b.count += 1;
    return true;
  };
}

export function clientIpOf(req: any): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.ip ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );
}
