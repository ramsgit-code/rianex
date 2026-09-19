import { NextRequest, NextResponse } from "next/server";

const requests = new Map<string, number[]>();

export function rateLimit(req: NextRequest, maxPerMinute = 5): NextResponse | null {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const windowMs = 60_000;
  const hits = (requests.get(ip) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  requests.set(ip, hits);

  if (hits.length > maxPerMinute) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }
  return null;
}
