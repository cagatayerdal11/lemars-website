import type { Metadata } from "next";

// Single source of truth for LEMARS SEO. Keep it small — this is a KOBİ site.
export const SITE_URL = "https://www.lemarsgida.com";
export const OG_IMAGE = "/og/lemars-og.png";

interface BuildMetadataArgs {
  locale: string;
  /** Turkish slug path, same for both locales. "" for home, "/hakkimizda", etc. */
  path: string;
  title: string;
  description: string;
}

/**
 * Builds per-page metadata: self-referencing canonical, TR/EN + x-default
 * hreflang (same slug across locales — verified: /en uses Turkish slugs),
 * Open Graph and Twitter. metadataBase / robots come from the [locale] layout.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: BuildMetadataArgs): Metadata {
  const loc = locale === "en" ? "en" : "tr";
  const canonical = `${SITE_URL}/${loc}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/tr${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}/tr${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "LEMARS",
      title,
      description,
      url: canonical,
      locale: loc === "tr" ? "tr_TR" : "en_US",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "LEMARS Gıda İçecek" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
