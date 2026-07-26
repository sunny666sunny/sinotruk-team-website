type Hit = { allowed: boolean; remaining: number; retryAfterMs: number }

export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>()
  constructor(private readonly limit: number, private readonly windowMs: number) {}

  check(key: string, now = Date.now()): Hit {
    const cutoff = now - this.windowMs
    const recent = (this.hits.get(key) || []).filter((timestamp) => timestamp > cutoff)
    if (recent.length >= this.limit) {
      this.hits.set(key, recent)
      return { allowed: false, remaining: 0, retryAfterMs: Math.max(1, recent[0] + this.windowMs - now) }
    }
    recent.push(now)
    this.hits.set(key, recent)
    return { allowed: true, remaining: this.limit - recent.length, retryAfterMs: 0 }
  }
}
