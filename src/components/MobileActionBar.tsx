import Link from "next/link";

/**
 * Mobilde sabit alt aksiyon çubuğu — Ara / E-posta / İletişim.
 *
 * MEVZUAT NOTU: Kamuya açık sayfada WhatsApp kısayolu ve "Teklif Al" gibi
 * fiyat/satış çağrıları kaldırılmıştır (4250 s.K. m.6/1 tüketiciye yönelik
 * tanıtım ve satışa teşvik yasağı; Satış ve Sunum Yönetmeliği m.11 ve m.21).
 * Yalnızca nötr kurumsal iletişim aksiyonları bırakılmıştır: telefon, e-posta
 * ve iletişim sayfası. Yalnızca mobilde görünür (lg:hidden).
 */
export default function MobileActionBar({ locale }: { locale: string }) {
  const en = locale === "en";

  return (
    <>
      {/* İçeriğin altında sabit bar kadar boşluk bırak */}
      <div className="h-16 lg:hidden" aria-hidden="true" />

      <nav
        className="fixed bottom-0 inset-x-0 z-50 lg:hidden grid grid-cols-3 bg-white border-t border-gray-200 shadow-[0_-6px_20px_-10px_rgba(0,0,0,0.25)]"
        aria-label={en ? "Corporate contact" : "Kurumsal iletişim"}
      >
        <a
          href="tel:+902128091883"
          data-cta="mobile_bar"
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-gray-700 active:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[11px] font-semibold">{en ? "Call" : "Ara"}</span>
        </a>

        <a
          href="mailto:info@lemarsgida.com"
          data-cta="mobile_bar"
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-gray-700 border-x border-gray-100 active:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px] font-semibold">{en ? "E-mail" : "E-posta"}</span>
        </a>

        <Link
          href={`/${locale}/iletisim`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] bg-primary-700 text-white active:bg-primary-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 10h.01M12 10h.01M16 10h.01M21 12a8 8 0 01-8 8 8.5 8.5 0 01-3.6-.8L3 21l1.8-6.4A8 8 0 1121 12z" />
          </svg>
          <span className="text-[11px] font-semibold">{en ? "Contact" : "İletişim"}</span>
        </Link>
      </nav>
    </>
  );
}
