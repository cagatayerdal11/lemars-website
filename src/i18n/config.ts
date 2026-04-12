export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Route mappings: Turkish slug -> English slug
export const routeMap: Record<string, Record<string, string>> = {
  tr: {
    hakkimizda: "hakkimizda",
    hizmetlerimiz: "hizmetlerimiz",
    iletisim: "iletisim",
    distributorluklerimiz: "distributorluklerimiz",
    markalarimiz: "markalarimiz",
    "yasal/kullanim-kosullari": "yasal/kullanim-kosullari",
    "yasal/kvkk": "yasal/kvkk",
    "yasal/sorumluluk-reddi": "yasal/sorumluluk-reddi",
  },
  en: {
    hakkimizda: "about",
    hizmetlerimiz: "services",
    iletisim: "contact",
    distributorluklerimiz: "distributorships",
    markalarimiz: "brands",
    "yasal/kullanim-kosullari": "legal/terms",
    "yasal/kvkk": "legal/privacy",
    "yasal/sorumluluk-reddi": "legal/disclaimer",
  },
};

// Reverse map: English slug -> internal key
export const reverseRouteMap: Record<string, string> = {
  about: "hakkimizda",
  services: "hizmetlerimiz",
  contact: "iletisim",
  distributorships: "distributorluklerimiz",
  brands: "markalarimiz",
  "legal/terms": "yasal/kullanim-kosullari",
  "legal/privacy": "yasal/kvkk",
  "legal/disclaimer": "yasal/sorumluluk-reddi",
};

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  tr: () => import("./tr.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
