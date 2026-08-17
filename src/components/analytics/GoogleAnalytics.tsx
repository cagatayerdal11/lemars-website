"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  CONSENT_EVENT,
  hasAnalyticsConsent,
  updateAnalyticsConsent,
  pageview,
} from "@/lib/analytics/gtag";

/**
 * GA4 (gtag.js) yükleyici + Google Consent Mode v2 + SPA page_view.
 *
 * - Consent varsayılan `denied` — kullanıcı CookieBanner'da kabul edene kadar
 *   hiçbir çerez yazılmaz / event gitmez (KVKK).
 * - `send_page_view: false` → route değişimlerinde manuel page_view (duplicate yok).
 * - Measurement ID tanımlı değilse hiçbir şey render edilmez (temiz no-op).
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  // 1) Mount: mevcut consent'i gtag'e yansıt + canlı consent değişimini dinle.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    if (hasAnalyticsConsent()) {
      updateAnalyticsConsent(true);
    }

    const onConsentChange = () => {
      const granted = hasAnalyticsConsent();
      updateAnalyticsConsent(granted);
      if (granted && pathname) {
        // Onay verildiği anda bulunulan sayfa için ilk page_view.
        pageview(pathname);
      }
    };

    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
    // pathname'i bağımlılığa katmıyoruz — listener her zaman güncel path'i okur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Route değişiminde page_view (yalnızca consent varsa).
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !pathname) return;
    pageview(pathname);
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
