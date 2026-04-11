import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Hakkımızda | LeMars Gıda İçecek",
  description: "LeMars Gıda İçecek hakkında bilgi. İstanbul Avrupa Yakası'nda alkollü içecek toptan satış ve dağıtım.",
};

export default function Hakkimizda() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 py-24 md:py-32 overflow-hidden">
        <Image src="/istanbul.jpg" alt="" fill className="object-cover opacity-15" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Hakkımızda</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
            LeMars Gıda İçecek
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            İstanbul Avrupa Yakası&apos;nda alkollü içecekler alanında toptan satış
            ve dağıtım hizmeti sunan güvenilir çözüm ortağınız.
          </p>
        </div>
      </section>

      {/* Hikaye + 20 Yıl Deneyim */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">20+ Yıllık Deneyim</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-8">
                Sektörün Deneyimli ve Güvenilir İsmi
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed">
                <p>
                  LeMars Gıda İçecek, 20 yılı aşkın sektör deneyimiyle İstanbul Avrupa Yakası&apos;nda
                  alkollü içecekler alanında toptan satış ve dağıtım hizmeti sunan, TAPDK lisanslı
                  bir firmadır.
                </p>
                <p>
                  Yıllar içinde edindiğimiz <strong className="text-gray-700">piyasa bilgisi</strong> ve
                  <strong className="text-gray-700"> tüketici alışkanlıklarına hakimiyetimiz</strong>,
                  iş ortaklarımıza stratejik avantaj sağlar. Tedarik zinciri yönetiminden lojistik
                  planlamaya kadar her aşamada biriktirdiğimiz know-how, sektördeki en değerli
                  varlığımızdır.
                </p>
                <p>
                  <strong className="text-gray-700">Nitelikli insan kaynağımız</strong> ve
                  <strong className="text-gray-700"> modern yönetim anlayışımız</strong> ile
                  restoran, bar, otel, market ve tekel bayii gibi 1800&apos;den fazla satış noktasına
                  kesintisiz hizmet sunmaktayız.
                </p>
              </div>
            </div>

            {/* Yetkinlikler */}
            <div className="space-y-8">
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-2">Yetkinliklerimiz</p>
              {[
                {
                  title: "Sektörel Know-How",
                  desc: "20 yılı aşkın deneyimle biriktirdiğimiz bilgi birikimi, piyasa dinamiklerini doğru okumamızı ve iş ortaklarımıza katma değer sağlamamızı mümkün kılar.",
                },
                {
                  title: "Piyasa Bilgisi & Tüketici Alışkanlıkları",
                  desc: "Değişen piyasa koşullarını ve tüketici tercihlerini yakından takip ederek, iş ortaklarımızın doğru ürün ve stok kararları vermesine destek oluruz.",
                },
                {
                  title: "Tedarik Zinciri Yönetimi",
                  desc: "Tedarikçiden satış noktasına kadar tüm süreci verimli ve kesintisiz yöneterek, işletmelerin operasyonel yükünü hafifletiriz.",
                },
                {
                  title: "Nitelikli İnsan Kaynağı & Modern Yönetim",
                  desc: "Alanında uzman kadromuz ve çağdaş yönetim anlayışımızla, hızlı karar alma ve çözüm odaklı hizmet sunuyoruz.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0">
                  <span className="text-primary-700 text-xs font-bold tracking-widest mt-1">0{i + 1}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Neden LeMars */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Avantajlarımız</p>
            <h2 className="text-4xl font-bold text-gray-900">Neden LeMars?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {[
              {
                title: "Geniş Tedarikçi & Ürün Yelpazesi",
                desc: "Yerli ve ithal markalardan oluşan 1000'den fazla ürün çeşidi ile her işletmenin ihtiyacını tek noktadan karşılıyoruz.",
              },
              {
                title: "Esnek Dağıtım Ağı",
                desc: "İstanbul Avrupa Yakası'nın tamamını kapsayan, aynı gün teslimat sunan esnek ve güçlü dağıtım altyapımız.",
              },
              {
                title: "Çözüm Odaklı Yönetim",
                desc: "Her müşteriye özel tedarik planları oluşturan, sorunları proaktif çözen modern yönetim anlayışımız.",
              },
              {
                title: "20+ Yıllık Sektör Deneyimi",
                desc: "Piyasa bilgisi, tüketici alışkanlıkları ve tedarik zinciri yönetiminde yılların birikimiyle hizmet veriyoruz.",
              },
              {
                title: "Nitelikli Ekip",
                desc: "Alanında uzman, müşteri odaklı kadromuzla her aşamada profesyonel destek sağlıyoruz.",
              },
              {
                title: "TAPDK Lisanslı Güvence",
                desc: "Tüm faaliyetlerimiz ilgili mevzuata uygun, lisanslı ve denetlenebilir şekilde yürütülmektedir.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-10">
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">İş Birliğine Hazır Mısınız?</h2>
          <p className="text-gray-400 mb-10">Dağıtım ve tedarik stratejinizi birlikte oluşturalım.</p>
          <Link href="/iletisim" className="btn-white">İletişime Geçin</Link>
        </div>
      </section>
    </>
  );
}
