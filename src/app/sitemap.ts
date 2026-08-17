import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Public, indexable routes only. Excludes: /api, /admin, and individual
// brand-detail pages (/markalarimiz/[brand]) — kept out pending compliance
// review, per project decision. Same Turkish slug is used for both locales.
const PUBLIC_PATHS = [
  "",
  "/hakkimizda",
  "/hizmetlerimiz",
  "/distributorluklerimiz",
  "/markalarimiz",
  "/iletisim",
  "/yasal/kullanim-kosullari",
  "/yasal/kvkk",
  "/yasal/sorumluluk-reddi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_PATHS.flatMap((path) => {
    const languages = {
      tr: `${SITE_URL}/tr${path}`,
      en: `${SITE_URL}/en${path}`,
    };
    return [
      {
        url: `${SITE_URL}/tr${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.7,
        alternates: { languages },
      },
      {
        url: `${SITE_URL}/en${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 0.9 : 0.6,
        alternates: { languages },
      },
    ];
  });
}
