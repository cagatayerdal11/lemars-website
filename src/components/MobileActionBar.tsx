import Link from "next/link";

/**
 * Mobilde sabit alt aksiyon çubuğu — Ara / WhatsApp / Teklif Al.
 * İletişim (B2B ana hedef) aksiyonlarını her an bir dokunuş uzakta tutar.
 * tel: ve wa.me linkleri AnalyticsClickTracker tarafından otomatik ölçülür.
 * Yalnızca mobil (lg:hidden); masaüstünde floating WhatsApp butonu görünür.
 */
export default function MobileActionBar({ locale }: { locale: string }) {
  const en = locale === "en";

  return (
    <>
      {/* İçeriğin altında sabit bar kadar boşluk bırak */}
      <div className="h-16 lg:hidden" aria-hidden="true" />

      <nav
        className="fixed bottom-0 inset-x-0 z-50 lg:hidden grid grid-cols-3 bg-white border-t border-gray-200 shadow-[0_-6px_20px_-10px_rgba(0,0,0,0.25)]"
        aria-label={en ? "Quick contact" : "Hızlı iletişim"}
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
          href="https://wa.me/905553643434"
          target="_blank"
          rel="noopener noreferrer"
          data-cta="mobile_bar"
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-green-600 border-x border-gray-100 active:bg-gray-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        <Link
          href={`/${locale}/iletisim`}
          className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] bg-primary-700 text-white active:bg-primary-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 10h.01M12 10h.01M16 10h.01M21 12a8 8 0 01-8 8 8.5 8.5 0 01-3.6-.8L3 21l1.8-6.4A8 8 0 1121 12z" />
          </svg>
          <span className="text-[11px] font-semibold">{en ? "Get Quote" : "Teklif Al"}</span>
        </Link>
      </nav>
    </>
  );
}
