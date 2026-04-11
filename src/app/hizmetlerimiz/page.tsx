import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Hizmetlerimiz | LeMars Gıda İçecek",
  description: "LeMars Gıda İçecek toptan alkollü içecek dağıtım hizmetleri.",
};

export default function Hizmetlerimiz() {
  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Hizmetlerimiz</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">Tedarik Çözümlerimiz</h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            Her ölçekteki işletmeye özel, TAPDK uyumlu, güvenilir ve hızlı
            alkollü içecek tedarik hizmetleri sunuyoruz.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">01 &mdash; HoReCa</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Restoran, Bar &<br />Otel Tedarikçisi</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                HoReCa sektöründeki işletmelerin alkollü içecek ihtiyaçlarını
                eksiksiz ve zamanında karşılıyoruz. Özel müşteri temsilciniz
                aracılığıyla işletmenize özel tedarik planları oluşturuyoruz.
              </p>
              <ul className="space-y-3">
                {["Restoran ve kafeler için düzenli tedarik", "Bar ve gece kulüpleri için özel çözümler", "Otel ve tatil köyleri için toplu sipariş", "Etkinlik ve organizasyonlar için özel hizmet"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-700 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square max-h-96 rounded-lg overflow-hidden">
              <Image src="/delivery-truck.jpg" alt="HoReCa tedarik" fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary-500 text-6xl font-bold mb-2">01</p>
                  <p className="text-white text-sm tracking-[0.2em] uppercase">HoReCa Sektörü</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-square max-h-96 rounded-lg overflow-hidden">
              <Image src="/hero-warehouse.jpg" alt="Perakende tedarik" fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary-500 text-6xl font-bold mb-2">02</p>
                  <p className="text-white text-sm tracking-[0.2em] uppercase">Perakende</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">02 &mdash; Perakende</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Perakende Satış<br />Noktaları</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Market, tekel bayii ve diğer perakende satış noktalarının stok
                yönetimini kolaylaştırıyor, düzenli ve güvenilir tedarik sağlıyoruz.
              </p>
              <ul className="space-y-3">
                {["Market ve bakkallar için düzenli tedarik", "Tekel bayileri için geniş ürün yelpazesi", "Stok takip ve yönetim desteği", "Rekabetçi toptan fiyat politikası"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-700 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">03 &mdash; Lojistik</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Lojistik &<br />Dağıtım Ağı</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Kendi filo ve dağıtım ağımız ile İstanbul Avrupa Yakası&apos;nın
                tamamına hızlı, güvenli ve sorunsuz teslimat hizmeti sunuyoruz.
              </p>
              <ul className="space-y-3">
                {["Kendi araç filomuz ile dağıtım", "Aynı gün teslimat seçeneği", "Soğuk zincir lojistik altyapısı", "GPS takipli güvenli teslimat"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-700 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square max-h-96 rounded-lg overflow-hidden">
              <Image src="/logistics.jpg" alt="Lojistik dağıtım" fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary-500 text-6xl font-bold mb-2">03</p>
                  <p className="text-white text-sm tracking-[0.2em] uppercase">Lojistik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Ürünlerimiz</p>
            <h2 className="text-4xl font-bold text-gray-900">Ürün Kategorileri</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
            {["Bira Çeşitleri", "Şarap Çeşitleri", "Rakı", "Viski", "Votka", "Cin", "Tekila", "Likör Çeşitleri"].map((item, i) => (
              <div key={i} className="bg-white p-8 text-center hover:bg-gray-50 transition-colors">
                <span className="text-sm font-semibold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-gray-400">
            Bu kategoriler yalnızca bilgilendirme amaçlıdır. Detaylı bilgi için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">İşletmenize Özel Teklif Alın</h2>
          <p className="text-gray-400 mb-10">İhtiyaçlarınızı dinliyor, size özel tedarik planı oluşturuyoruz.</p>
          <Link href="/iletisim" className="btn-white">Teklif Alın</Link>
        </div>
      </section>
    </>
  );
}
