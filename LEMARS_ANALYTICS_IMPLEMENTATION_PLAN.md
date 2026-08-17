# LEMARS — Analytics Implementation Plan

> Bu doküman, LEMARS websitesine kurulacak **Dijital Performans Raporlama Sistemi**'nin
> mimari kararlarını ve uygulama planını özetler. Kurulum adımları için ayrıca
> [`LEMARS_ANALYTICS_SETUP.md`](./LEMARS_ANALYTICS_SETUP.md) dosyasına bakın.

## 1. Repository Audit — Mevcut Durum

| Konu | Tespit |
|------|--------|
| Framework | **Next.js 14.2.35** (App Router) |
| Router | App Router — `src/app/[locale]/...` (tr / en) |
| Dil / i18n | Custom, `src/i18n/*` — `tr.json` / `en.json`, `getDictionary()` |
| React / TS | React 18.3.1, TypeScript 5 (`strict: false`) |
| Styling | Tailwind 3.4.19 — Poppins, brand orange `primary-700 = #E8611A` |
| Hosting | **Vercel** (proje: `lemars-website`) → GitHub `cagatayerdal11/lemars-website` → `lemarsgida.com` |
| Deploy | `git push origin main` → Vercel otomatik deploy |
| Email provider | **Resend zaten kurulu** (`resend`, `RESEND_API_KEY`), `/api/contact` kullanıyor |
| Mevcut analytics | **YOK** — GA4 / GTM / gtag / dataLayer / doğrulama meta'sı bulunamadı |
| Cookie consent | `CookieBanner` var — `localStorage["lemars-cookie-consent"] = accepted \| rejected`. Consent Mode / analytics gating **yok** |
| Auth sistemi | **YOK** — admin route yok |
| robots / sitemap | **YOK** — indexleme kısıtı yok (admin için ekleyeceğiz) |
| Secret güvenliği | `.env.local` git tarafından **ignore ediliyor**, takip edilen secret dosyası yok → **P0 yok** ✓ |

### İletişim aksiyon noktaları (tracking hedefleri)

| Aksiyon | Nerede | `action_type` |
|---------|--------|---------------|
| Telefon | Header (masaüstü+mobil), Footer, İletişim sayfası (`tel:+902128091883`) | `phone` |
| E-posta | Footer, İletişim sayfası (`mailto:info@lemarsgida.com`) | `email` |
| WhatsApp | Floating buton, Header, İletişim sayfası kartı + başarı ekranı (`wa.me/905553643434`) | `whatsapp` |
| Form | İletişim formu (`/api/contact` başarılı submit) | `form` |
| Sosyal | Instagram / LinkedIn (Header + Footer) | `social_click` |
| Dil değişimi | `LanguageSwitcher` (Header) | `language_change` |

## 2. Mimari Kararlar (KOBİ filtresi uygulanmış)

1. **GA4 (gtag.js) + Google Consent Mode v2** — analytics ana kaynağı. Consent varsayılan
   `denied`; kullanıcı `CookieBanner`'da kabul edene kadar hiçbir event/pageview gitmez.
2. **Merkezî delegated click listener** — tek bir client bileşeni tüm sayfadaki
   `tel:` / `mailto:` / `wa.me` / sosyal linklerini otomatik yakalar. Header/Footer gibi
   Server Component'lere dokunmadan, dağınık tracking olmadan çalışır (KOBİ: minimal).
3. **Reporting: `google-auth-library` + REST** — ağır `googleapis` / gRPC yerine küçük,
   resmi auth kütüphanesi + doğrudan REST çağrısı (GA4 Data API + Search Console API).
   Server-only, browser'a bundle edilmez.
4. **Tek `report.ts` servisi** — dashboard ve aylık email **aynı** raporu üretir.
5. **Admin auth: minimal ama güvenli** — env'de scrypt (tuzlu, yavaş KDF) parola
   hash'i + HMAC imzalı HttpOnly/Secure/SameSite cookie oturumu + rate limit.
   Enterprise auth eklenmez. (Zero yeni runtime dependency — `node:crypto`.)
