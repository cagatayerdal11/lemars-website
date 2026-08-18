import type { Locale } from "@/i18n/config";

/**
 * B2B Sıkça Sorulan Sorular + FAQPage yapısal verisi.
 *
 * Server-rendered (client JS yok) → hem kullanıcı hem arama/AI motorları içeriği
 * okur. `<details>` ile native, JS'siz açılır-kapanır; içerik kapalıyken bile
 * DOM'da olduğu için taranabilir. AI yanıt motorlarının en çok alıntıladığı
 * format. Yalnızca B2B/kurumsal bilgi — TAPDK uyumlu.
 */

type QA = { q: string; a: string };

const FAQ: Record<Locale, { title: string; eyebrow: string; items: QA[] }> = {
  tr: {
    eyebrow: "Sıkça Sorulan Sorular",
    title: "LEMARS hakkında merak edilenler",
    items: [
      {
        q: "LEMARS hangi bölgeye dağıtım yapıyor?",
        a: "LEMARS, İstanbul Avrupa Yakası'nın tamamına toptan tedarik ve dağıtım hizmeti verir. Avcılar'daki merkez depodan çıkan kendi araç filomuzla Avrupa Yakası genelinde 1800'den fazla satış noktasına düzenli ve güvenli teslimat sağlanır.",
      },
      {
        q: "LEMARS kimlere satış yapıyor?",
        a: "LEMARS yalnızca işletmelere (B2B) çalışır: restoran, bar, otel, kafe ve perakende satış noktaları. Tüketiciye doğrudan perakende satış yapılmaz; iş ortağı işletmelere toptan tedarik sağlanır.",
      },
      {
        q: "LEMARS TAPDK lisanslı mı?",
        a: "Evet. LEMARS Gıda İçecek, TAPDK (T.C. Tarım ve Orman Bakanlığı) lisanslı bir toptan alkollü içecek dağıtım şirketidir ve tüm faaliyetlerini yasal mevzuata uygun yürütür.",
      },
      {
        q: "LEMARS hangi hizmetleri sunuyor?",
        a: "İşletmelere yönelik toptan satış, ürün tedariki, kendi filosuyla lojistik ve dağıtım, ve yetkili distribütörlük hizmetleri sunar. 20+ yıllık sektör deneyimiyle uçtan uca tedarik çözümü sağlar.",
      },
      {
        q: "Bir işletme nasıl LEMARS müşterisi olur?",
        a: "Telefon (+90 212 809 18 83), WhatsApp veya web sitesindeki iletişim formu üzerinden ulaşmanız yeterli. Ekibimiz işletmenizin ihtiyacına göre tedarik ve dağıtım koşullarını paylaşır.",
      },
      {
        q: "Teslimat ne kadar sürede yapılıyor?",
        a: "Avcılar'daki merkez depomuzdan Avrupa Yakası genelinde düzenli ve hızlı dağıtım yapılır. Kendi lojistik ağımız sayesinde işletmeniz tedarik kesintisi yaşamaz.",
      },
    ],
  },
  en: {
    eyebrow: "Frequently Asked Questions",
    title: "About LEMARS",
    items: [
      {
        q: "Which area does LEMARS deliver to?",
        a: "LEMARS provides wholesale supply and distribution across the entire European side of Istanbul. From our central depot in Avcılar, our own vehicle fleet delivers regularly and safely to more than 1,800 points of sale across the European side.",
      },
      {
        q: "Who does LEMARS sell to?",
        a: "LEMARS works only with businesses (B2B): restaurants, bars, hotels, cafés and retail outlets. It does not sell directly to end consumers — it supplies partner businesses at wholesale.",
      },
      {
        q: "Is LEMARS TAPDK-licensed?",
        a: "Yes. LEMARS Gıda İçecek is a TAPDK-licensed (Turkish Ministry of Agriculture and Forestry) wholesale beverage distribution company, operating fully in line with legal regulations.",
      },
      {
        q: "What services does LEMARS offer?",
        a: "Wholesale sales to businesses, product supply, logistics and distribution with its own fleet, and authorized distributorship services. With 20+ years of industry experience it delivers end-to-end supply solutions.",
      },
      {
        q: "How does a business become a LEMARS customer?",
        a: "Simply reach us by phone (+90 212 809 18 83), WhatsApp, or the contact form on the website. Our team shares supply and distribution terms tailored to your business.",
      },
      {
        q: "How fast is delivery?",
        a: "We distribute regularly and quickly across the European side from our central depot in Avcılar. Thanks to our own logistics network, your business avoids supply interruptions.",
      },
    ],
  },
};

export default function FaqSection({ locale }: { locale: Locale }) {
  const data = FAQ[locale] ?? FAQ.tr;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="py-20 md:py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {data.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {data.title}
          </h2>
        </div>

        <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
          {data.items.map((it, i) => (
            <details key={i} className="group py-2">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 min-h-[44px] text-gray-900 font-semibold text-[15px]">
                {it.q}
                <svg
                  className="w-4 h-4 flex-shrink-0 text-primary-600 transition-transform duration-300 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </summary>
              <p className="text-gray-500 text-sm leading-relaxed pb-5 pr-8">
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
