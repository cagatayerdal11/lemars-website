/**
 * LEMARS — GA4 client-side analytics helper.
 *
 * Client-safe: only uses NEXT_PUBLIC_GA_MEASUREMENT_ID, never a secret.
 * Every send is gated on the user's cookie consent (KVKK).
 *
 * PII kuralı: event parametrelerine isim / telefon / e-posta / mesaj / IP /
 * müşteri adı / alkol markası GÖNDERİLMEZ — yalnızca interaction metadata.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

/** CookieBanner ile paylaşılan localStorage anahtarı. */
export const CONSENT_STORAGE_KEY = "lemars-cookie-consent";

/** CookieBanner consent değişince window üzerinde tetiklenen event adı. */
export const CONSENT_EVENT = "lemars-consent-changed";

export type ContactActionType = "whatsapp" | "phone" | "email" | "form";
export type SocialNetwork = "instagram" | "linkedin";

type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?]
  | ["consent", "default" | "update", Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/** Analytics ölçümü yapılandırılmış mı? */
export function isAnalyticsConfigured(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}

/** Kullanıcı analytics çerezlerine onay verdi mi? */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function canSend(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    isAnalyticsConfigured() &&
    hasAnalyticsConsent()
  );
}

/** Consent Mode v2 durumunu günceller (kabul/ret). */
export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const value = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/** URL path'inden locale çıkarır (tr / en). */
export function localeFromPath(path: string): string {
  const m = path.match(/^\/(tr|en)(\/|$)/);
  return m ? m[1] : "tr";
}

function currentPath(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/** Genel event gönderimi (consent'e bağlı). */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!canSend()) return;
  window.gtag!("event", name, params);
}

/** SPA route değişiminde GA4 page_view (send_page_view: false ile manuel). */
export function pageview(path: string): void {
  if (!canSend()) return;
  window.gtag!("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}

/** Ana ticari metrik: iletişim aksiyonu. */
export function trackContactAction(input: {
  action_type: ContactActionType;
  cta_location: string;
  page_path?: string;
  locale?: string;
}): void {
  const page_path = input.page_path ?? currentPath();
  trackEvent("contact_action", {
    action_type: input.action_type,
    cta_location: input.cta_location,
    page_path,
    locale: input.locale ?? localeFromPath(page_path),
  });
}

/** Instagram / LinkedIn dışa tıklama (yalnızca website → social outbound). */
export function trackSocialClick(input: {
  network: SocialNetwork;
  page_path?: string;
  locale?: string;
}): void {
  const page_path = input.page_path ?? currentPath();
  trackEvent("social_click", {
    network: input.network,
    page_path,
    locale: input.locale ?? localeFromPath(page_path),
  });
}

/** Dil değişimi. */
export function trackLanguageChange(input: {
  from_locale: string;
  to_locale: string;
  page_path?: string;
}): void {
  trackEvent("language_change", {
    from_locale: input.from_locale,
    to_locale: input.to_locale,
    page_path: input.page_path ?? currentPath(),
  });
}
