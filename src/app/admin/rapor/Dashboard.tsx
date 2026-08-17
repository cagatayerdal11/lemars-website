"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { LemarsDigitalReport, PeriodKey } from "@/lib/reporting/types";
import {
  formatNumber,
  formatDecimal,
  formatPercent,
  formatDelta,
} from "@/lib/format";

const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: "last30", label: "Son 30 Gün" },
  { key: "thisMonth", label: "Bu Ay" },
  { key: "lastMonth", label: "Geçen Ay" },
  { key: "last90", label: "Son 90 Gün" },
];

function Delta({ percent }: { percent: number | null }) {
  const d = formatDelta(percent);
  const color =
    d.direction === "up"
      ? "text-green-600"
      : d.direction === "down"
      ? "text-red-600"
      : "text-gray-400";
  return <span className={`text-xs font-semibold ${color}`}>{d.text}</span>;
}

function KpiCard({
  label,
  value,
  percent,
  subtitle,
}: {
  label: string;
  value: string;
  percent?: number | null;
  subtitle?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <div className="text-3xl font-bold text-gray-900 leading-none">{value}</div>
        {percent !== undefined && <Delta percent={percent} />}
      </div>
      {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </div>
      <div className="text-lg font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [period, setPeriod] = useState<PeriodKey>("last30");
  const [report, setReport] = useState<LemarsDigitalReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  const load = useCallback(async (key: PeriodKey, fresh = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/report?period=${key}${fresh ? "&fresh=1" : ""}`,
        { cache: "no-store" }
      );
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(d.error || "Rapor alınamadı.");
      }
      setReport((await res.json()) as LemarsDigitalReport);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load(period);
  }, [period, load]);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  const onRefresh = async () => {
    setBusy(true);
    await load(period, true);
    setBusy(false);
    flash("Veriler güncellendi.");
  };

  const onTestEmail = async () => {
    if (
      !window.confirm(
        "Test raporu e-postası REPORT_EMAIL_TO adres(ler)ine gönderilecek. Devam edilsin mi?"
      )
    )
      return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/test-email", { method: "POST" });
      const d = (await res.json().catch(() => ({}))) as {
        error?: string;
        sent?: number;
      };
      flash(res.ok ? `Test e-postası gönderildi (${d.sent ?? 0} alıcı).` : d.error || "Gönderilemedi.");
    } catch {
      flash("E-posta gönderilemedi.");
    } finally {
      setBusy(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-900">
            LEMARS
          </h1>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-700">
            Digital Performance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 no-print">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                period === p.key
                  ? "bg-primary-700 text-white border-primary-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary-400"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 mb-6 no-print">
        <button
          onClick={onRefresh}
          disabled={busy || loading}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          Verileri Yenile
        </button>
        <button
          onClick={onTestEmail}
          disabled={busy}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-gray-700 border border-gray-200 hover:border-primary-400 disabled:opacity-50"
        >
          Test E-mail Gönder
        </button>
        <button
          onClick={() => window.print()}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-gray-700 border border-gray-200 hover:border-primary-400"
        >
          Yazdır / PDF
        </button>
        <button
          onClick={onLogout}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-gray-500 border border-gray-200 hover:text-red-600 ml-auto"
        >
          Çıkış
        </button>
      </div>

      {toast && (
        <div className="mb-4 text-sm bg-primary-50 text-primary-800 border border-primary-200 rounded-lg px-4 py-2 no-print">
          {toast}
        </div>
      )}

      {loading && (
        <div className="py-24 text-center text-gray-400 text-sm">Yükleniyor…</div>
      )}

      {!loading && error && (
        <div className="py-16 text-center">
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button
            onClick={() => load(period, true)}
            className="text-primary-700 text-sm font-semibold hover:underline"
          >
            Tekrar dene
          </button>
        </div>
      )}

      {!loading && !error && report && (
        <ReportView report={report} />
      )}
    </div>
  );
}

function SourceNotice({ report }: { report: LemarsDigitalReport }) {
  const notices: string[] = [];
  const { ga4, searchConsole } = report.sources;
  if (!ga4.configured)
    notices.push("Google Analytics (GA4) henüz yapılandırılmadı.");
  else if (!ga4.ok) notices.push("GA4 verisi alınamadı.");
  if (!searchConsole.configured)
    notices.push("Google Search Console henüz yapılandırılmadı.");
  else if (!searchConsole.ok) notices.push("Search Console verisi alınamadı.");

  if (notices.length === 0) return null;
  return (
    <div className="mb-6 text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3">
      {notices.map((n, i) => (
        <div key={i}>• {n}</div>
      ))}
      <div className="mt-1 text-amber-600">
        Kurulum tamamlanınca ilgili metrikler otomatik görünecektir.
      </div>
    </div>
  );
}

function ReportView({ report }: { report: LemarsDigitalReport }) {
  const c = report.comparison;
  const maxSource = Math.max(1, ...report.trafficSources.map((s) => s.users));

  const notConfigured =
    !report.sources.ga4.configured && !report.sources.searchConsole.configured;

  return (
    <>
      <SourceNotice report={report} />

      {notConfigured ? (
        <div className="py-16 text-center text-gray-500">
          <p className="text-sm">
            Henüz yeterli veri bulunmuyor. Veri kaynakları (GA4 ve Search Console)
            yapılandırıldıktan sonra metrikler burada görüntülenecektir.
          </p>
        </div>
      ) : (
        <>
          {/* Ana KPI'lar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <KpiCard
              label="Ziyaretçi"
              value={formatNumber(report.users)}
              percent={c.usersPercent}
              subtitle="Active Users (GA4)"
            />
            <KpiCard
              label="Google Tıklama"
              value={formatNumber(report.google.clicks)}
              percent={c.googleClicksPercent}
              subtitle="Search Console"
            />
            <KpiCard
              label="İletişim Kuran"
              value={formatNumber(report.contact.users)}
              percent={c.contactUsersPercent}
              subtitle="Unique users"
            />
            <KpiCard
              label="İletişim Oranı"
              value={formatPercent(report.contact.rate)}
              percent={c.contactRatePercent}
              subtitle="Contact / Visitors"
            />
          </div>

          {/* İkincil metrikler */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            <StatChip label="Google Gösterim" value={formatNumber(report.google.impressions)} />
            <StatChip label="Organik Kullanıcı" value={formatNumber(report.organicUsers)} />
            <StatChip label="Oturum" value={formatNumber(report.sessions)} />
            <StatChip label="Sayfa Görüntüleme" value={formatNumber(report.pageViews)} />
            <StatChip label="Ort. Pozisyon" value={formatDecimal(report.google.averagePosition)} />
            <StatChip label="Google CTR" value={formatPercent(report.google.ctr)} />
          </div>

          {/* İçgörüler */}
          {report.insights.length > 0 && (
            <div className="mb-8 space-y-2">
              {report.insights.map((ins, i) => (
                <div
                  key={i}
                  className="bg-white border-l-4 border-primary-600 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700"
                >
                  {ins}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Trafik kaynakları */}
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                Trafik Kaynakları
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                {report.trafficSources.length === 0 && (
                  <p className="text-sm text-gray-400">Veri yok.</p>
                )}
                {report.trafficSources.slice(0, 6).map((s) => (
                  <div key={s.source}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{s.source}</span>
                      <span className="font-semibold">{formatNumber(s.users)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${(s.users / maxSource) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* İletişim kırılımı */}
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                İletişim Aksiyonları
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-3">
                  <StatChip label="WhatsApp" value={formatNumber(report.contact.whatsapp)} />
                  <StatChip label="Telefon" value={formatNumber(report.contact.phone)} />
                  <StatChip label="E-posta" value={formatNumber(report.contact.email)} />
                  <StatChip label="Form" value={formatNumber(report.contact.form)} />
                </div>
                <div className="text-xs text-gray-400 mt-3">
                  Toplam ham aksiyon: {formatNumber(report.contact.actions)} · Unique
                  kullanıcı: {formatNumber(report.contact.users)}
                </div>
              </div>
            </section>
          </div>

          {/* Top Pages */}
          <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
              En Çok Görüntülenen Sayfalar
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    <th className="px-4 py-2 font-semibold">Sayfa</th>
                    <th className="px-4 py-2 font-semibold text-right">Görüntüleme</th>
                  </tr>
                </thead>
                <tbody>
                  {report.topPages.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-4 text-gray-400">
                        Veri yok.
                      </td>
                    </tr>
                  )}
                  {report.topPages.map((p) => (
                    <tr key={p.path} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-2.5 text-gray-700 truncate max-w-[420px]">
                        {p.path}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-gray-900">
                        {formatNumber(p.views)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Queries */}
          <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
              En Çok Tıklanan Google Aramaları
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    <th className="px-4 py-2 font-semibold">Arama</th>
                    <th className="px-4 py-2 font-semibold text-right">Tıklama</th>
                    <th className="px-4 py-2 font-semibold text-right">Gösterim</th>
                    <th className="px-4 py-2 font-semibold text-right">CTR</th>
                    <th className="px-4 py-2 font-semibold text-right">Pozisyon</th>
                  </tr>
                </thead>
                <tbody>
                  {report.topQueries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-4 text-gray-400">
                        Veri yok.
                      </td>
                    </tr>
                  )}
                  {report.topQueries.map((q) => (
                    <tr key={q.query} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-2.5 text-gray-700">{q.query}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-gray-900">
                        {formatNumber(q.clicks)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-600">
                        {formatNumber(q.impressions)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-600">
                        {formatPercent(q.ctr)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-600">
                        {formatDecimal(q.position)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Footer / dönem bilgisi */}
      <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-4 leading-relaxed">
        <div className="font-semibold text-gray-500">{report.period.label}</div>
        <div>
          Dönem: {report.period.start} – {report.period.end} · Karşılaştırma:{" "}
          {report.period.comparisonStart} – {report.period.comparisonEnd}
        </div>
        <div className="mt-1">
          <span className="font-semibold">GA4</span> = siteye gelen kullanıcı ne
          yaptı? · <span className="font-semibold">Search Console</span> = Google'da
          bizi kaç kişi gördü? Bu iki veri seti farklıdır.
        </div>
      </div>
    </>
  );
}
