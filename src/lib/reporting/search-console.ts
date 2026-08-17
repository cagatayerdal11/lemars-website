/**
 * LEMARS — Google Search Console API (REST, server-only).
 *
 * "Google'da bizi kaç kişi gördü?" sorusunu yanıtlar. GA4 ile aynı metrik
 * gibi birleştirilmez — ayrı bir veri setidir.
 */

import { getAccessToken, SEARCH_CONSOLE_SCOPE } from "./google-auth";
import type { DateRange } from "./ga4";
import type { TopQuery } from "./types";

const ENDPOINT = "https://searchconsole.googleapis.com/webmasters/v3";

export function getSiteUrl(): string {
  return (process.env.SEARCH_CONSOLE_SITE_URL || "").trim();
}

export function hasSearchConsoleConfig(): boolean {
  return getSiteUrl().length > 0;
}

interface ScRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

interface QueryBody {
  startDate: string;
  endDate: string;
  dimensions?: string[];
  rowLimit?: number;
  startRow?: number;
}

async function query(body: QueryBody): Promise<ScRow[]> {
  const siteUrl = getSiteUrl();
  const token = await getAccessToken(SEARCH_CONSOLE_SCOPE);

  const res = await fetch(
    `${ENDPOINT}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const j = (await res.json()) as { error?: { message?: string } };
      detail = j.error?.message?.slice(0, 200) || detail;
    } catch {
      /* ignore */
    }
    throw new Error(`Search Console API ${res.status}: ${detail}`);
  }

  const json = (await res.json()) as { rows?: ScRow[] };
  return json.rows ?? [];
}

/** Toplam clicks / impressions / CTR / ortalama pozisyon. */
export async function getSearchOverview(r: DateRange): Promise<{
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
}> {
  const rows = await query({
    startDate: r.start,
    endDate: r.end,
    dimensions: [],
    rowLimit: 1,
  });
  const row = rows[0];
  return {
    clicks: row?.clicks ?? 0,
    impressions: row?.impressions ?? 0,
    ctr: row?.ctr ?? 0,
    averagePosition: row?.position ?? 0,
  };
}

/** En çok tıklanan Google aramaları (sadece admin panel — public'e çıkmaz). */
export async function getTopQueries(
  r: DateRange,
  limit = 10
): Promise<TopQuery[]> {
  const rows = await query({
    startDate: r.start,
    endDate: r.end,
    dimensions: ["query"],
    rowLimit: limit,
  });
  return rows.map((row) => ({
    query: row.keys?.[0] || "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}
