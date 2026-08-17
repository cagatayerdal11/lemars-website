/**
 * LEMARS — Admin oturum yönetimi (server-only).
 *
 * HMAC-SHA256 imzalı, süreli token. HttpOnly + Secure + SameSite cookie'de
 * saklanır. Token client bundle'ına düşmez; secret yalnızca server'da.
 */

import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "lemars_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 saat

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payload: string): string {
  return b64url(createHmac("sha256", getSecret()).update(payload).digest());
}

/** Yeni oturum token'ı üretir (exp = now + MAX_AGE). */
export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = b64url(JSON.stringify({ exp }));
  return `${payload}.${sign(payload)}`;
}

/** Token imzasını ve süresini doğrular. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !getSecret()) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const data = JSON.parse(
      Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    ) as { exp?: number };
    if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

export function clearedCookieOptions() {
  return { ...sessionCookieOptions(), maxAge: 0 };
}
