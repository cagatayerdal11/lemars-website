# LEMARS_UX_BRAND_TECH_AUDIT.md

**Site:** https://www.lemarsgida.com · **Repo:** `lemars-website` (Next.js 14 App Router) · **Read-only audit — no code changed.**
**Company:** LEMARS Gıda İçecek — İstanbul Avrupa Yakası B2B satış / tedarik / dağıtım (KOBİ).
**Principle applied:** *Küçük geliştirme → görünür fayda.* No enterprise architecture, no over-engineering. **Business Value is the top ranking criterion.**
**Priorities:** P0 critical · P1 high · P2 improvement · P3 nice-to-have. **Effort:** XS <30m · S 30–90m · M 2–4h · L 1d+.

---

## Executive Summary — top 10

1. **🔴 Lost-lead risk #1 — the contact form reports success even when it fails.** `handleSubmit` ignores the API response (`catch {}`, never checks `response.ok`) and always shows the success screen. If email delivery fails, the visitor thinks the message was sent. For a B2B KOBİ whose #1 conversion is this form, this is the highest-business-value fix. **P0.**
2. **🔴 Lost-lead risk #2 — outgoing email uses Resend's sandbox sender** (`from: onboarding@resend.dev`), not a verified `@lemarsgida.com` domain. High risk of spam-foldering / non-delivery of leads to `info@lemarsgida.com`. **P0/P1.**
3. **🔴 AgeGate hides content on first paint** (spinner → gate before any content). This is the big SEO issue (see `LEMARS_SEO_AUDIT.md` §G) and also a UX flash. Fix = overlay pattern; compliance approval needed. **P0.**
4. **🟠 No reduced-motion support anywhere** — CoverageMap, FlowDiagram (SMIL), ScrollReveal & AnimatedCounter (framer-motion) all animate regardless of the user's OS setting. Accessibility + comfort. **P1.**
5. **🟠 Form fields have no label association** (`0` `htmlFor`/`id` pairs) — screen-reader + click-to-focus a11y gap on the main lead form. **P1.**
6. **🟠 Inconsistent CTAs & orange tokens.** “İletişime Geç / Bize Ulaşın / İletişime Geçin” used interchangeably; Footer uses `#d45a1e` while the brand orange is `primary-700 #E8611A`. Small polish, visible consistency win. **P2.**
7. **🟡 Mobile: WhatsApp button overlaps the cookie banner**, header is tall (banner + 96px header), and the flow/coverage diagrams require horizontal scroll. **P2.**
8. **🟡 Brand dropdown (Markalarımız) is hover-only** — not keyboard- or touch-friendly for opening. **P1/P2.**
9. **🟡 Performance: Poppins via Google-Fonts `@import`** (render-blocking) + the whole Contact page is an unnecessary client component + two heavy logos (`enjoy.png` 761 KB, `suvorov.png` 491 KB). **P2.**
10. **🟡 No analytics** — you can’t currently answer “is the site used and how do people contact us?” A lightweight setup + a few click events would fix that without complexity. **P2.**

---

## What's Already Good (keep as-is)

- **Semantic HTML:** proper `header/nav/main/footer`, exactly **one H1 per page**, real `<a>`/`<Link>` for navigation, `<button>` for actions.
- **Images:** `next/image` **everywhere** (13 components, 0 raw `<img>`) → automatic lazy-loading, sizing, modern formats. Decorative images correctly use `alt=""`.
- **Internal linking:** footer links every page + legal; header nav + brand dropdown; brand pages link back. Solid.
- **Trust signals present & real:** full legal name (LEMARS Gıda İçecek San. ve Tic. Ltd. Şti.), physical address, landline, corporate email, LinkedIn, Instagram, copyright, TAPDK license note, real Google Map. Consistent NAP across Header ↔ Footer.
- **Distinctive brand assets:** the distribution FlowDiagram (LEMARS truck animation) and the new Coverage Map are genuinely differentiating — **do not** template-ize them.
- **Buttons partly systemized:** `btn-primary` / `btn-outline` / `btn-white` component classes exist.
- **WhatsApp prefills are contextual & professional** (neutral “bilgi almak istiyorum”, no promotion) and per-page aware.
- **Language switch keeps you on the same page** (same slug, prefix swap) — good i18n UX.
- **Compliance components in place:** AgeGate, TAPDK banner, cookie consent (Accept/Reject both accessible, choice stored, not re-shown).
- **Security hygiene:** secrets in env (`.env.local` is gitignored), HSTS header present, no hardcoded keys.

