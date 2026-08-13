# LEMARS_SEO_AUDIT.md

## Repository Verified

Every finding below is traceable to a file, route, or observed live-site response. Where something was not measured/confirmed, it is marked **NOT VERIFIED**.

| Item | Verified value | Evidence |
|---|---|---|
| Project / repo | **lemars-website** (LEMARS Gıda İçecek) — nested git repo | `LeMars Proje/lemars-website/.git`; `git ls-files` |
| Framework | **Next.js** — **App Router** | `src/app/` structure; `package.json` |
| Next.js version | **14.2.35** | `package.json` (`"next": "^14.2.35"`) + `node_modules/next/package.json` (`"version":"14.2.35"`) |
| Rendering | React Server Components + RSC streaming; Vercel host | live `x-vercel-id` header on `https://www.lemarsgida.com/tr` |
| i18n | Path-based `/[locale]` (`tr` default, `en`); JSON dicts | `src/i18n/config.ts`, `src/i18n/tr.json`, `src/i18n/en.json` |
| Public routes found (× tr/en) | `/`, `/hakkimizda`, `/hizmetlerimiz`, `/distributorluklerimiz`, `/markalarimiz`, `/markalarimiz/[brand]` (7 brands), `/iletisim`, `/yasal/kullanim-kosullari`, `/yasal/kvkk`, `/yasal/sorumluluk-reddi` | `find src/app -name page.tsx` (10 page files) |
| API routes | `/api/contact`, `/api/vcard` | `find src/app -name route.ts` |
| TR/EN architecture | EN uses the **same Turkish slugs** — `/en/hakkimizda` (200), `/en/about` (**404**) | live `curl` of both |
| Metadata files inspected | `src/app/layout.tsx` (static), `src/app/[locale]/layout.tsx` (`generateMetadata`). **No page-level metadata anywhere** | `grep -rln "metadata|generateMetadata" src/app` → only those 2 files |
| Brands verified | scotch-blue, hlibny-dar, marengo, suvorov, cool, cumbus, isabey | `src/app/[locale]/markalarimiz/[brand]/page.tsx` |

> **Scope note:** This audit covers **only** the LEMARS repo (`lemars-website`) and the live site `https://www.lemarsgida.com`. A separate, unrelated “İdari İşler İşletim Sistemi” static project exists in the **parent** folder (Vercel project `lemars-static`); it is **not** part of this repo, **not** deployed to lemarsgida.com, and did **not** inform this audit. See the companion report to management (delivered in chat).
>
> **Compliance:** LEMARS positioned as neutral **B2B Sales • Supply • Distribution**. No consumer-alcohol content, no Product/Offer/Review schema, legal components untouched.

---

## Executive Summary

1. **Domain/redirect canonicalization is correct** — `http→https`, `non-www→www`, `/→/tr`, trailing-slash normalized. *(live curl)*
2. **P0 — AgeGate removes content from the server HTML.** Live `/tr` `<body>` renders only a spinner; page content is behind a client-side gate crawlers can’t pass. *(live curl + `src/components/AgeGate.tsx`)*
3. **P1 — Every page shares ONE title + description.** Only `[locale]/layout.tsx` sets metadata; no page overrides it. *(grep: only 2 metadata files)*
4. **P1 — No `canonical`, `hreflang`, or `metadataBase`.** *(grep src → none)*
5. **P1 — `<html>` has no `lang`.** *(`src/app/layout.tsx:15`)*
6. **P1 — No `robots.txt` / `sitemap.xml`** (both URLs return the app HTML shell, 200). *(live curl)*
7. **P1 — No structured data (JSON-LD).** *(grep src → none)* NAP is real & consistent → honest `Organization`/`WebSite` possible.
8. **P1 — Titles are alcohol-forward** (“Toptan Alkollü İçecek Dağıtım”) → reposition to B2B. *(live `<title>`)*
9. **P2 — No Open Graph / Twitter tags; no OG image asset** (`public/og/` absent). *(grep + `ls`)*
10. **P2 — Poppins loaded via Google-Fonts `@import`** (render-blocking); two heavy logos. *(`globals.css:5`, `ls public/brands`)*

