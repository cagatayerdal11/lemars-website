#!/usr/bin/env node
/**
 * compliance-audit.mjs — LEMARSROLE mevzuat-uyum bekçisi (§31).
 *
 * Amaç: 4250 s.K. m.6 ve Tütün/Alkol Satış ve Sunum Yönetmeliği (m.11, m.20, m.21)
 * kapsamında kaldırılan alkol reklamı / tüketiciye tanıtım unsurlarının build sırasında
 * SESSİZCE geri gelmesini önlemek. `prebuild` kancasına bağlıdır (§32): ihlal bulunursa
 * çıkış kodu 1 döner ve `next build` durur.
 *
 * Kapsam — bu denetim REGRESYONU yakalar, hukuki yorum yapmaz:
 *   A. Yapısal: silinmiş rota ve görsel dosyaları geri EKLENMEMELİDİR.
 *      - src/app/[locale]/markalarimiz  (marka liste + detay rotası; kalıcı redirect'e taşındı)
 *      - public/brands                   (marka/ürün görselleri klasörü)
 *      - public/drinks-illustration.svg  (içki illüstrasyonu)
 *   B. Metinsel: yayımlanan kaynakta (src/ + public/) tüketiciye yönelik TIKLANABİLİR
 *      kanal/bağlantı kalıntısı OLMAMALIDIR.
 *      - wa.me / api.whatsapp.com  (WhatsApp derin bağlantısı — satışa teşvik kanalı)
 *      - instagram.com             (görsel/tanıtım odaklı sosyal medya bağlantısı)
 *
 * Kapsam dışı (bilinçli): sunucu tarafı personel bildirimi (Meta WhatsApp Business API,
 * env-korumalı, kamuya açık CTA değil), KVKK/aydınlatma metnindeki veri-aktarım
 * açıklamaları ve özel /admin analitik metrikleri "whatsapp" sözcüğünü meşru biçimde
 * içerebilir; bu nedenle denetim yalnızca TIKLANABİLİR BAĞLANTI biçimlerini arar,
 * sözcüğün kendisini değil.
 *
 * Yanlış-pozitif koruması: açıklayıcı yorum satırları (bir şeyin KALDIRILDIĞINI belgeleyen)
 * ve denetim betiğinin kendisi kapsam dışıdır. Böylece FlowDiagram.tsx içindeki
 * "…şişeleri … kaldırılmıştır" gibi mevzuat-açıklama yorumları denetimi tetiklemez.
 */

import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SELF = fileURLToPath(import.meta.url);

/** Taranmayacak dizinler. */
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "out", "dist", "scripts"]);

/** Metin taramasında kabul edilen uzantılar. */
const TEXT_EXT = /\.(tsx?|jsx?|mjs|cjs|json|txt|md|css|svg|html)$/i;

/**
 * Bir yorum satırı, bir şeyin KALDIRILDIĞINI / KULLANILMADIĞINI / YASAK olduğunu
 * belgeliyorsa (mevzuat-açıklama yorumu) yanlış-pozitif sayılmaz.
 */
const REMOVAL_MARKERS = [
  "kaldır", "kullanılmaz", "kullanılmamış", "yer verilmez", "yer almaz",
  "içermez", "yasak", "removed", "not used", "prohibited", "no longer",
];
const COMMENT_LINE = /^\s*(\/\/|\*|\/\*|<!--|#)/;

function isExcusedComment(line) {
  if (!COMMENT_LINE.test(line)) return false;
  const low = line.toLowerCase();
  return REMOVAL_MARKERS.some((m) => low.includes(m));
}

/**
 * Yasaklı metin desenleri (küçük harfe indirgenmiş satırda aranır).
 * Yalnızca TIKLANABİLİR tüketici kanalı bağlantı biçimleri — sözcük değil (bkz. üst not).
 */
const TEXT_PATTERNS = [
  { key: "wa.me", test: (l) => l.includes("wa.me") },
  { key: "api.whatsapp.com", test: (l) => l.includes("api.whatsapp.com") },
  { key: "whatsapp.com/send", test: (l) => l.includes("whatsapp.com/send") },
  { key: "instagram.com", test: (l) => l.includes("instagram.com") },
];

const violations = [];

// ── A. Yapısal kontroller ────────────────────────────────────────────────────
const forbiddenPaths = [
  { p: join(ROOT, "src", "app", "[locale]", "markalarimiz"), why: "marka liste/detay rotası geri eklenmiş (§5) — kalıcı redirect'te kalmalı" },
  { p: join(ROOT, "public", "brands"), why: "public/brands marka/ürün görselleri klasörü geri eklenmiş (§6)" },
  { p: join(ROOT, "public", "drinks-illustration.svg"), why: "içki illüstrasyonu geri eklenmiş (§6)" },
];
for (const { p, why } of forbiddenPaths) {
  if (existsSync(p)) {
    violations.push(`[YAPISAL] ${relative(ROOT, p)} — ${why}`);
  }
}

// ── B. Metinsel tarama ───────────────────────────────────────────────────────
function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(full);
    } else if (TEXT_EXT.test(name) && full !== SELF) {
      scanFile(full);
    }
  }
}

function scanFile(full) {
  let text;
  try {
    text = readFileSync(full, "utf8");
  } catch {
    return;
  }
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const low = raw.toLowerCase();
    for (const { key, test } of TEXT_PATTERNS) {
      if (test(low) && !isExcusedComment(raw)) {
        violations.push(
          `[METİN] ${relative(ROOT, full)}:${i + 1} — yasaklı desen "${key}" (tüketiciye yönelik kanal/bağlantı)`
        );
      }
    }
  }
}

for (const base of ["src", "public"]) {
  const dir = join(ROOT, base);
  if (existsSync(dir)) walk(dir);
}

// ── Sonuç ────────────────────────────────────────────────────────────────────
if (violations.length > 0) {
  console.error("\n✗ MEVZUAT-UYUM DENETİMİ BAŞARISIZ — " + violations.length + " ihlal:\n");
  for (const v of violations) console.error("  • " + v);
  console.error(
    "\nBu değişiklikler 4250 s.K. m.6 / Satış ve Sunum Yönetmeliği m.11-20-21 kapsamında" +
      "\nkaldırılan unsurların geri gelmesine yol açar. Düzeltmeden build alınamaz.\n"
  );
  process.exit(1);
}

console.log("✓ Mevzuat-uyum denetimi geçti — yapısal ve metinsel kalıntı yok.");
process.exit(0);
