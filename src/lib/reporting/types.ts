/**
 * LEMARS — Birleşik dijital performans rapor modeli.
 * Dashboard ve aylık email AYNI bu tipi kullanır.
 */

export type PeriodKey = "last30" | "thisMonth" | "lastMonth" | "last90";

/** Bir veri kaynağının (GA4 / Search Console) durumu — hata mesajı secret içermez. */
export interface DataSourceStatus {
  configured: boolean;
  ok: boolean;
  error?: string;
}

export interface TopPage {
  path: string;
  views: number;
}

export interface TopQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number;
}

export interface TrafficSource {
  source: string; // "Organic Search", "Direct", ...
  users: number;
}

export interface ContactBreakdown {
  users: number; // contact_action yapan unique kullanıcı
  actions: number; // ham contact_action sayısı
  rate: number; // users / activeUsers (0..1)
  whatsapp: number;
  phone: number;
  email: number;
  form: number;
}

export interface ReportComparison {
  usersPercent: number | null;
  organicUsersPercent: number | null;
  googleClicksPercent: number | null;
  googleImpressionsPercent: number | null;
  contactUsersPercent: number | null;
  contactRatePercent: number | null;
}

export interface LemarsDigitalReport {
  period: {
    key: PeriodKey;
    label: string;
    start: string;
    end: string;
    comparisonStart: string;
    comparisonEnd: string;
  };

  users: number;
  sessions: number;
  pageViews: number;
  organicUsers: number;

  google: {
    impressions: number;
    clicks: number;
    ctr: number; // 0..1
    averagePosition: number;
  };

  contact: ContactBreakdown;

  topPages: TopPage[];
  topQueries: TopQuery[];
  trafficSources: TrafficSource[];

  comparison: ReportComparison;

  insights: string[];

  sources: {
    ga4: DataSourceStatus;
    searchConsole: DataSourceStatus;
  };

  /** En az bir kaynaktan anlamlı veri geldiyse true. */
  hasData: boolean;
  generatedAt: string; // ISO
}