**Already correct (leave as-is):** semantic HTML (one H1/page), `next/image` everywhere (13, 0 raw `<img>`), consistent NAP, solid footer/nav internal linking.

---

## Current SEO Architecture

- **Root layout** `src/app/layout.tsx` — owns `<html className="h-full antialiased">` (**no `lang`**, line 15) and static fallback metadata `title:"LEMARS Gida Icecek"`, `description:"Toptan Alkollü Icecek Dagitimi"` (lines 4–7).
- **Locale layout** `src/app/[locale]/layout.tsx` — `generateMetadata` (lines 10–23) returns **only** `{ title, description }` from `dict.meta`. Wraps all content in `<AgeGate>` (line 90).
- **No page-level `generateMetadata`** in any of the 10 page files → all pages inherit the same title/description.
- **Metadata that is absent everywhere:** `metadataBase`, `alternates.canonical`, `alternates.languages` (hreflang), `openGraph`, `twitter`, explicit `robots`, JSON-LD.
- **Live title/description (identical on every route):**
  - TR `<title>`: `LEMARS Gıda İçecek | Toptan Alkollü İçecek Dağıtım`
  - EN `<title>`: `LEMARS Food & Beverage | Wholesale Alcoholic Beverage Distribution`
  - `<meta name="description">`: `İstanbul Avrupa Yakası'nda restoran, bar ve perakende satış noktalarına hızlı, güvenilir ve kaliteli alkollü içecek toptan satış ve dağıtım hizmeti.`
- **Middleware** `src/middleware.ts` — redirects non-locale paths → `/tr`; matcher excludes `api`, `_next/*`, `favicon.ico`, and dotted paths.

---

## P0 Critical Issues

### P0-1 · AgeGate hides content from crawlers
- **Evidence:** `curl https://www.lemarsgida.com/tr` → `<body>` = `<div class="min-h-screen bg-gray-900 flex items-center justify-center"><div class="… animate-spin"></div></div>` (spinner only; no H1, nav, or copy). Logic in `src/components/AgeGate.tsx`: `verified===null` → spinner; `useEffect` reads `sessionStorage` → unset ⇒ `verified=false` ⇒ renders the age modal, **not** `children`.
- **Impact:** initial HTML has no indexable body content on **every** route; the rendered DOM pre-interaction is the age gate. High risk that Google indexes thin/age-gate HTML site-wide.
- **Recommended change:** render `children` always (server-rendered/crawlable) and show the age gate as a `position:fixed` overlay until verified (scroll-locked). Keep the exact verification logic & legal text. **Touches compliance UX → separate approval (see AgeGate section).**

---

## P1 High Impact Improvements

- **P1-1 · Unique per-page metadata.** *(only 2 metadata files; all pages duplicate)* → add `generateMetadata` per page via a small `src/lib/seo.ts` helper (titles/descriptions in §Page-by-Page).
- **P1-2 · `metadataBase` + self-canonical + hreflang.** *(none in src)* → set `metadataBase=new URL("https://www.lemarsgida.com")`; per page emit self-canonical + `alternates.languages {tr,en,x-default}` using the **same slug** (see §Canonical & Hreflang).
- **P1-3 · `<html lang={locale}>`.** *(`layout.tsx:15` no lang)* → move `<html>/<body>` into `[locale]/layout.tsx` so `lang` reflects locale; verify hydration.
- **P1-4 · robots.txt + sitemap.xml.** *(live: both are soft-200 HTML)* → add `src/app/robots.ts` and `src/app/sitemap.ts` (Next-native).
- **P1-5 · Structured data.** *(none)* → `Organization` + `WebSite` JSON-LD in the layout using verified NAP.
- **P1-6 · B2B title/description reposition.** *(live titles alcohol-forward)* → see §Page-by-Page.
- **P1-7 · Invalid-locale soft-404.** `/robots.txt`, `/sitemap.xml`, and other dotted single-segment URLs render the homepage shell with **200** (`[locale]` catches invalid locale → `isValidLocale?locale:"tr"`, `[locale]/layout.tsx:15,32`). → `notFound()` on invalid locale + `src/app/[locale]/not-found.tsx`.

