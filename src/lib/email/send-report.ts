/**
 * LEMARS — Aylık raporu Resend ile gönderir (server-only).
 * Cron ve admin "Test E-mail" özelliği aynı fonksiyonu kullanır.
 */

import { Resend } from "resend";
import { buildReport } from "@/lib/reporting/report";
import { monthlyReportPeriod } from "@/lib/reporting/periods";
import { renderReportEmailHtml, reportEmailSubject } from "./report-email";
import { SITE_URL } from "@/lib/seo";

export interface SendReportResult {
  ok: boolean;
  sent: number;
  monthName?: string;
  error?: string;
}

function recipients(): string[] {
  return (process.env.REPORT_EMAIL_TO || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function dashboardUrl(): string {
  const base =
    process.env.ADMIN_DASHBOARD_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    SITE_URL;
  return base.replace(/\/+$/, "") + "/admin/rapor";
}

export async function sendMonthlyReport(
  opts: { isTest?: boolean } = {}
): Promise<SendReportResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REPORT_EMAIL_FROM;
  const to = recipients();

  if (!apiKey) return { ok: false, sent: 0, error: "RESEND_API_KEY tanımlı değil." };
  if (!from) return { ok: false, sent: 0, error: "REPORT_EMAIL_FROM tanımlı değil." };
  if (to.length === 0)
    return { ok: false, sent: 0, error: "REPORT_EMAIL_TO tanımlı değil." };

  const period = monthlyReportPeriod();
  const report = await buildReport("lastMonth", { fresh: true });
  const html = renderReportEmailHtml(report, period.monthName, dashboardUrl());
  const subject = reportEmailSubject(period.monthName, opts.isTest);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, subject, html });

  if (error) {
    return {
      ok: false,
      sent: 0,
      monthName: period.monthName,
      error: (error as { message?: string }).message || "E-posta gönderilemedi.",
    };
  }
  return { ok: true, sent: to.length, monthName: period.monthName };
}
