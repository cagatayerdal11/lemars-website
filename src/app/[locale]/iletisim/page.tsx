"use client";

import { useState, useEffect } from "react";
import { getDictionary, Locale } from "@/i18n/config";
import MarsLoader from "@/components/MarsLoader";
import { trackContactAction } from "@/lib/analytics/gtag";

export default function Iletisim({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const [t, setT] = useState<Record<string, unknown> | null>(null);

  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", subject: "", message: "", acknowledge: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDictionary(locale as Locale).then((dict) => {
      setT(dict.contact as Record<string, unknown>);
    });
  }, [locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Ana ticari metrik: YALNIZCA başarılı form gönderiminde (PII gönderilmez).
      if (res.ok) {
        trackContactAction({
          action_type: "form",
          cta_location: "contact_form",
          page_path: `/${locale}/iletisim`,
          locale,
        });
      }
    } catch {
      // Ağ hatası — event gönderilmez
    }
    setLoading(false);
    setSubmitted(true);
  };

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <MarsLoader size={56} text={locale === "tr" ? "Yükleniyor..." : "Loading..."} />
      </div>
    );
  }

  const subjectOptions = t.formSubjectOptions as string[];

  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32 hero-glow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.heroEyebrow as string}</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl break-words">{t.heroTitle as string}</h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            {t.heroDesc as string}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.infoTitle as string}</h2>

              <a href="tel:+902128091883" className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 text-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t.phoneLabel as string}</h3>
                  <p className="text-primary-700 font-medium text-sm">{t.phoneNumber as string}</p>
                  <p className="text-gray-400 text-xs mt-1">{t.phoneHours as string}</p>
                </div>
              </a>

              <a href="mailto:info@lemarsgida.com" className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 text-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t.emailLabel as string}</h3>
                  <p className="text-primary-700 font-medium text-sm">{t.emailAddress as string}</p>
                  <p className="text-gray-400 text-xs mt-1">{t.emailNote as string}</p>
                </div>
              </a>

              <a href="https://maps.app.goo.gl/7XnNs1arH4NeqCcp6" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 text-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t.addressLabel as string}</h3>
                  <p className="text-gray-600 text-sm">{t.addressLine1 as string}</p>
                  <p className="text-gray-600 text-sm">{t.addressLine2 as string}</p>
                  <p className="text-primary-700 text-xs mt-1 font-medium">{t.addressDirection as string} &rarr;</p>
                </div>
              </a>

            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t.successTitle as string}</h3>
                    <p className="text-gray-500 text-sm mb-6">{t.successDesc as string}</p>

                    <div>
                      <button onClick={() => { setSubmitted(false); setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "", acknowledge: false }); }} className="text-primary-700 text-sm font-semibold hover:underline">
                        {t.successNew as string}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{t.formTitle as string}</h2>
                    <p className="text-gray-500 text-sm mb-4">{t.formDesc as string}</p>
                    {/*
                      Mevzuat notu — Satış ve Sunum Yönetmeliği m.11/1 (tüketicilere bilgi
                      toplumu hizmetleri ile satış sistemi kurulamaz), m.11/2 (belgeli
                      satıcılara satışta fiziki işyeri ve Kuruma bildirilmiş ortam şartı),
                      m.21/2 (fiyat duyurusu yasağı). Form yalnızca kurumsal iletişimdir.
                    */}
                    <p className="text-xs text-gray-500 leading-relaxed bg-white border border-gray-200 rounded-lg p-4 mb-8">
                      {t.formNotice as string}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{t.formName as string}</label>
                          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{t.formCompany as string}</label>
                          <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{t.formEmail as string}</label>
                          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{t.formPhone as string}</label>
                          <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{t.formSubject as string}</label>
                        <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          {subjectOptions.map((opt, i) => (
                            <option key={i} value={i === 0 ? "" : opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{t.formMessage as string}</label>
                        <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none" />
                      </div>
                      <p className="text-xs text-gray-500">
                        {t.formKvkk as string}
                      </p>
                      <label className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={formData.acknowledge}
                          onChange={(e) => setFormData({ ...formData, acknowledge: e.target.checked })}
                          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary-700"
                        />
                        <span>
                          {locale === "en"
                            ? "I understand that this form is not intended for consumer alcoholic beverage orders, online sales or product promotion."
                            : "Bu formun tüketiciye yönelik alkollü içki siparişi, çevrim içi satış veya ürün tanıtımı amacı taşımadığını anlıyorum."}
                        </span>
                      </label>
                      <button type="submit" disabled={loading || !formData.acknowledge}
                        className="w-full py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-all text-sm uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <MarsLoader size={24} />
                            {t.formSubmitting as string}
                          </>
                        ) : (t.formSubmit as string)}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6!2d28.6836383!3d41.0011672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa180546a3103%3A0x4209c1f34f774f1!2sLEMARS%20GIDA%20%C4%B0%C3%87ECEK!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="LEMARS" />
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{t.mapTitle as string}</h3>
                <p className="text-gray-500 text-sm">{t.mapAddress as string}</p>
              </div>
              <a href="https://maps.app.goo.gl/7XnNs1arH4NeqCcp6" target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t.mapDirection as string}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
