export function turkishUpper(s: string): string {
  return s
    .replace(/i/g, "İ")
    .replace(/ı/g, "I")
    .replace(/ğ/g, "Ğ")
    .replace(/ü/g, "Ü")
    .replace(/ş/g, "Ş")
    .replace(/ö/g, "Ö")
    .replace(/ç/g, "Ç")
    .toUpperCase();
}

export function localeUpper(s: string, locale: string): string {
  if (locale === "tr") return turkishUpper(s);
  return s.toUpperCase();
}
