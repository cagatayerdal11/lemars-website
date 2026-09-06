import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Yalnızca herkese açık ve indekslenebilir rotalar. Hariç: /api, /admin.
// Marka detay sayfaları (/markalarimiz/[brand]) mevzuat uyumu kapsamında TAMAMEN
// KALDIRILMIŞTIR (bkz. next.config.js kalıcı yönlendirmeleri); bu nedenle sitemap
// dışında bırakılmaları yeterli değildi, rotanın kendisi de silinmiştir.
// Dayanak: Satış ve Sunum Yönetmeliği m.11/4; 4250 s.K. m.6/1.
// Her iki dilde de aynı Türkçe slug kullanılır.
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
