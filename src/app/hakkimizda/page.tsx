import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Hakkımızda | LeMars Gıda İçecek",
  description: "LeMars Gıda İçecek hakkında bilgi. İstanbul Avrupa Yakası'nda alkollü içecek toptan satış ve dağıtım.",
};

export default function Hakkimizda() {
  return (
    <>
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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Hikayemiz</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-8">Kalite ve Güvenin Adresi</h2>
              <div className="space-y-6 text-gray-500 leading-relaxed">
                <p>
                  LeMars Gıda İçecek, İstanbul Avrupa Yakası&apos;nda alkollü
                  içecekler sektöründe faaliyet gösteren, TAPDK lisanslı bir
                  toptan satış ve dağıtım firmasıdır.
                </p>
                <p>
                  Kurulduğu günden bu yana müşteri memnuniyetini ön planda
                  tutarak, restoran, bar, otel ve perakende satış noktalarına
                  kesintisiz tedarik hizmeti sunmaktadır.
                </p>
                <p>
                  Geniş ürün yelpazemiz, deneyimli kadromuz ve güçlü lojistik
                  altyapımız ile sektörde güvenilir bir çözüm ortağı olarak
                  konumlanmaktayız.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-2">Değerlerimiz</p>
              {[
                { title: "Güvenilirlik", desc: "Zamanında teslimat ve tutarlı hizmet kalitesi ile iş ortaklarımızın güvenini kazanıyoruz." },
                { title: "Yasallık", desc: "TAPDK ve tüm ilgili mevzuata tam uyumlu faaliyet gösteriyoruz." },
                { title: "Kalite", desc: "Ürün tedarik zincirinde kalite kontrolü en üst düzeyde tutarak müşterilerimize en iyisini sunuyoruz." },
                { title: "Müşteri Odaklılık", desc: "Her işletmenin benzersiz ihtiyaçlarını anlayarak kişiye özel çözümler üretiyoruz." },
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

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Avantajlarımız</p>
            <h2 className="text-4xl font-bold text-gray-900">Neden LeMars?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {[
              { title: "Hızlı Teslimat", desc: "Aynı gün teslimat ile işletmenizin hiç stoksuz kalmamasını sağlıyoruz." },
              { title: "TAPDK Uyumlu", desc: "Tüm faaliyetlerimiz TAPDK lisansı ve ilgili mevzuata uygun yürütülmektedir." },
              { title: "Müşteri Memnuniyeti", desc: "Müşterilerimizin %99'u hizmetimizden memnun. Uzun vadeli iş birlikleri kuruyoruz." },
              { title: "Geniş Ürün Yelpazesi", desc: "1000'den fazla ürün çeşidi ile restoran, bar, tekel, market ve otel gibi her işletmenin ihtiyacını karşılıyoruz." },
              { title: "7/24 Destek", desc: "Profesyonel müşteri hizmetleri ekibimiz her zaman yanınızdadır." },
              { title: "Geniş Kapsama", desc: "İstanbul Avrupa Yakası'nın tüm ilçelerine ulaşan güçlü dağıtım ağımız." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-10">
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">İş Birliğine Hazır Mısınız?</h2>
          <p className="text-gray-400 mb-10">İşletmeniz için en uygun tedarik çözümünü birlikte belirleyelim.</p>
          <Link href="/iletisim" className="btn-white">İletişime Geçin</Link>
        </div>
      </section>
    </>
  );
}