---

## P2 Optimizations

- **P2-1 · Open Graph + Twitter tags** + one branded, non-alcohol OG image (`public/og/` does **not** exist — verified `ls`).
- **P2-2 · Fonts → `next/font/google`** (remove `globals.css:5` `@import` Google-Fonts CDN — render-blocking + third-party).
- **P2-3 · Recompress heavy logos** `public/brands/enjoy.png` (761 KB), `suvorov.png` (491 KB) — verified `ls -la`.
- **P2-4 · Descriptive alt on meaningful images** (see §Image SEO).
- **P2-5 · Remove dead code** `routeMap`/`reverseRouteMap` in `src/i18n/config.ts` (unused — `grep` outside config.ts → none) which wrongly imply `/en/about`.

---

## Page-by-Page Metadata Audit

All rows: **Current** title/description = the single shared pair above. H1 verified via `grep "<h1"`.

### Turkish
| Route (file) | Proposed Title | Proposed Description (TR) | H1 (verified) |
|---|---|---|---|
| `/tr` (`[locale]/page.tsx:56`) | **LEMARS Gıda İçecek \| B2B Satış, Tedarik ve Dağıtım** | LEMARS Gıda İçecek, İstanbul Avrupa Yakası’nda işletmelere profesyonel satış, tedarik ve dağıtım hizmetleri sunar. | “Güvenilir Tedarik, Güçlü Ortaklık.” |
| `/tr/hakkimizda` (`:34`) | **Hakkımızda \| LEMARS** | 20+ yıllık deneyimiyle LEMARS, İstanbul Avrupa Yakası’nda B2B satış, tedarik ve dağıtımda güvenilir bir çözüm ortağıdır. | “LEMARS Gıda İçecek” |
| `/tr/hizmetlerimiz` (`:23`) | **Hizmetlerimiz \| LEMARS** | HoReCa tedarik, perakende dağıtım, lojistik ve satış geliştirme — LEMARS’ın Avrupa Yakası’ndaki B2B tedarik çözümleri. | “Tedarik Çözümlerimiz” |
| `/tr/distributorluklerimiz` (`:69`) | **Distribütörlüklerimiz \| LEMARS** | LEMARS’ın yetkili distribütörlük portföyü ve İstanbul Avrupa Yakası’ndaki toptan dağıtım iş ortaklıkları. | “Distribütörlüklerimiz” |
| `/tr/markalarimiz` (`:38`) | **Markalarımız \| LEMARS** | LEMARS tarafından İstanbul Avrupa Yakası’nda işletmelere ulaştırılan marka portföyü. | “Markalarımız” |
| `/tr/markalarimiz/[brand]` (`:254`) | **{Marka} \| LEMARS** | {Marka}, LEMARS portföyünde yer alan {kategori}. Kurumsal bilgilendirme. *(neutral, per-brand from `category`)* | brand name |
| `/tr/iletisim` (`:54`) | **İletişim \| LEMARS** | LEMARS Gıda İçecek ile iletişime geçin — Avrupa Yakası B2B satış, tedarik ve dağıtım. Adres, telefon, form. | “Bize Ulaşın” |
| `/tr/yasal/kullanim-kosullari` (`:21`) | **Kullanım Koşulları \| LEMARS** | LEMARS Gıda İçecek web sitesi kullanım koşulları. | “Kullanım Koşulları” |
| `/tr/yasal/kvkk` (`:25`) | **KVKK & Çerez Politikası \| LEMARS** | 6698 sayılı KVKK kapsamında kişisel verilerin işlenmesi ve çerez politikası. | title |
| `/tr/yasal/sorumluluk-reddi` (`:20`) | **Sorumluluk Reddi \| LEMARS** | LEMARS Gıda İçecek yasal uyarı ve sorumluluk reddi beyanı. | “Sorumluluk Reddi” |