---

## Critical Problems (P0)

### P0-1 — Contact form false success  ·  Business value: ★★★  ·  Effort: S
- **Current:** `iletisim/page.tsx` → `handleSubmit` does `try { await fetch(...) } catch {}` then unconditionally `setSubmitted(true)`. Never inspects `response.ok`.
- **Problem:** API 500 (or network fail) still shows “Mesajınız İletildi.” Leads silently lost.
- **Recommendation:** check `res.ok`; on failure show an error state (“Gönderilemedi, lütfen telefon/WhatsApp ile ulaşın” + fallback links). Keep success only on 200.
- **Risk:** low (isolated to the form).

### P0-2 — Email deliverability (sandbox sender)  ·  Business value: ★★★  ·  Effort: S
- **Current:** `api/contact/route.ts` → `from: "LEMARS Gıda İçecek <onboarding@resend.dev>"`.
- **Problem:** `onboarding@resend.dev` is Resend’s shared test sender → likely spam-foldered or rate-limited; leads may never reach `info@lemarsgida.com`.
- **Recommendation:** verify `lemarsgida.com` in Resend (SPF/DKIM) and send `from: "LEMARS <bilgi@lemarsgida.com>"` (or `noreply@`). **Needs a DNS step by you.** Until then, treat form leads as unreliable — the WhatsApp path is the safer channel.
- **Risk:** low code; needs DNS.

### P0-3 — AgeGate blocks content on first render  ·  Business value: ★★  ·  Effort: S (+approval)
- Cross-referenced in the SEO audit (§G). UX angle: every visit starts with a spinner, then the gate; underlying content isn’t painted until JS + verification. Overlay pattern fixes both. **Compliance approval required before changing AgeGate.**

---

## UX Improvements

| # | Finding (Current → Problem → Recommendation) | Priority | Effort |
|---|---|---|---|
| U1 | Contact page is a **full client component** that fetches the dictionary in `useEffect` → a `MarsLoader` spinner flashes on every visit before the form appears. → Make the page a Server Component; keep only the form as a small client child (dictionary rendered server-side, no spinner). | P2 | M |
| U2 | **CTA wording varies** for the same action: “İletişime Geç”, “Bize Ulaşın”, “İletişime Geçin”, “Teklif Alın”, “Fiyat Bilgisi Alın”. → Standardize to 1–2 corporate phrasings (e.g. **“İletişime Geçin”** primary, **“Teklif Alın”** for offers). Keep tone corporate/partnership, not sales. | P2 | S |
| U3 | **Brand dropdown is hover-only** (`group-hover`); no click/focus open. → Make it open on focus/click too (keyboard + touch). | P1 | S |
| U4 | Contact form has **no visible error/validation messaging** beyond native browser tooltips. → Add minimal inline invalid states (uses existing focus-ring style). | P2 | S |
| U5 | **Success screen** is good (WhatsApp quick-reply), but because of P0-1 it can show on failure. Tie it to real success. | P1 | (in P0-1) |
| U6 | **Map iframe** `title="LEMARS"` is vague. → “LEMARS Gıda İçecek — Avcılar, İstanbul konumu”. | P3 | XS |

---

## Mobile Improvements (tested logic @ 375 / 390 / 430 / 768)

| # | Finding | Priority | Effort |
|---|---|---|---|
| M1 | **WhatsApp button (`fixed bottom-6 right-6`) overlaps the CookieBanner (`fixed bottom-0`)** — both `z-50`. On phones they collide at the bottom. → Lift the WhatsApp button when the banner is visible, or dock the banner above it. | P2 | S |
| M2 | **Tall header stack:** TAPDK banner + `h-24` (96px) sticky header consume a lot of the mobile viewport. → Reduce mobile header height (e.g. `h-16`) and/or tighten the banner. | P2 | S |
| M3 | **FlowDiagram & CoverageMap** use `min-w-[960px]/[680px]` inside `overflow-x-auto` → horizontal scroll on phones. → Provide a simplified/scaled mobile rendering (fewer labels, taller aspect) so no sideways scroll. | P2 | M |
| M4 | **TAPDK banner text** is `text-[10px]` and wraps to several lines on mobile → cramped, low legibility (content is legal, keep text; improve size/padding only). | P2 | XS |
| M5 | Social icons are `18px` tap targets (< 44px recommended). → Increase hit area on mobile. | P2 | XS |
| **Good** | No horizontal page overflow found outside the diagrams; images are responsive; menus stack correctly. | — | — |

