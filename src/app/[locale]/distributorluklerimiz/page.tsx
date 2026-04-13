import Link from "next/link";
import { getDictionary, Locale } from "@/i18n/config";
import DistributorCard from "@/components/DistributorCard";

const distributors = [
  {
    name: "Lotte Chilsung Beverage",
    logo: "/brands/scotch-blue.png",
    logoBg: "",
    brands: { tr: "Scotch Blue", en: "Scotch Blue" },
    descTr: "Scotch Blue, Lotte Chilsung Beverage bünyesinde geliştirilen ve Güney Kore pazarında güçlü karşılığı bulunan önemli bir harman viski markasıdır. Marka, köklü kurumsal altyapısı ve pazardaki yerleşik konumuyla portföyümüzde dikkat çeken uluslararası markalardan biridir.",
    descEn: "Scotch Blue is a significant blended whisky brand developed under Lotte Chilsung Beverage with a strong presence in the South Korean market. The brand stands out in our portfolio as one of the distinguished international brands with its established corporate infrastructure and firmly positioned market standing.",
  },
  {
    name: "Bayadera Group",
    logo: "/brands/marengo.png",
    logoBg: "",
    brands: { tr: "Marengo, Hlibny Dar", en: "Marengo, Hlibny Dar" },
    descTr: "Marengo, Bayadera Group portföyü içinde köpüklü şarap segmentinde öne çıkan ve İtalyan üretim yaklaşımını güçlü bir marka kimliğiyle birleştiren markalardan biridir. Hlibny Dar ise Bayadera Group'un uluslararası bilinirliği yüksek, köklü ve güçlü votka markalarından biridir. Ukrayna üretim geleneğini modern marka yapısıyla birleştiren Hlibny Dar, kategorisinde güven veren ve yüksek tanınırlığa sahip iş ortaklarımız arasında yer almaktadır.",
    descEn: "Marengo is one of the brands within the Bayadera Group portfolio that stands out in the sparkling wine segment, combining the Italian production approach with a strong brand identity. Hlibny Dar is one of Bayadera Group's internationally recognized, well-established and powerful vodka brands. Combining the Ukrainian production tradition with a modern brand structure, Hlibny Dar is among our trusted and highly recognized business partners in its category.",
  },
  {
    name: "KVINT",
    logo: "/brands/suvorov.png",
    logoBg: "bg-gray-900",
    brands: { tr: "Suvorov Divin & Şarap", en: "Suvorov Divin & Wine" },
    descTr: "Suvorov, KVINT'in köklü üretim mirasını yansıtan, uzun yıllandırma yaklaşımıyla öne çıkan prestijli divin markalarından biridir. Güçlü üretim geçmişi ve olgun ürün karakteriyle marka, yüksek segmentte değerli bir iş ortaklığı örneği oluşturmaktadır.",
    descEn: "Suvorov is one of KVINT's prestigious divin brands, reflecting its deep-rooted production heritage and distinguished by its long-aging approach. With its strong production history and mature product character, the brand represents a valuable partnership in the premium segment.",
  },
  {
    name: "Enjoy Alkollü Alkolsüz İçecekler A.Ş.",
    logo: "/brands/enjoy.png",
    logoBg: "",
    brands: { tr: "Enjoy Shot", en: "Enjoy Shot" },
    descTr: "Enjoy Shot, Türkiye'de aromatize şarap bazlı içecek kategorisinde üretim yapan, dinamik ve gelişime açık yerli markalardan biridir. Isparta'daki üretim altyapısı, yaygın dağıtım yaklaşımı ve ürün çeşitliliğiyle marka, yerel pazarda güçlü bir potansiyel taşımaktadır.",
    descEn: "Enjoy Shot is one of the dynamic and growth-oriented domestic brands producing in the aromatized wine-based beverage category in Turkey. With its production infrastructure in Isparta, widespread distribution approach, and product diversity, the brand carries strong potential in the local market.",
  },
  {
    name: "Aykut Özkan Şarapçılık",
    logo: "/brands/aykut-ozkan.png",
    logoBg: "",
    brands: { tr: "Cümbüş, İsabey", en: "Cümbüş, İsabey" },
    descTr: "İsabey, Aykut Özkan Şarapçılık bünyesinde Çal / Denizli bağcılık geleneğini yansıtan, yerel üretim kültürüyle bütünleşmiş güçlü bir şarap markasıdır. Cümbüş ise aynı portföyde yer alan ve Çal / Denizli terroirini sade, ulaşılabilir ve dengeli bir ürün yaklaşımıyla yansıtan yerel şarap markalarından biridir. Kırmızı, beyaz ve roze çeşitleriyle markalar, bölgesel üzüm karakterini geniş kitlelerle buluşturmaktadır.",
    descEn: "İsabey is a strong wine brand within the Aykut Özkan Winery, reflecting the Çal/Denizli viticulture tradition and integrated with local production culture. Cümbüş is a local wine brand in the same portfolio, reflecting the Çal/Denizli terroir with a simple, accessible, and balanced product approach. With red, white, and rosé varieties, both brands bring regional grape character to a wide audience.",
  },
];

export default async function Distributorluklerimiz({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.distributorships as Record<string, unknown>;
  const locale = params.locale;
  const lang = locale === "en" ? "en" : "tr";

  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t.heroEyebrow as string}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            {t.heroTitle as string}
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            {t.heroDesc as string}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {t.sectionEyebrow as string}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t.sectionTitle as string}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              {t.sectionDesc as string}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {distributors.map((dist) => (
              <DistributorCard
                key={dist.name}
                name={dist.name}
                logo={dist.logo}
                logoBg={dist.logoBg}
                brands={dist.brands[lang]}
                description={lang === "en" ? dist.descEn : dist.descTr}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm mb-6">
              {t.ctaDesc as string}
            </p>
            <Link href={`/${locale}/iletisim`} className="btn-primary">
              {t.ctaButton as string}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