### English (actual slugs — `/en/{turkish-slug}`)
| Route | Proposed Title | Proposed Description (EN) |
|---|---|---|
| `/en` | **LEMARS \| B2B Sales, Supply & Distribution** | LEMARS provides professional B2B sales, supply and distribution services to businesses across Istanbul’s European Side. |
| `/en/hakkimizda` | **About Us \| LEMARS** | With 20+ years of experience, LEMARS is a trusted B2B sales, supply and distribution partner across Istanbul’s European Side. |
| `/en/hizmetlerimiz` | **Services \| LEMARS** | HoReCa supply, retail distribution, logistics and sales development — LEMARS’s B2B supply solutions across Istanbul’s European Side. |
| `/en/distributorluklerimiz` | **Distributorships \| LEMARS** | LEMARS’s authorized distributorship portfolio and wholesale distribution partnerships across Istanbul’s European Side. |
| `/en/markalarimiz` | **Brands \| LEMARS** | The brand portfolio LEMARS delivers to businesses across Istanbul’s European Side. |
| `/en/iletisim` | **Contact \| LEMARS** | Contact LEMARS — B2B sales, supply and distribution across Istanbul’s European Side. Address, phone and contact form. |

---

## Canonical & Hreflang Audit

- **Canonical:** **absent** on every page (verified: no `<link rel="canonical">` in live head; no `alternates` in code). → self-referencing `https://www.lemarsgida.com/{locale}/{slug}` per page.
- **Hreflang:** **absent**. TR↔EN not linked. → per page: `tr → /tr/{slug}`, `en → /en/{slug}` (**same slug**, verified reality), `x-default → /tr/{slug}`; reciprocal.
- **Constraint to avoid:** do **not** put a fixed `canonical:/${locale}` in the `[locale]` layout — it would point every subpage at the homepage. Emit per-page.
- **`<html lang>`:** currently missing (P1-3).

---

## AgeGate SEO Audit

- **Component:** `src/components/AgeGate.tsx` (client). States: `null`→spinner, `false`→age modal, `true`→`children`. Verification via `sessionStorage["lemars-age-verified"]`.
- **Server output (verified live):** body = spinner only; page content **not** in initial HTML on any route.
- **SEO consequence:** the single largest indexation risk. `<title>`/`<meta description>` still emit (from `generateMetadata`), but H1s and body copy are at risk site-wide.
- **Fix:** overlay pattern (content server-rendered; gate on top). **Compliance decision required** — confirm this satisfies your TAPDK/4250 interpretation before implementing. **No change made.**

---

## Sitemap & Robots Audit

- **robots.txt:** no file/route; `GET /robots.txt` → **HTTP 200 + app HTML shell** (verified). No sitemap directive. → add `src/app/robots.ts` (allow all + `Sitemap:` line).
- **sitemap.xml:** no file/route; `GET /sitemap.xml` → **HTTP 200 + app HTML shell** (verified). → add `src/app/sitemap.ts` listing all public TR+EN routes incl. 7 brand pages; exclude `/api/*`.
- **Redirects (verified live):** `http://lemarsgida.com`→308→`https://lemarsgida.com/`; `https://lemarsgida.com`→307→`https://www.lemarsgida.com/`; `/`→307→`/tr`; `/tr/`→308→`/tr`. Canonical host = `https://www.lemarsgida.com`. *(Minor: the 307s could be 308/permanent — low priority.)*

---

## Structured Data Audit

- **Current:** none (verified `grep "ld+json|schema.org|@type"` src → 0).
- **Recommended (verified NAP only — nothing invented):**
  - **Organization** — `name` LEMARS Gıda İçecek; `legalName` LEMARS Gıda İçecek Sanayi ve Ticaret Limited Şirketi (`yasal/*` pages); `url` https://www.lemarsgida.com; `logo` /logo-transparent.png; `telephone` +90 212 809 18 83; `email` info@lemarsgida.com; `address` Cihangir Mah. Güvercin Cd. No: 2/90-91, 34310 Avcılar/İstanbul; `sameAs` https://instagram.com/lemarsgida, https://www.linkedin.com/company/lemars-g%C4%B1da-i%C3%A7ecek/. *(all from `src/components/Footer` + `Header.tsx` — verified in live RSC payload.)*
  - **WebSite** — name + url.
  - **BreadcrumbList** — optional; low ROI on a ~10-page site (P3).
  - **Do NOT** add Product/Offer/Review for alcohol.
