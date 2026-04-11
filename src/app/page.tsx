import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Istanbul Avrupa Yakasi Toptan Dagitim
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Guvenilir{" "}
              <span className="text-primary-300">Alkolu Icecek</span>{" "}
              Tedarik Cozumleri
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              Restoran, bar ve perakende satis noktalarina hizli, guvenilir ve
              kaliteli toptan satis hizmeti sunuyoruz. Genis urun yelpazemizle
              isletmenizin ihtiyaclarini karsiliyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/30"
              >
                Bizimle Iletisime Gecin
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/hizmetlerimiz"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Hizmetlerimizi Kesfet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ozellikler */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Hizli Teslimat",
                desc: "Istanbul Avrupa Yakasi genelinde ayni gun teslimat imkani. Siparisinizi hizla isletmenize ulastiriyoruz.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Lisansli Dagitim",
                desc: "TAPDK lisansli, tum yasal mevzuata uygun toptan satis ve dagitim hizmeti sunuyoruz.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Profesyonel Hizmet",
                desc: "Deneyimli ekibimizle isletmenize ozel cozumler sunuyor, her asamada destek sagliyoruz.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-primary-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-200 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkimizda Ozet */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Hakkimizda
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
                Istanbul&apos;un Guvenilir Dagitim Ortagi
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                LeMars Gida Icecek olarak, Istanbul Avrupa Yakasi&apos;nda
                alkolu icecekler alaninda toptan satis ve dagitim hizmeti
                sunmaktayiz. Kaliteli urun yelpazemiz ve guvenilir lojistik
                agimiz ile isletmelerin ihtiyaclarini karsiliyoruz.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "TAPDK lisansli yasal faaliyet",
                  "Genis urun yelpazesi",
                  "Ayni gun teslimat imkani",
                  "Profesyonel musteri hizmeti",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/hakkimizda"
                className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 transition-colors"
              >
                Daha Fazla Bilgi
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "500+", label: "Aktif Musteri" },
                { number: "10+", label: "Yillik Deneyim" },
                { number: "1000+", label: "Urun Cesidi" },
                { number: "%99", label: "Musteri Memnuniyeti" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                  <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hizmetler Ozet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Hizmetlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">Isletmeniz Icin Cozumler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Her olcekteki isletmeye ozel, guvenilir ve hizli tedarik cozumleri sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Restoran & Bar Tedarikcisi",
                desc: "Restoran, bar, meyhane ve eglence mekanlarinin alkolu icecek ihtiyaclarini duzenli ve zamaninda karsiliyoruz.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                ),
                title: "Perakende Satis Noktalari",
                desc: "Market, tekel bayi ve perakende satis noktalarinin stok yonetimi ve duzenli tedarik cozumleri.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                ),
                title: "Lojistik & Dagitim",
                desc: "Istanbul Avrupa Yakasi genelinde kendi filo ve lojistik agimizla hizli ve guvenli dagitim.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-8 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/hizmetlerimiz" className="btn-primary">
              Tum Hizmetlerimizi Gorun
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Isletmeniz Icin Dogru Tedarik Ortagi
          </h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Alkolu icecek ihtiyaclariniz icin bizimle iletisime gecin. Isletmenize ozel cozumler sunalim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Iletisime Gecin
            </Link>
            <a
              href="tel:+902121234567"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +90 (212) 123 45 67
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
