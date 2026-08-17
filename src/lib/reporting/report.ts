/**
 * LEMARS — Birleşik rapor servisi (server-only).
 *
 * Dashboard ve aylık email AYNI bu servisi kullanır. GA4 + Search Console
 * verisini birleştirip tek `LemarsDigitalReport` döner. Bir kaynak hata verirse
 * diğerini bozmaz (graceful degradation). Sonuç 1 saat memory-cache'lenir.
 */

import type {
  LemarsDigitalReport,
  PeriodKey,
  DataSourceStatus,
  TopPage,
  TopQuery,
  TrafficSource,
} from "./types";
import { resolvePeriod } from "./periods";
import { hasGoogleCredentials } from "./google-auth";
import {
  getCoreMetrics,
  getContactUsers,
  getContactBreakdown,
  getTopPages,
  getTrafficSources,
  organicUsersFrom,
  hasGa4Config,
  type DateRange,
} from "./ga4";
import {
  getSearchOverview,
  getTopQueries,
  hasSearchConsoleConfig,
} from "./search-console";
import { buildInsights } from "./insights";
import { percentChange } from "@/lib/format";

const TTL_MS = 60 * 60 * 1000; // 1 saat
const cache = new Map<PeriodKey, { expires: number; data: LemarsDigitalReport }>();

function sanitizeError(reason: unknown): string {
  const msg =
    reason instanceof Error ? reason.message : String(reason ?? "Bilinmeyen hata");
  return msg.slice(0, 180);
}

function pick<T>(res: PromiseSettledResult<T>, fallback: T): T {
  return res.status === "fulfilled" ? res.value : fallback;
}

function firstError(results: PromiseSettledResult<unknown>[]): string | undefined {
  const rejected = results.find((r) => r.status === "rejected") as
    | PromiseRejectedResult
    | undefined;
  return rejected ? sanitizeError(rejected.reason) : undefined;
}

export async function buildReport(
  key: PeriodKey,
  opts: { fresh?: boolean } = {}
): Promise<LemarsDigitalReport> {
  if (!opts.fresh) {
    const cached = cache.get(key);
    if (cached && cached.expires > Date.now()) return cached.data;
  }
  const data = await computeReport(key);
  cache.set(key, { expires: Date.now() + TTL_MS, data });
  return data;
}

async function computeReport(key: PeriodKey): Promise<LemarsDigitalReport> {
  const period = resolvePeriod(key);
  const cur: DateRange = { start: period.start, end: period.end };
  const cmp: DateRange = {
    start: period.comparisonStart,
    end: period.comparisonEnd,
  };

  const credsOk = hasGoogleCredentials();
  const ga4Configured = credsOk && hasGa4Config();
  const scConfigured = credsOk && hasSearchConsoleConfig();

  const ga4Status: DataSourceStatus = { configured: ga4Configured, ok: false };
  const scStatus: DataSourceStatus = { configured: scConfigured, ok: false };

  // ---- GA4 ----
  let users = 0,
    sessions = 0,
    pageViews = 0,
    organicUsers = 0,
    contactUsers = 0,
    prevUsers = 0,
    prevContactUsers = 0,
    prevOrganic = 0;
  let breakdown = { actions: 0, whatsapp: 0, phone: 0, email: 0, form: 0 };
  let topPages: TopPage[] = [];
  let trafficSources: TrafficSource[] = [];

  if (ga4Configured) {
    const r = await Promise.allSettled([
      getCoreMetrics(cur), // 0
      getContactUsers(cur), // 1
      getContactBreakdown(cur), // 2
      getTopPages(cur), // 3
      getTrafficSources(cur), // 4
      getCoreMetrics(cmp), // 5
      getContactUsers(cmp), // 6
      getTrafficSources(cmp), // 7
    ]);

    const core = pick(r[0], { users: 0, sessions: 0, pageViews: 0 });
    users = core.users;
    sessions = core.sessions;
    pageViews = core.pageViews;
    contactUsers = pick(r[1], 0);
    breakdown = pick(r[2], breakdown);
    topPages = pick(r[3], []);
    trafficSources = pick(r[4], []);
    organicUsers = organicUsersFrom(trafficSources);

    const prevCore = pick(r[5], { users: 0, sessions: 0, pageViews: 0 });
    prevUsers = prevCore.users;
    prevContactUsers = pick(r[6], 0);
    prevOrganic = organicUsersFrom(pick(r[7], []));

    // Ana metriklerin (core current) gelmesi başarı sayılır.
    ga4Status.ok = r[0].status === "fulfilled";
    ga4Status.error = firstError(r);
  }

  // ---- Search Console ----
  let google = { impressions: 0, clicks: 0, ctr: 0, averagePosition: 0 };
  let topQueries: TopQuery[] = [];
  let prevClicks = 0,
    prevImpressions = 0;

  if (scConfigured) {
    const r = await Promise.allSettled([
      getSearchOverview(cur), // 0
      getTopQueries(cur), // 1
      getSearchOverview(cmp), // 2
    ]);

    google = pick(r[0], google);
    topQueries = pick(r[1], []);
    const prevOverview = pick(r[2], {
      impressions: 0,
      clicks: 0,
      ctr: 0,
      averagePosition: 0,
    });
    prevClicks = prevOverview.clicks;
    prevImpressions = prevOverview.impressions;

    scStatus.ok = r[0].status === "fulfilled";
    scStatus.error = firstError(r);
  }

  // ---- Türetilmiş metrikler ----
  const contactRate = users > 0 ? contactUsers / users : 0;
  const prevContactRate = prevUsers > 0 ? prevContactUsers / prevUsers : 0;

  const comparison = {
    usersPercent: percentChange(users, prevUsers),
    organicUsersPercent: percentChange(organicUsers, prevOrganic),
    googleClicksPercent: percentChange(google.clicks, prevClicks),
    googleImpressionsPercent: percentChange(google.impressions, prevImpressions),
    contactUsersPercent: percentChange(contactUsers, prevContactUsers),
    contactRatePercent: percentChange(contactRate, prevContactRate),
  };

  const insights = buildInsights({
    usersPercent: comparison.usersPercent,
    organicPercent: percentChange(organicUsers, prevOrganic),
    contactUsersPercent: comparison.contactUsersPercent,
    contactRatePercent: comparison.contactRatePercent,
    googleClicksPercent: comparison.googleClicksPercent,
    googleImpressionsPercent: comparison.googleImpressionsPercent,
  });

  return {
    period: {
      key,
      label: period.label,
      start: period.start,
      end: period.end,
      comparisonStart: period.comparisonStart,
      comparisonEnd: period.comparisonEnd,
    },
    users,
    sessions,
    pageViews,
    organicUsers,
    google,
    contact: {
      users: contactUsers,
      actions: breakdown.actions,
      rate: contactRate,
      whatsapp: breakdown.whatsapp,
      phone: breakdown.phone,
      email: breakdown.email,
      form: breakdown.form,
    },
    topPages,
    topQueries,
    trafficSources,
    comparison,
    insights,
    sources: { ga4: ga4Status, searchConsole: scStatus },
    hasData: ga4Status.ok || scStatus.ok,
    generatedAt: new Date().toISOString(),
  };
}
