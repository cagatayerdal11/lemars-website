import Link from "next/link";

export const metadata = {
  title: "Hizmetlerimiz | LeMars Gida Icecek",
  description:
    "LeMars Gida Icecek toptan alkolu icecek dagitim hizmetleri. Restoran, bar ve perakende noktalarina tedarik.",
};

export default function Hizmetlerimiz() {
  return (
    <>
      {/* Baslik */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-300 font-semibold text-sm uppercase tracking-wider">
            Hizmetlerimiz
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Tedarik Cozumlerimiz
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Her olcekteki isletmeye ozel, TAPDK uyumlu, guvenilir ve hizli
            alkolu icecek tedarik hizmetleri sunuyoruz.
          </p>
        </div>
      </section>

      {/* Ana Hizmetler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {/* Hizmet 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  HoReCa Tedarikcisi
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Restoran, Bar & Otel Tedarikcisi
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  HoReCa sektorundeki isletmelerin alkolu icecek ihtiyaclarini
                  eksiksiz ve zamaninda karsiliyoruz. Ozel musteri temsilciniz
                  araciligiyla isletmenize ozel tedarik planlari olusturuyoruz.
                </p>
                <ul className="space-y-3">
                  {[
                    "Restoran ve kafeler icin duzenli tedarik",
                    "Bar ve gece kulupleri icin ozel cozumler",
                    "Otel ve tatil koyleri icin toplu siparis",
                    "Etkinlik ve organizasyonlar icin ozel hizmet",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-primary-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-primary-700 font-semibold text-lg">HoReCa Sektoru</p>
                  <p className="text-primary-600 text-sm mt-1">Profesyonel Cozumler</p>
                </div>
              </div>
            </div>

            {/* Hizmet 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  <p className="text-green-700 font-semibold text-lg">Perakende Sektoru</p>
                  <p className="text-green-600 text-sm mt-1">Stok Yonetim Cozumleri</p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  Perakende Tedarik
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Perakende Satis Noktalari
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Market, tekel bayi ve diger perakende satis noktalarinin stok
                  yonetimini kolaylastiriyor, duzenli ve guvenilir tedarik
                  sagliyoruz.
                </p>
                <ul className="space-y-3">
                  {[
                    "Market ve bakkallar icin duzenli tedarik",
                    "Tekel bayileri icin genis urun yelpazesi",
                    "Stok takip ve yonetim destegi",
                    "Rekabetci toptan fiyat politikasi",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hizmet 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Lojistik
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Lojistik & Dagitim Agi
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Kendi filo ve dagitim agimiz ile Istanbul Avrupa
                  Yakasi&apos;nin tamamina hizli, guvenli ve sorunsuz teslimat
                  hizmeti sunuyoruz.
                </p>
                <ul className="space-y-3">
                  {[
                    "Kendi arac filomuz ile dagitim",
                    "Ayni gun teslimat secenegi",
                    "Soguk zincir lojistik altyapisi",
                    "GPS takipli guvenli teslimat",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-amber-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <p className="text-amber-700 font-semibold text-lg">Dagitim Agi</p>
                  <p className="text-amber-600 text-sm mt-1">Hizli ve Guvenli</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urun Kategorileri */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Urun Kategorileri
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Genis Urun Yelpazemiz
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Yerli ve ithal markalardan olusan genis urun yelpazemiz ile
              isletmenizin tum ihtiyaclarini karsiliyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Bira Cesitleri",
              "Sarap Cesitleri",
              "Raki",
              "Viski",
              "Votka",
              "Cin",
              "Tekila",
              "Likur Cesitleri",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-amber-800 text-xs">
              Not: Bu kategoriler yalnizca bilgilendirme amaciyla listelenmistir.
              Urun tanitimi veya reklam amaci tasimamaktadir. Detayli bilgi icin
              bizimle iletisime gecebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Isletmenize Ozel Cozum Icerir
          </h2>
          <p className="text-primary-100 mb-8">
            Ihtiyaclarinizi dinliyor, size ozel tedarik plani olusturuyoruz.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
          >
            Teklif Alin
          </Link>
        </div>
      </section>
    </>
  );
}