---

## Brand Consistency

| Area | Finding | Priority |
|---|---|---|
| Orange token | `primary-700 = #E8611A` is the brand orange, but **Footer logo underline uses `#d45a1e`** (a different orange), and SVG components hardcode `#ea580c`/`#fb923c`. → Standardize on the Tailwind `primary` scale; treat SVG hardcodes as the one allowed exception. | P2 |
| Border radius | Mixed `rounded-md / lg / xl / 2xl / full` with no rule → cards/buttons don’t feel systemized. → Pick a small scale (e.g. buttons `md`, cards `xl`) and apply. | P2 |
| Buttons | `btn-primary/outline/white` exist, but many buttons are **ad-hoc inline** (AgeGate, contact submit, cookie banner). → Route them through the button classes where possible. | P2 |
| Typography | Poppins weights used broadly and sensibly; scale is mostly consistent (`text-xs…text-6xl`). Minor: eyebrow/label style repeated inline many times → could be a `.eyebrow` utility. | P3 |
| **Good** | Color palette **is** centralized in `tailwind.config.js` (primary scale + dark). Icon set is a consistent stroke style. Overall the visual language is coherent. | — |

> **Do not change the visual language** — these are consistency tidy-ups within the existing identity.

---

## Accessibility (WCAG 2.1 AA — SME-focused P0/P1)

| # | Finding | Priority | Effort |
|---|---|---|---|
| A1 | **Form labels not associated** — `<label>` without `htmlFor`, inputs without `id` (0 pairs). Screen readers can’t link them; clicking a label doesn’t focus the field. → add `htmlFor`/`id`. | P1 | S |
| A2 | **No `prefers-reduced-motion` support** anywhere. → Gate framer-motion (respect `useReducedMotion`) and SMIL/CSS animations behind the media query. Keeps the LEMARS animations for everyone else. | P1 | S–M |
| A3 | **Brand dropdown keyboard-inaccessible** (hover-only) — see U3. | P1 | S |
| A4 | **AgeGate modal** has no focus trap, no `role="dialog"`/`aria-modal`, no ESC handling, and doesn’t lock background scroll. → add these (part of the overlay refactor). | P2 | S |
| A5 | **Touch targets** (social icons, some links) below 44px. | P2 | XS |
| A6 | **Focus visibility** — form inputs have `focus:ring` ✓, but verify custom buttons/links show a visible keyboard focus state. | P2 | S |
| **Good** | Icon-only controls (WhatsApp button, header social) have `aria-label`; decorative images use `alt=""` correctly; heading hierarchy is clean. | — | — |

---

## Performance (UX-side; see SEO audit for overlap)

| # | Finding | Priority | Effort |
|---|---|---|---|
| P-1 | **Poppins via `@import` from Google Fonts CDN** (globals.css line 5) — render-blocking + third-party request. → `next/font/google` (self-hosted, `swap`, preloaded). | P2 | S |
| P-2 | **Contact page unnecessarily client-side** + dict fetch → spinner flash + extra JS (U1). | P2 | M |
| P-3 | **Heavy logos:** `enjoy.png` 761 KB, `suvorov.png` 491 KB. → recompress (target < 150 KB). | P2 | S |
| P-4 | **Google Maps iframe** — already `loading="lazy"` ✓. Fine. | — | — |
| P-5 | `"use client"` usage (12 components) is mostly justified (menus, gate, animations). Only the **Contact page** is a clear needless-client case. Don’t refactor the rest without real benefit. | P3 | — |
| **Note** | No third-party analytics/marketing scripts loaded → light baseline. framer-motion is the main JS dep; keep (it powers the brand animations). | — | — |

