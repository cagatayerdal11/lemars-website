#!/usr/bin/env node
/**
 * LEMARS — Admin parolası için güvenli hash üretir (scrypt, tuzlu).
 *
 * Kullanım:
 *   node scripts/generate-admin-hash.mjs 'GUCLU_PAROLANIZ'
 *
 * Çıktıyı ADMIN_PASSWORD_HASH ortam değişkenine yapıştırın (Vercel + .env.local).
 * Parola hiçbir yere kaydedilmez; yalnızca hash saklanır.
 */
import { scryptSync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error("Kullanım: node scripts/generate-admin-hash.mjs '<parola>'");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`scrypt$${salt.toString("hex")}$${hash.toString("hex")}`);
