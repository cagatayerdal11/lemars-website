import Link from "next/link";

export const metadata = {
  title: "Hakkimizda | LeMars Gida Icecek",
  description:
    "LeMars Gida Icecek hakkinda bilgi. Istanbul Avrupa Yakasi'nda alkolu icecek toptan satis ve dagitim.",
};

export default function Hakkimizda() {
  return (
    <>
      {/* Baslik */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary-300 font-semibold text-sm uppercase tracking-wider">
            Hakkimizda
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            LeMars Gida Icecek
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Istanbul Avrupa Yakasi&apos;nda alkolu icecekler alaninda toptan
            satis ve dagitim hizmeti sunan guvenilir cozum ortaginiz.
          </p>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Hikayemiz
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-6">
                Kalite ve Guvenin Adresi
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  LeMars Gida Icecek, Istanbul Avrupa Yakasi&apos;nda alkolu
                  icecekler sektorunde faaliyet gosteren, TAPDK lisansli bir
                  toptan satis ve dagitim firmasidir.
                </p>
                <p>
                  Kuruldugu gunden bu yana musteri memnuniyetini on planda
                  tutarak, restoran, bar, otel ve perakende satis noktalarina
                  kesintisiz tedarik hizmeti sunmaktadir.
                </p>
                <p>
                  Genis urun yelpazemiz, deneyimli kadromuz ve gucluu lojistik
                  altyapimiz ile sektorde guvenilir bir cozum ortagi olarak
                  konumlanmaktayiz.
                </p>
              </div>
            </div>

            {/* Degerler */}
            <div className="bg-gray-50 rounded-2xl p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-8">
                Degerlerimiz
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Guvenilirlik",
                    desc: "Zamaninda teslimat ve tutarli hizmet kalitesi ile is ortaklarimizin guvenini kazaniyoruz.",
                  },
                  {
                    title: "Yasalllik",
                    desc: "TAPDK ve tum ilgili mevzuata tam uyumlu faaliyet gosteriyoruz.",
                  },
                  {
                    title: "Kalite",
                    desc: "Urun tedarik zincirinde kalite kontrolu en ust duzeyde tutarak musterilerimize en iyisini sunuyoruz.",
                  },
                  {
                    title: "Musteri Odaklilik",
                    desc: "Her isletmenin benzersiz ihtiyaclarini anlayarak kisiye ozel cozumler uretiyoruz.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Neden Biz?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              LeMars&apos;i Tercih Etmeniz Icin Nedenler
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Hizli Teslimat",
                desc: "Ayni gun teslimat ile isletmenizin hic stoksuz kalmamasini sagliyoruz.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "TAPDK Uyumlu",
                desc: "Tum faaliyetlerimiz TAPDK lisansi ve ilgili mevzuata uygun sekilde yurutulmektedir.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Musteri Memnuniyeti",
                desc: "Musterilerimizin %99'u hizmetimizden memnun. Uzun vadeli is birlikleri kuruyoruz.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: "Genis Urun Yelpazesi",
                desc: "1000'den fazla urun cesidi ile her isletmenin ihtiyacini karsiliyoruz.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "7/24 Destek",
                desc: "Profesyonel musteri hizmetleri ekibimiz her zaman yaninizdadir.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Genis Kapsama",
                desc: "Istanbul Avrupa Yakasi'nin tum ilcelerine ulasan guclu dagitim agimiz.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Is Birligine Hazir Misiniz?
          </h2>
          <p className="text-primary-100 mb-8">
            Isletmeniz icin en uygun tedarik cozumunu birlikte belirleyelim.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
          >
            Iletisime Gecin
          </Link>
        </div>
      </section>
    </>
  );
}