6. **Cron: Vercel Cron** — `vercel.json`, ayın 4'ü 06:00 UTC (≈ 09:00 TR). `CRON_SECRET` ile korunur.
7. **DB yok** — historical veri GA4/Search Console'dan tarih aralığı ile çekilir; dashboard
   `unstable_cache` ile 1 saat cache'lenir (gereksiz API çağrısı yok).
8. **Chart library yok** — CSS bar + tablo yeterli.

## 3. Ölçüm Modeli

Ana conversion: **iletişim kurma niyeti**. Ana KPI'lar: Visitors · Google Clicks · Contact Users · Contact Rate.

**Contact Action Rate** = `contact_action` yapan **unique kullanıcı** / **toplam active user**
(ham tıklama değil — aynı kişinin 5 tıklaması 5 lead sayılmaz). Ham sayı ayrıca gösterilir.

### GA4 Event Modeli
```
contact_action   { action_type: whatsapp|phone|email|form, page_path, locale, cta_location }
social_click     { network: instagram|linkedin, page_path, locale }
language_change  { from_locale, to_locale, page_path }
```
**PII gönderilmez** — sadece interaction metadata. Alkol markası/ürün adı da gönderilmez.

## 4. Uygulanacak Dosyalar

```
src/lib/analytics/gtag.ts                 GA4 helper API (client-safe)
src/components/analytics/GoogleAnalytics.tsx   gtag.js + Consent Mode + SPA pageview
src/components/analytics/AnalyticsClickTracker.tsx   delegated click tracking
src/lib/reporting/types.ts                LemarsDigitalReport tipi
src/lib/reporting/periods.ts              tarih dönemi yardımcıları (Europe/Istanbul)
src/lib/reporting/google-auth.ts          service-account access token
src/lib/reporting/ga4.ts                  GA4 Data API (REST)
src/lib/reporting/search-console.ts       Search Console API (REST)
src/lib/reporting/insights.ts             deterministik yönetim yorumları
src/lib/reporting/report.ts               birleşik rapor servisi (+ cache)
src/lib/format.ts                         TR sayı/yüzde formatlama
src/lib/auth/session.ts                   HMAC imzalı oturum cookie'si
src/lib/auth/admin.ts                     parola doğrulama + rate limit
src/lib/email/report-email.ts             HTML email şablonu
src/lib/email/send-report.ts              Resend ile gönderim
src/app/admin/layout.tsx                  noindex admin layout
src/app/admin/login/page.tsx              login ekranı
src/app/admin/rapor/page.tsx              dashboard (auth guard)
src/app/admin/rapor/Dashboard.tsx         dashboard UI (client)
src/app/api/admin/login/route.ts          POST login
src/app/api/admin/logout/route.ts         POST logout
src/app/api/admin/report/route.ts         GET rapor (auth'lu, cache'li)
src/app/api/admin/test-email/route.ts     POST test email (auth'lu)
src/app/api/cron/monthly-report/route.ts  aylık cron (CRON_SECRET'li)
src/app/robots.ts                         /admin + /api disallow
vercel.json                               cron schedule
.env.local.example                        env dokümantasyonu
```
Değiştirilecekler: `src/middleware.ts` (admin route istisnası), `[locale]/layout.tsx`
(analytics bileşenleri), `CookieBanner.tsx` (consent sinyali), `LanguageSwitcher.tsx`,
`iletisim/page.tsx` (form event), `package.json` (google-auth-library).

## 5. Güvenlik & KVKK

- GA4 consent verilmeden aktif olmaz (Consent Mode denied + helper gating).
- Admin API'leri UI değil **server-side authorization** ile korunur.
- Cron ayrı `CRON_SECRET` ile korunur (public spam engellenir).
- Secret'lar `NEXT_PUBLIC_` değildir, GitHub'a commit edilmez; `GOOGLE_PRIVATE_KEY` newline güvenli parse edilir.
- Search Console verisi (query'ler) sadece admin panelde; public'e çıkmaz.

## 6. Blocker

**Kod açısından blocker yok.** Sistem tam olarak kodlanır; canlıya alınması için gereken
Google/Vercel kurulum adımları (service account, GA4 property, env değişkenleri) kullanıcı
tarafından yapılacak **manuel işlemlerdir** ve `LEMARS_ANALYTICS_SETUP.md` + rapor sonundaki
**MANUAL ACTION REQUIRED** listesinde adım adım verilir.