- **NOT VERIFIED (do not invent):** founding year, employee count, opening hours (vCard says Mon–Fri 09:00–18:00 — `api/vcard/route.ts` — could be used if you confirm), geo-coordinates.

---

## Image SEO Audit

- **Usage:** `next/image` in **13** components, **0** raw `<img>` (verified) → automatic lazy-load, sizing, modern formats.
- **Alt text:** hero uses descriptive alt (`[locale]/page.tsx` `alt="LEMARS Gıda İçecek — Toptan Dağıtım"`); footer logo `alt="LEMARS Gıda İçecek"`; brand images `alt={info.name}`. **5 `alt=""`** on background/decorative images (`hizmetlerimiz/page.tsx:60,73,110,123`, `hakkimizda/page.tsx:31`) — empty alt is **correct for decorative**, but `delivery-truck.jpg`/`logistics.jpg`/`customer-handshake.jpg` are meaningful enough to warrant descriptive alt (e.g. “LEMARS dağıtım aracı / lojistik operasyonu”). *(No keyword stuffing.)*
- **Filenames:** descriptive (`hero-truck.jpg`, `hero-warehouse.jpg`, `logistics.jpg`). OK.
- **Weights:** `enjoy.png` 761 KB, `suvorov.png` 491 KB (recompress); others reasonable. `cool.png` 155 KB.
- **Hero LCP:** `hero-truck.jpg` uses `priority` + `sizes` (`[locale]/page.tsx`) ✓.

---

## Performance Audit

> **Core Web Vitals field/lab numbers: NOT VERIFIED** (no Lighthouse/CrUX run in this audit). Below is static analysis from code + assets.

- **LCP risk:** Google-Fonts `@import` in `globals.css:5` is render-blocking + third-party → delays text paint. → `next/font/google`. Hero image is already `priority`.
- **CLS:** `next/image` with width/height/fill throughout → low risk. AgeGate spinner→content swap can shift first paint (overlay fix helps).
- **INP:** mostly server components; interactive parts (Header menu, AgeGate, CoverageMap/FlowDiagram SVG animations, framer-motion reveals) are light.
- **Unnecessary client component:** `src/app/[locale]/iletisim/page.tsx` is `"use client"` and fetches the dictionary in `useEffect` (spinner flash) — could be a Server Component with a small client form child.
- **Third-party:** only Google Fonts (removed by `next/font`) + a lazy Google-Maps iframe on `/iletisim` (`loading="lazy"` ✓). No analytics/GTM present.
- **First-solution guardrail:** optimize fonts/images/component-boundaries **before** touching animations. Keep the LEMARS truck/coverage animations.

---

## Quick Wins (≤10, ~1 day, low risk)