---

## Analytics (currently none)

- **Current:** no GA4/GTM/Vercel Analytics; cookie banner gates nothing real.
- **Recommendation (SME-simple):** add **one** lightweight analytics (Vercel Analytics or GA4 via consent) and track a **handful** of high-signal events, so management can answer *“is the site used, and how do people reach us?”*:
  - WhatsApp click · phone (`tel:`) click · email (`mailto:`) click · contact-page view · **contact form submit (real success)** · LinkedIn/Instagram click · language change.
- **Do not** build a complex event taxonomy. Wire consent → analytics if GA4 is used (ties the cookie banner to a real purpose).
- **Priority:** P2 · **Effort:** S–M.

---

## Content Management

- **Current:** all copy in `src/i18n/tr.json` + `en.json` (centralized) — good and editable for a KOBİ.
- **Findings:** TR/EN must be hand-kept-in-sync (drift/typo risk); some copy duplicated across pages; large files but manageable.
- **Recommendation:** **keep JSON — do NOT add a CMS** (over-engineering for ~10 pages). Optionally add a tiny “how to edit copy” note in the README so non-devs can update text safely.
- **Priority:** P3.

---

## Compliance Review Points (flag-only — no legal opinion, no auto-changes)

- **AgeGate** — overlay refactor needs your confirmation it still satisfies your TAPDK/4250 interpretation (SEO audit §G).
- **TAPDKBanner / Footer legal note / cookie / KVKK / disclaimer** — legal text unchanged; only UX/legibility tweaks proposed. *Note: footer legal note currently prints “Yasal Bilgilendirme:” twice (bold label + repeated in the sentence) — a copy duplication to review, not a legal change.*
- **Brand & Distributorship pages** — describe alcohol products/producers; keep informational/corporate, no promotional wording, no Product/Offer schema (see SEO audit).
- **Contact API email body** interpolates user input into HTML unescaped → sanitize (also a security point). Not legal, but review.
- **Social links** — ensure the linked Instagram/LinkedIn present LEMARS as a corporate distributor, not a consumer alcohol lifestyle brand (see §Social below).

---

## Technical Maintainability

| # | Finding | Priority |
|---|---|---|
| T1 | **Dead code:** `routeMap` / `reverseRouteMap` in `src/i18n/config.ts` are **not used anywhere**. They imply English slugs (`/en/about`) that **don’t exist** — EN pages live at `/en/hakkimizda`, `/en/hizmetlerimiz` (verified: `/en/about` → 404). → Remove the dead maps, or decide to actually implement localized EN slugs (see T2). | P3 |
| T2 | **EN uses Turkish slugs** (`/en/hakkimizda`). Works fine; mildly suboptimal for English SEO/readability. For a KOBİ this is **acceptable — leave it** unless you specifically want English URLs (that’s L-effort with redirects; low ROI now). | P3 |
| T3 | **Contact API:** no server-side validation, no rate-limiting/spam protection, and **unescaped user input embedded in the notification email HTML** (email-injection risk). → escape inputs + add a honeypot or simple rate-limit. | P2 |
| T4 | Repeated inline “eyebrow/label” and card markup could be extracted to shared components/utilities to reduce drift. Optional. | P3 |
| **Good** | Clean App-Router structure, typed dictionaries, sensible component split, secrets in env, `next/image` throughout. | — |

---

## Security Basics

- ✅ Secrets in env; `.env.local` gitignored; no hardcoded keys. ✅ HSTS present (Vercel). ✅ External links use `rel="noopener noreferrer"`.
- ⚠️ **Contact API:** unescaped input → email HTML (T3); no rate limit / spam protection → form-spam & abuse risk. **P2.**
- ⚠️ No CSP header (nice-to-have for a marketing site). **P3.**
- Dependencies current-ish (`next 14.2.35`, `framer-motion 12`, `resend 6`). Review updates for breaking changes before bumping. **P3.**

---

## Social Media Brand Consistency (off-code recommendation)

