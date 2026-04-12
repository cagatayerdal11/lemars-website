import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 overflow-hidden">
        <Image src="/istanbul.jpg" alt="" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-800/80" />
        {/* Caricature drink photo - blurred decorative element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-full pointer-events-none select-none opacity-25">
          <Image src="/drinks-hero.jpg" alt="" fill className="object-contain object-right" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-44">
          <div className="max-w-3xl">
            <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-8">
              İstanbul &bull; Avrupa Yakası &bull; Toptan Dağıtım
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
              Güvenilir Tedarik,
              <br />
              <span className="text-primary-500">Güçlü Ortaklık.</span>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-xl">
              Restoran, bar ve perakende satış noktalarına hızlı, güvenilir
              ve kaliteli alkollü içecek toptan satış hizmeti sunuyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/iletisim" className="btn-primary">
                Bizi Tanıyın
              </Link>
              <Link href="/hizmetlerimiz" className="btn-outline border-white/20 text-white hover:bg-white/10 hover:text-white">
                Hizmetlerimiz
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs tracking-wider">
              TAPDK LİSANSLI DAĞITIM &mdash; 20+ YILLIK DENEYİM
            </p>
            <div className="flex items-center gap-8">
              {["1800+ Satış Noktası", "1000+ Ürün Çeşidi", "%99 Memnuniyet"].map((s, i) => (
                <span key={i} className="text-gray-500 text-xs tracking-wider">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            {[
              {
                title: "Hızlı Teslimat",
                desc: "İstanbul Avrupa Yakası genelinde aynı gün teslimat imkânı ile işletmenizi hiç stoksuz bırakmıyoruz.",
                num: "01",
              },
              {
                title: "Lisanslı Dağıtım",
                desc: "TAPDK lisanslı, tüm yasal mevzuata uygun toptan satış ve dağıtım hizmeti sunuyoruz.",
                num: "02",
              },
              {
                title: "Profesyonel Hizmet",
                desc: "Deneyimli ekibimizle işletmenize özel çözümler sunuyor, her aşamada destek sağlıyoruz.",
                num: "03",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 group hover:bg-gray-50 transition-colors duration-300">
                <span className="text-primary-600 text-xs font-bold tracking-widest">{item.num}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                Hakkımızda
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                İstanbul&apos;un
                <br />Güvenilir Dağıtım
                <br />Ortağı
              </h2>
              <p className="text-gray-500 leading-relaxed mb-10">
                LeMars Gıda İçecek olarak, İstanbul Avrupa Yakası&apos;nda
                alkollü içecekler alanında toptan satış ve dağıtım hizmeti
                sunmaktayız. Kaliteli ürün yelpazemiz ve güvenilir lojistik
                ağımız ile işletmelerin ihtiyaçlarını karşılıyoruz.
              </p>
              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-3 text-primary-700 text-sm font-semibold tracking-wider uppercase hover:gap-5 transition-all duration-300"
              >
                Daha Fazla
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "1800+", label: "Satış Noktası" },
                { number: "20+", label: "Yıllık Deneyim" },
                { number: "1000+", label: "Ürün Çeşidi" },
                { number: "%99", label: "Müşteri Memnuniyeti" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 text-center border border-gray-100">
                  <div className="text-3xl font-bold text-primary-700 mb-2">{stat.number}</div>
                  <div className="text-xs text-gray-500 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Hizmetlerimiz</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Tedarik Çözümlerimiz</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "HoReCa Tedarikçisi",
                desc: "Restoran, bar, meyhane ve eğlence mekânlarının tedarik süreçlerini düzenli ve zamanında yönetiyoruz.",
              },
              {
                title: "Perakende Satış",
                desc: "Market, tekel bayii ve perakende satış noktalarının stok yönetimi ve düzenli tedarik çözümleri.",
              },
              {
                title: "Lojistik & Dağıtım",
                desc: "İstanbul Avrupa Yakası genelinde kendi filo ve lojistik ağımızla hızlı ve güvenli dağıtım.",
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="w-full h-px bg-primary-700 mb-8 origin-left group-hover:scale-x-100 scale-x-50 transition-transform duration-500" />
                <h3 className="text-lg font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <Link href="/hizmetlerimiz" className="text-primary-700 text-xs font-semibold tracking-wider uppercase hover:tracking-[0.2em] transition-all">
                  Detaylı Bilgi &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">İletişim</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            İşletmeniz İçin Doğru
            <br />Tedarik Ortağı
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Dağıtım ve tedarik stratejinizi birlikte oluşturalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/iletisim" className="btn-white">İletişime Geçin</Link>
            <a href="tel:+902128091883" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-md hover:bg-white/10 transition-all text-sm uppercase tracking-wider">
              +90 (212) 809 18 83
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
