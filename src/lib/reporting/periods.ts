/**
 * LEMARS — Rapor dönemi hesaplayıcıları (Europe/Istanbul).
 * Türkiye 2016'dan beri sabit UTC+3 (yaz saati yok).
 *
 * Search Console veri gecikmesi olduğu için "bugün" ve "dün" ham veri sayılmaz;
 * dönemler son TAMAMLANMIŞ günü baz alır (end = dün).
 */

import type { PeriodKey } from "./types";

const TR_MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const IANA_TZ = "Europe/Istanbul";

/** Istanbul'da bugünün tarihi "YYYY-MM-DD". */
export function istanbulToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IANA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function ymdToUTC(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function utcToYMD(dt: Date): string {
  return dt.toISOString().slice(0, 10);
}

export function addDays(ymd: string, n: number): string {
  const dt = ymdToUTC(ymd);
  dt.setUTCDate(dt.getUTCDate() + n);
  return utcToYMD(dt);
}

function firstOfMonth(ymd: string): string {
  const [y, m] = ymd.split("-");
  return `${y}-${m}-01`;
}

/** İki tarih arası gün farkı (b - a). */
function daysBetween(a: string, b: string): number {
  return Math.round((ymdToUTC(b).getTime() - ymdToUTC(a).getTime()) / 86400000);
}

function monthLabel(ymd: string): string {
  const [y, m] = ymd.split("-").map(Number);
  return `${TR_MONTHS[m - 1]} ${y}`;
}

export interface ResolvedPeriod {
  key: PeriodKey;
  label: string;
  start: string;
  end: string;
  comparisonStart: string;
  comparisonEnd: string;
}

/**
 * Dönem anahtarını gerçek tarih aralıklarına çevirir.
 * Karşılaştırma her zaman aynı uzunlukta bir önceki dönemdir.
 */
export function resolvePeriod(
  key: PeriodKey,
  now: Date = new Date()
): ResolvedPeriod {
  const today = istanbulToday(now);
  const yesterday = addDays(today, -1);

  if (key === "lastMonth") {
    const firstThisMonth = firstOfMonth(today);
    const end = addDays(firstThisMonth, -1); // önceki ayın son günü
    const start = firstOfMonth(end);
    const comparisonEnd = addDays(start, -1);
    const comparisonStart = firstOfMonth(comparisonEnd);
    return {
      key,
      label: `Geçen Ay — ${monthLabel(start)}`,
      start,
      end,
      comparisonStart,
      comparisonEnd,
    };
  }

  if (key === "thisMonth") {
    const start = firstOfMonth(today);
    // Ayın 1'iyse dün geçen aya düşer; en az bugünü kapsa.
    const end = yesterday < start ? today : yesterday;
    const elapsed = daysBetween(start, end);
    const comparisonStart = firstOfMonth(addDays(start, -1)); // önceki ayın 1'i
    const comparisonEnd = addDays(comparisonStart, elapsed);
    return {
      key,
      label: `Bu Ay — ${monthLabel(start)}`,
      start,
      end,
      comparisonStart,
      comparisonEnd,
    };
  }

  // last30 / last90 — kayan pencere, son tamamlanmış güne kadar
  const span = key === "last90" ? 90 : 30;
  const end = yesterday;
  const start = addDays(end, -(span - 1));
  const comparisonEnd = addDays(start, -1);
  const comparisonStart = addDays(comparisonEnd, -(span - 1));
  return {
    key,
    label: key === "last90" ? "Son 90 Gün" : "Son 30 Gün",
    start,
    end,
    comparisonStart,
    comparisonEnd,
  };
}

/**
 * Aylık email dönemi: bir önceki tam takvim ayı, karşılaştırma ondan önceki ay.
 * (4 Ağustos'ta çalışırsa → Temmuz raporu, Haziran ile karşılaştırma.)
 */
export function monthlyReportPeriod(now: Date = new Date()): ResolvedPeriod & {
  monthName: string;
} {
  const p = resolvePeriod("lastMonth", now);
  return { ...p, monthName: monthLabel(p.start) };
}

export const PERIOD_KEYS: PeriodKey[] = ["last30", "thisMonth", "lastMonth", "last90"];

export function isPeriodKey(v: string): v is PeriodKey {
  return (PERIOD_KEYS as string[]).includes(v);
}
