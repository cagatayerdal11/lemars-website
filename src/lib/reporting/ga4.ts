/**
 * LEMARS — Google Analytics 4 Data API (REST, server-only).
 *
 * "Siteye gelen kullanıcı ne yaptı?" sorusunu yanıtlar.
 * Ağır googleapis/gRPC yerine küçük auth kütüphanesi + doğrudan REST.
 */

import { getAccessToken, GA4_SCOPE } from "./google-auth";
import type { TopPage, TrafficSource } from "./types";

const ENDPOINT = "https://analyticsdata.googleapis.com/v1beta";

export function getPropertyId(): string {
  return (process.env.GA4_PROPERTY_ID || "").replace(/\D/g, "");
}

export function hasGa4Config(): boolean {
  return getPropertyId().length > 0;
}

export interface DateRange {
  start: string;
  end: string;
}

interface Ga4Row {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
}

interface RunReportBody {
  dateRanges: { startDate: string; endDate: string }[];
  metrics: { name: string }[];
  dimensions?: { name: string }[];
  dimensionFilter?: unknown;
  orderBys?: unknown[];
  limit?: number;
  keepEmptyRows?: boolean;
}

async function runReport(body: RunReportBody): Promise<Ga4Row[]> {
  const propertyId = getPropertyId();
  const token = await getAccessToken(GA4_SCOPE);

  const res = await fetch(`${ENDPOINT}/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    // Server-side; Next fetch cache'ini kapat (rapor katmanı kendi cache'ini yönetir).
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await safeErr(res);
    throw new Error(`GA4 API ${res.status}: ${detail}`);
  }

  const json = (await res.json()) as { rows?: Ga4Row[] };
  return json.rows ?? [];
}

async function safeErr(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { error?: { message?: string } };
    return j.error?.message?.slice(0, 200) || res.statusText;
  } catch {
    return res.statusText;
  }
}

function num(v?: string): number {
  const n = Number(v);
  return isFinite(n) ? n : 0;
}

function range(r: DateRange) {
  return [{ startDate: r.start, endDate: r.end }];
}

const CONTACT_FILTER = {
  filter: {
    fieldName: "eventName",
    stringFilter: { matchType: "EXACT", value: "contact_action" },
  },
};

/** Temel metrikler: active users, sessions, page views. */
export async function getCoreMetrics(r: DateRange): Promise<{
  users: number;
  sessions: number;
  pageViews: number;
}> {
  const rows = await runReport({
    dateRanges: range(r),
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
    ],
  });
  const m = rows[0]?.metricValues ?? [];
  return {
    users: num(m[0]?.value),
    sessions: num(m[1]?.value),
    pageViews: num(m[2]?.value),
  };
}

/** contact_action yapan UNIQUE kullanıcı sayısı (dedup — ana lead metriği). */
export async function getContactUsers(r: DateRange): Promise<number> {
  const rows = await runReport({
    dateRanges: range(r),
    metrics: [{ name: "activeUsers" }],
    dimensionFilter: CONTACT_FILTER,
  });
  return num(rows[0]?.metricValues?.[0]?.value);
}

/** action_type kırılımı: ham aksiyon (eventCount) + unique kullanıcı (activeUsers). */
export async function getContactBreakdown(r: DateRange): Promise<{
  actions: number;
  whatsapp: number;
  phone: number;
  email: number;
  form: number;
}> {
  const rows = await runReport({
    dateRanges: range(r),
    dimensions: [{ name: "customEvent:action_type" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: CONTACT_FILTER,
    limit: 20,
  });

  const out = { actions: 0, whatsapp: 0, phone: 0, email: 0, form: 0 };
  for (const row of rows) {
    const type = (row.dimensionValues?.[0]?.value || "").toLowerCase();
    const count = num(row.metricValues?.[0]?.value);
    out.actions += count;
    if (type === "whatsapp") out.whatsapp += count;
    else if (type === "phone") out.phone += count;
    else if (type === "email") out.email += count;
    else if (type === "form") out.form += count;
  }
  return out;
}

/** En çok görüntülenen sayfalar (query-string temizlenir). */
export async function getTopPages(r: DateRange, limit = 10): Promise<TopPage[]> {
  const rows = await runReport({
    dateRanges: range(r),
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: limit * 3,
  });

  // Query-string noise'u temizle ve aynı path'leri birleştir.
  const merged = new Map<string, number>();
  for (const row of rows) {
    const raw = row.dimensionValues?.[0]?.value || "/";
    const path = raw.split("?")[0].split("#")[0] || "/";
    merged.set(path, (merged.get(path) || 0) + num(row.metricValues?.[0]?.value));
  }

  return [...merged.entries()]
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

/** Trafik kaynakları (channel grouping). */
export async function getTrafficSources(r: DateRange): Promise<TrafficSource[]> {
  const rows = await runReport({
    dateRanges: range(r),
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    limit: 20,
  });

  return rows.map((row) => ({
    source: row.dimensionValues?.[0]?.value || "Other",
    users: num(row.metricValues?.[0]?.value),
  }));
}

/**
 * Organik ARAMA (Google SEO) kullanıcıları — traffic source kırılımından.
 * Sadece "Organic Search" kanalı; "Organic Social/Video/Shopping" HARİÇ
 * (yoksa Instagram/Facebook trafiği yanlışlıkla Google SEO'ya atfedilir).
 */
export function organicUsersFrom(sources: TrafficSource[]): number {
  const organic = sources.find(
    (s) => s.source.trim().toLowerCase() === "organic search"
  );
  return organic?.users ?? 0;
}