Website identity to mirror on Instagram/LinkedIn: **minimal, corporate, B2B, orange/white/dark, trustworthy** — a **distribution company**, not a consumer-alcohol lifestyle brand. Suggested content world: **operasyon, depo, araç filosu, ekip, hizmet bölgesi, süreç/teknoloji, kurumsal gelişmeler, iş ortaklığı**. Avoid product packshots, cocktail/lifestyle, promotions/discounts. Keep logo, brand orange (`#E8611A`), and the B2B tagline consistent across profiles. *(No website change — brand-guidance note only.)*

---

## Quick Wins (≤10, ~1 day total)

1. **Fix contact-form false success** (check `res.ok`, add error state). — *P0, S* ★ business-critical
2. **Send email from a verified `@lemarsgida.com` sender** (Resend domain verify). — *P0/P1, S + DNS* ★ business-critical
3. **Associate form labels** (`htmlFor`/`id`). — *P1, S*
4. **Add `prefers-reduced-motion` guard** to animations. — *P1, S*
5. **Make the brand dropdown keyboard/touch-openable.** — *P1, S*
6. **Standardize CTA wording** (one contact phrase, one offer phrase). — *P2, S*
7. **Fix WhatsApp ↔ cookie-banner overlap on mobile.** — *P2, S*
8. **Poppins → `next/font`.** — *P2, S*
9. **Recompress `enjoy.png` / `suvorov.png`.** — *P2, S*
10. **Add lightweight analytics + WhatsApp/phone/email/form-submit events.** — *P2, S–M*

---

## Suggested 30-Day Improvements (KOBİ-realistic)

- **Week 1 — lead reliability (highest business value):** #1 form success/error, #2 verified email sender, form label a11y, analytics + contact events. *Now you can trust and measure leads.*
- **Week 2 — SEO essentials** (from `LEMARS_SEO_AUDIT.md` Batch 1): per-page metadata, canonical/hreflang (correct `/en/hakkimizda` slugs), `<html lang>`, robots.ts, sitemap.ts, Organization/WebSite schema.
- **Week 3 — polish & mobile:** reduced-motion, CTA/orange/radius consistency, mobile header + WhatsApp/cookie overlap, fonts→next/font, recompress logos, keyboard dropdown.
- **Week 4 — approvals & assets:** AgeGate overlay (after compliance sign-off), OG image (corporate), Contact page → server component, contact-API hardening. Plus: gather **real** depot/vehicle/team photos to replace stock imagery over time.

---

## Final Priority Table (ranked by Business Value)

| Priority | Improvement | Business Value | User Value | Effort | Risk |
|---|---|---|---|---|---|
| **P0** | Contact form: real success/error handling | ★★★ (leads) | ★★★ | S | Low |
| **P0/P1** | Verified email sender (deliverability) | ★★★ (leads) | ★★ | S + DNS | Low |
| **P0** | AgeGate overlay (crawlable content) | ★★★ (traffic) | ★★ | S | ⚠ compliance approval |
| **P1** | Lightweight analytics + contact events | ★★★ (visibility) | ★ | S–M | Low |
| **P1** | Form label association (a11y) | ★ | ★★ | S | Low |
| **P1** | Reduced-motion support | ★ | ★★ | S–M | Low |
| **P1** | Keyboard/touch brand dropdown | ★ | ★★ | S | Low |
| **P2** | CTA wording standardization | ★★ (clarity) | ★★ | S | Low |
| **P2** | Mobile: WhatsApp/cookie overlap + header height | ★ | ★★ | S | Low |
| **P2** | Orange/radius/button consistency | ★★ (brand) | ★ | S–M | Low |
| **P2** | Fonts → next/font + recompress logos (perf) | ★ | ★★ | S | Low-med |
| **P2** | Contact page → Server Component | ★ | ★★ | M | Low-med |
| **P2** | Contact API: escape input + rate-limit | ★★ (security) | ★ | S | Low |
| **P3** | Remove dead `routeMap`; map cleanup | ★ | — | XS | Low |
| **P3 (skip now)** | CMS, localized EN slugs, CSP, design-token framework | low | low | L | — over-engineering for a KOBİ |

---

**No code changed.** This is analysis only, paired with `LEMARS_SEO_AUDIT.md`. Tell me which items to implement (I recommend the **Week-1 lead-reliability set** first — highest business value, low risk) and I’ll do them in small, verified batches. AgeGate and any legal-text-adjacent change wait for your explicit approval.
