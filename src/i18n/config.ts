export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  tr: () => import("./tr.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
