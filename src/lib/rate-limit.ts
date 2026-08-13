/**
 * Fixed-window rate limiter, in memory.
 *
 * Enough to stop a script hammering the contact endpoint from one address.
 * It is per-instance: on a serverless platform each cold instance keeps its
 * own counter, so a determined attacker spread across instances gets more
 * than the nominal limit. For a marketing-site contact form that trade-off is
 * fine; if you need a hard guarantee, back this with Upstash/Redis and keep
 * the same `check()` signature.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

/** Stop the map growing without bound on a long-lived instance. */
function evictExpired(now: number): void {
  if (windows.size < 500) return;
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export function check(key: string): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  evictExpired(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > MAX_REQUESTS) {
    return {
      ok: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return { ok: true, retryAfterSeconds: 0 };
}

/**
 * Best-effort client identity. Vercel and most proxies set x-forwarded-for;
 * everything falls back to a shared bucket, which is the safe direction to
 * fail (stricter, not looser).
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
