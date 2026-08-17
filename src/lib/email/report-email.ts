/**
 * LEMARS — Aylık yönetim raporu e-posta şablonu (inline-styled HTML).
 * Yönetici 30–60 saniyede okuyabilmeli. Brand orange + beyaz + koyu gri.
 */

import type { LemarsDigitalReport } from "@/lib/reporting/types";
import { formatNumber, formatPercent, formatDelta } from "@/lib/format";

const ORANGE = "#E8611A";
const DARK = "#1a1a2e";
const GRAY = "#6b7280";
const BORDER = "#eaeaea";

export function reportEmailSubject(monthName: string, isTest = false): string {
  return `${isTest ? "[TEST] " : ""}LEMARS — ${monthName} Dijital Performans Raporu`;
}

function deltaSpan(percent: number | null): string {
  const d = formatDelta(percent);
  if (d.direction === "na") return `<span style="color:${GRAY};font-size:12px;">—</span>`;
  const color = d.direction === "up" ? "#16a34a" : d.direction === "down" ? "#dc2626" : GRAY;
  return `<span style="color:${color};font-size:12px;font-weight:600;">${d.text}</span>`;
}

function kpiRow(label: string, value: string, delta: string): string {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${BORDER};">
        <div style="font-size:12px;color:${GRAY};text-transform:uppercase;letter-spacing:1px;">${label}</div>
        <div style="font-size:26px;font-weight:700;color:${DARK};margin-top:4px;">${value} <span style="font-size:13px;">${delta}</span></div>
      </td>
    </tr>`;
}

export function renderReportEmailHtml(
  report: LemarsDigitalReport,
  monthName: string,
  dashboardUrl: string
): string {
  const c = report.comparison;
  const topPage = report.topPages[0]?.path || "—";
  const topQuery = report.topQueries[0]?.query || "—";
  const note = report.insights[0] || "Bu dönem için öne çıkan bir değişiklik tespit edilmedi.";

  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid ${BORDER};">
        <tr><td style="background:${DARK};padding:28px 32px;">
          <div style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;">LEMARS</div>
          <div style="color:${ORANGE};font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-top:2px;">Dijital Performans — ${monthName}</div>
        </td></tr>

        <tr><td style="padding:24px 32px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${kpiRow("Website Ziyaretçisi", formatNumber(report.users), deltaSpan(c.usersPercent))}
            ${kpiRow("Google Gösterim", formatNumber(report.google.impressions), deltaSpan(c.googleImpressionsPercent))}
            ${kpiRow("Google Tıklama", formatNumber(report.google.clicks), deltaSpan(c.googleClicksPercent))}
            ${kpiRow("İletişim Kuran Kullanıcı", formatNumber(report.contact.users), deltaSpan(c.contactUsersPercent))}
            ${kpiRow("İletişim Oranı", formatPercent(report.contact.rate), deltaSpan(c.contactRatePercent))}
          </table>
        </td></tr>

        <tr><td style="padding:8px 32px 0;">
          <div style="font-size:12px;color:${GRAY};text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">İletişim Aksiyonları</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:${DARK};">
            <tr>
              <td style="padding:6px 0;">WhatsApp</td><td align="right" style="padding:6px 0;font-weight:700;">${formatNumber(report.contact.whatsapp)}</td>
              <td width="24"></td>
              <td style="padding:6px 0;">Telefon</td><td align="right" style="padding:6px 0;font-weight:700;">${formatNumber(report.contact.phone)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;">E-posta</td><td align="right" style="padding:6px 0;font-weight:700;">${formatNumber(report.contact.email)}</td>
              <td width="24"></td>
              <td style="padding:6px 0;">Form</td><td align="right" style="padding:6px 0;font-weight:700;">${formatNumber(report.contact.form)}</td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:20px 32px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:${DARK};">
            <tr><td style="padding:6px 0;color:${GRAY};">En Çok Görüntülenen Sayfa</td><td align="right" style="padding:6px 0;font-weight:600;">${topPage}</td></tr>
            <tr><td style="padding:6px 0;color:${GRAY};">En Çok Tıklanan Arama</td><td align="right" style="padding:6px 0;font-weight:600;">${topQuery}</td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:20px 32px 0;">
          <div style="background:#fff7ed;border-left:3px solid ${ORANGE};padding:14px 16px;border-radius:6px;">
            <div style="font-size:12px;color:${ORANGE};font-weight:700;text-transform:uppercase;letter-spacing:1px;">Yönetim Notu</div>
            <div style="font-size:14px;color:${DARK};margin-top:6px;line-height:1.5;">${note}</div>
          </div>
        </td></tr>

        <tr><td style="padding:24px 32px 32px;" align="center">
          <a href="${dashboardUrl}" style="display:inline-block;background:${ORANGE};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:6px;">Detaylı Raporu Görüntüle</a>
        </td></tr>

        <tr><td style="padding:16px 32px;background:#fafafa;border-top:1px solid ${BORDER};">
          <div style="font-size:11px;color:${GRAY};line-height:1.5;">
            Dönem: ${report.period.start} – ${report.period.end}. Bu rapor LEMARS dijital performans sistemi tarafından otomatik oluşturulmuştur.
            Kaynaklar: Google Analytics 4 ${report.sources.ga4.ok ? "✓" : "(veri yok)"}, Google Search Console ${report.sources.searchConsole.ok ? "✓" : "(veri yok)"}.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
