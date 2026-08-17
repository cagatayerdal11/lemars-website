/**
 * TR locale-aware formatlama — dashboard ve email tarafından paylaşılır.
 * 1248 -> "1.248", 0.046 -> "%4,6"
 */

const trNumber = new Intl.NumberFormat("tr-TR");

export function formatNumber(value: number): string {
  if (!isFinite(value)) return "0";
  return trNumber.format(Math.round(value));
}

/** Ondalıklı sayı (ör. ortalama pozisyon 12,4). */
export function formatDecimal(value: number, digits = 1): string {
  if (!isFinite(value)) return "0";
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Oran (0..1) -> "%4,6" */
export function formatPercent(ratio: number, digits = 1): string {
  if (!isFinite(ratio)) return "%0";
  const pct = ratio * 100;
  return "%" + formatDecimal(pct, digits);
}

/** Karşılaştırma yüzdesi (zaten yüzde değeri) -> "↑ %18" / "↓ %7" / "—" */
export function formatDelta(percent: number | null): {
  text: string;
  direction: "up" | "down" | "flat" | "na";
} {
  if (percent === null || !isFinite(percent)) {
    return { text: "—", direction: "na" };
  }
  const rounded = Math.round(percent);
  if (rounded > 0) return { text: `↑ %${rounded}`, direction: "up" };
  if (rounded < 0) return { text: `↓ %${Math.abs(rounded)}`, direction: "down" };
  return { text: "%0", direction: "flat" };
}

/** İki dönem arası yüzde değişim. Önceki 0 ise null (bölme tanımsız). */
export function percentChange(current: number, previous: number): number | null {
  if (!isFinite(current) || !isFinite(previous) || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}
