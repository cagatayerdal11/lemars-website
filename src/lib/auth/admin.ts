/**
 * LEMARS — Admin parola doğrulama + basit brute-force koruması (server-only).
 *
 * Parola kaynak koda YAZILMAZ. Env'de SHA-256 hex hash tutulur; giriş sabit
 * zamanlı karşılaştırılır. Rate limit in-memory'dir (serverless'te best-effort).
 */

import { createHash, timingSafeEqual, scryptSync } from "crypto";
import { verifySessionToken, SESSION_COOKIE } from "./session";
import type { NextRequest } from "next/server";

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET
  );
}

function verifyScrypt(input: string, stored: string): boolean {
  // Biçim: scrypt$<saltHex>$<hashHex> — tuzlu, yavaş KDF (önerilen).
  const parts = stored.split("$");
  if (parts.length !== 3) return false;
  const salt = Buffer.from(parts[1], "hex");
  const expected = Buffer.from(parts[2], "hex");
  if (salt.length === 0 || expected.length === 0) return false;
  let derived: Buffer;
  try {
    derived = scryptSync(input, salt, expected.length);
  } catch {
    return false;
  }
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

function verifySha256(input: string, expectedHex: string): boolean {
  // Geriye dönük uyumluluk (düz SHA-256 hex — tuzsuz, önerilmez).
  const actual = Buffer.from(
    createHash("sha256").update(input, "utf8").digest("hex")
  );
  const expected = Buffer.from(expectedHex);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/**
 * Girilen parolayı ADMIN_PASSWORD_HASH ile sabit zamanlı doğrular.
 * Önerilen biçim: scrypt$<salt>$<hash> (tuzlu, yavaş KDF — offline brute-force'a
 * dayanıklı). `scripts/generate-admin-hash.mjs` ile üretilir. Eski düz SHA-256
 * hex değerler de geriye dönük uyumluluk için kabul edilir.
 */
export function verifyPassword(input: string): boolean {
  const stored = (process.env.ADMIN_PASSWORD_HASH || "").trim();
  if (!stored) return false;
  if (stored.startsWith("scrypt$")) return verifyScrypt(input, stored);
  return verifySha256(input, stored.toLowerCase());
}

/** İsteğin geçerli admin oturumu var mı? (API guard) */
export function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

// ---- Rate limiting (in-memory, best-effort) ----
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; first: number }>();

export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    return { allowed: true, retryAfter: 0 };
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - entry.first)) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

export function recordFailure(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: now });
  } else {
    entry.count += 1;
  }
}

export function resetRateLimit(ip: string): void {
  attempts.delete(ip);
}