1. `src/app/robots.ts` — real robots + sitemap reference. *(XS)*
2. `src/app/sitemap.ts` — all TR+EN routes + 7 brand pages. *(S)*
3. `metadataBase` in `[locale]/layout.tsx`. *(XS)*
4. Per-page unique title + description via `src/lib/seo.ts`. *(M)*
5. Self-canonical + hreflang (`tr`/`en`/`x-default`, same slug). *(S–M, ships with #4)*
6. `<html lang={locale}>` (move html/body into `[locale]/layout.tsx`). *(S)*
7. `Organization` + `WebSite` JSON-LD (verified NAP). *(S)*
8. `notFound()` on invalid locale + `not-found.tsx`. *(XS)*
9. Open Graph + Twitter + one corporate OG image. *(S + asset)*
10. Fonts → `next/font`; recompress `enjoy.png`/`suvorov.png`. *(S)*

---

## Management Risk List

- **R1 — AgeGate indexation (P0):** whole-site content may not be indexed. *(verified)*
- **R2 — Duplicate metadata (P1):** all pages compete with identical title/description. *(verified)*
- **R3 — ⚠ Separate `lemars-static` deployment (NOT VERIFIED):** the parent folder is a different project (“İdari İşler İşletim Sistemi”, Vercel project `lemars-static`, `../.vercel/project.json`). If it is live under a lemars-branded URL and indexed, an unrelated “İdari İşler” site could surface for LEMARS searches. **Not part of this repo / not lemarsgida.com.** Verify the deployment URL in Vercel + Google Search Console and de-index/remove if unwanted. *(This likely explains the “idari işler” you saw.)*
- **R4 — Email deliverability affects lead capture** (see UX/Tech audit P0-2) — SEO drives traffic, but leads can be lost after arrival. *(verified `api/contact/route.ts` sandbox sender)*
- **R5 — No analytics/Search Console signals in repo (NOT VERIFIED externally):** can’t measure organic performance yet.

---

## Files Proposed for Modification (if approved — none changed yet)

**New:** `src/app/robots.ts` · `src/app/sitemap.ts` · `src/lib/seo.ts` · `src/app/[locale]/not-found.tsx` · `public/og/lemars-og.<jpg|png>`
**Edit:** `src/app/layout.tsx` · `src/app/[locale]/layout.tsx` · all 10 `page.tsx` files under `[locale]` · `src/i18n/tr.json` · `src/i18n/en.json` · `src/app/globals.css`
**Approval-gated (compliance):** `src/components/AgeGate.tsx`
**Do NOT touch:** TAPDK banner, cookie banner, legal page copy, brand colors, layout structure, animations. The parent `lemars-static` / İdari-İşler files are **out of scope** for this repo.

---

## Final Table

| Priority | Finding | Evidence/File | Recommended Change | Effort | Risk |
|---|---|---|---|---|---|
| P0 | Content not in server HTML (age gate) | live `curl /tr` body; `components/AgeGate.tsx` | Overlay pattern; keep verification/legal | S | ⚠ compliance approval |
| P1 | Duplicate title/description | only `[locale]/layout.tsx` sets metadata | Per-page `generateMetadata` via `lib/seo.ts` | M | Low |
| P1 | No canonical/hreflang/metadataBase | grep src → none | metadataBase + self-canonical + hreflang (same slug) | S–M | Low |
| P1 | `<html>` no lang | `layout.tsx:15` | Move html/body to `[locale]`, `lang={locale}` | S | Low-med |
| P1 | No robots.txt / sitemap.xml | live soft-200 HTML | `app/robots.ts` + `app/sitemap.ts` | XS–S | Very low |
| P1 | No structured data | grep → none | Organization + WebSite JSON-LD (verified NAP) | S | Very low |
| P1 | Invalid-locale soft-404 | `[locale]/layout.tsx:15,32`; live | `notFound()` + `not-found.tsx` | XS | Low |
| P1 | Alcohol-forward titles | live `<title>` | B2B titles/descriptions (§Page-by-Page) | M | Low (SERP text) |
| P2 | No OG/Twitter + no OG image | grep + `ls public/og` (absent) | OG/Twitter tags + corporate 1200×630 image | S | Low |
| P2 | Render-blocking font `@import` | `globals.css:5` | `next/font/google` | S | Low-med |
| P2 | Heavy logos | `ls`: enjoy 761KB, suvorov 491KB | Recompress < 150 KB | S | Low |
| P2 | Dead `routeMap` implies wrong EN slugs | `i18n/config.ts` (unused) | Remove or wire up | XS | Low |
| P3 | 307 vs 308 locale redirects | live curl | Optional permanent redirects | XS | Low |
| ⚠ | `lemars-static` unrelated deployment | `../.vercel/project.json` | **NOT VERIFIED** — check Vercel/GSC; de-index if unwanted | — | Brand |

**No code changed. Awaiting your selection before implementation.** AgeGate and legal-adjacent changes remain approval-gated.
