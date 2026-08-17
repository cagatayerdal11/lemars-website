import { NextRequest, NextResponse } from "next/server";
import {
  isAdminConfigured,
  verifyPassword,
  checkRateLimit,
  recordFailure,
  resetRateLimit,
  clientIp,
} from "@/lib/auth/admin";
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin girişi sunucuda yapılandırılmamış." },
      { status: 503 }
    );
  }

  const ip = clientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Çok fazla hatalı deneme. Lütfen bir süre sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    /* geçersiz gövde */
  }

  if (!password || !verifyPassword(password)) {
    recordFailure(ip);
    return NextResponse.json({ error: "Hatalı parola." }, { status: 401 });
  }

  resetRateLimit(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions());
  return res;
}
