"use client";

import { useEffect } from "react";
import {
  trackContactAction,
  trackSocialClick,
  type ContactActionType,
  type SocialNetwork,
} from "@/lib/analytics/gtag";

/**
 * Tek bir delegated click listener — tüm sayfadaki iletişim/sosyal linklerini
 * otomatik yakalar. Header / Footer gibi Server Component'lere dokunmadan,
 * dağınık tracking olmadan çalışır (KOBİ: minimal, sürdürülebilir).
 *
 * action_type link'in href şemasından türetilir; cta_location DOM bağlamından
 * (`data-cta` attribute'u veya en yakın landmark) çıkarılır.
 */

type Detected =
  | { kind: "contact"; action: ContactActionType }
  | { kind: "social"; network: SocialNetwork }
  | null;

function detect(anchor: HTMLAnchorElement): Detected {
  const protocol = anchor.protocol; // "tel:", "mailto:", "https:"
  const host = anchor.hostname.toLowerCase();

  if (protocol === "tel:") return { kind: "contact", action: "phone" };
  if (protocol === "mailto:") return { kind: "contact", action: "email" };

  // NOT: WhatsApp ve Instagram tespiti kaldırıldı — bu kamuya açık CTA'lar mevzuat
  // uyumu kapsamında siteden çıkarıldığı için ölçüm de yapılmaz. Yalnızca telefon,
  // e-posta ve kurumsal LinkedIn ölçülür.
  if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
    return { kind: "social", network: "linkedin" };
  }

  return null;
}

function ctaLocation(anchor: HTMLElement): string {
  const explicit = anchor.closest<HTMLElement>("[data-cta]");
  if (explicit?.dataset.cta) return explicit.dataset.cta;

  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";

  const path = window.location.pathname;
  if (path.includes("/iletisim") || path.includes("/contact")) {
    return "contact_page";
  }
  return "body";
}

export default function AnalyticsClickTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Yalnızca birincil tıklama (yeni sekme/kopyalama vb. hariç değil — link yine açılır).
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const detected = detect(anchor);
      if (!detected) return;

      if (detected.kind === "contact") {
        trackContactAction({
          action_type: detected.action,
          cta_location: ctaLocation(anchor),
        });
      } else {
        trackSocialClick({ network: detected.network });
      }
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
