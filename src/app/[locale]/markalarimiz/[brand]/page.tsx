import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

interface BrandInfo {
  name: string;
  origin: { tr: string; en: string };
  category: { tr: string; en: string };
  logo: string;
  logoBg?: string;
  descTr: string;
  descEn: string;
}

const brandData: Record<string, BrandInfo> = {
  marengo: {
    name: "Marengo",
    origin: { tr: "İtalya", en: "Italy" },
    category: { tr: "Köpüklü Şarap & Vermut", en: "Sparkling Wine & Vermouth" },
    logo: "/brands/marengo.png",
    descTr: "Marengo, Bayadera Group bünyesinde İtalya esintili köpüklü şarap ve vermut kategorilerinde konumlanan bir markadır. \"Luxurious, temperamental and open-minded\" sloganıyla tanıtılan marka, Vinicola Decordi tesislerinde klasik İtalyan yöntemleriyle üretilen şaraplardan oluşur. En iyi üzüm çeşitlerinden elde edilen narin ve ferahlatıcı tatlarıyla tanınan Marengo, şık bir kutlama deneyimi sunar.",
    descEn: "Marengo is an Italian-inspired brand within the Bayadera Group, positioned in sparkling wine and vermouth categories. Presented with the slogan \"Luxurious, temperamental and open-minded,\" the brand consists of wines produced using classic Italian methods at Vinicola Decordi facilities. Known for its delicate and refreshing flavors from the finest grape varieties, Marengo offers an elegant celebration experience.",
  },
  "hlibny-dar": {
    name: "Hlibny Dar",
    origin: { tr: "Ukrayna", en: "Ukraine" },
    category: { tr: "Votka", en: "Vodka" },
    logo: "/brands/hlibny-dar.png",
    descTr: "Hlibny Dar, Bayadera Group'un Ukrayna menşeli votka markasıdır. Uluslararası ödüllere sahip olan bu \"kusursuz Ukrayna vodkası\", dünyanın en çok satan beş votka markası arasında yer aldığı vurgusuyla tanıtılır. Resmî marka anlatımında isim \"ekmeğin hediyesi\" (gift of bread) ifadesiyle açıklanmaktadır. Yalnızca doğal malzemelerden, yüksek kaliteli lüks alkol ve artezyen kuyusundan elde edilen ekolojik su kullanılarak üretilen Hlibny Dar, yeni nesil teknolojilerle elde edilen kristal berraklığıyla tanınmaktadır.",
    descEn: "Hlibny Dar is Bayadera Group's Ukrainian vodka brand. This award-winning \"flawless Ukrainian vodka\" is promoted as ranking among the world's five best-selling vodka brands. In the official brand narrative, the name is explained as \"gift of bread.\" Produced exclusively from natural ingredients, high-quality luxury spirits, and ecological water from an artesian well, Hlibny Dar is renowned for its diamond clarity achieved through new-generation technologies.",
  },
  "scotch-blue": {
    name: "Scotch Blue",
    origin: { tr: "Güney Kore", en: "South Korea" },
    category: { tr: "Harman Viski", en: "Blended Whisky" },
    logo: "/brands/scotch-blue.png",
    descTr: "Scotch Blue, Lotte Chilsung Beverage tarafından Kore pazarına yönelik olarak üretilen bir harman viski markasıdır. 1997'de tanıtılan marka, Kore damak zevkine uyarlanmış harmanlanmış viskileriyle bilinir. L.A. Whiskey Society tarafından da değerlendirilen Scotch Blue, yumuşak ve dengeli tat profiliyle Güney Kore viski pazarında öncü konumdadır.",
    descEn: "Scotch Blue is a blended whisky brand produced by Lotte Chilsung Beverage for the Korean market. Introduced in 1997, the brand is known for its blended whiskies tailored to the Korean palate. Also reviewed by the L.A. Whiskey Society, Scotch Blue holds a pioneering position in the South Korean whisky market with its smooth and balanced flavor profile.",
  },
  suvorov: {
    name: "Suvorov",
    origin: { tr: "Moldova", en: "Moldova" },
    category: { tr: "Şarap", en: "Wine" },
    logo: "/brands/suvorov.png",
    logoBg: "bg-gray-900",
    descTr: "Suvorov, Tiraspol Şarap ve İçki Fabrikası (KVINT) tarafından üretilen Moldova menşeli bir şarap ve divin markasıdır. İlk kez 1992'de Tiraspol'un 200. yıl dönümünü anmak için üretilen marka, KVINT'in köklü şarap üretim geleneğiyle bütünleşmektedir. Meşe fıçılarda uzun süre olgunlaştırılan ürünleriyle tanınan Suvorov, Moldova'nın zengin terroir yapısından beslenen kaliteli şaraplar ve divinlerden oluşan bir portföye sahiptir.",
    descEn: "Suvorov is a Moldovan wine and divin brand produced by the Tiraspol Wine and Spirits Factory (KVINT). First created in 1992 to commemorate the 200th anniversary of Tiraspol, the brand integrates KVINT's deep-rooted wine production heritage. Known for its products aged in oak barrels over extended periods, Suvorov features a portfolio of quality wines and divins that draw from Moldova's rich terroir.",
  },
  enjoy: {
    name: "Enjoy Shot",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Aromatize Şarap Bazlı İçecek", en: "Aromatized Wine-Based Beverage" },
    logo: "/brands/enjoy.png",
    descTr: "Enjoy Shot, 2017'de kurulan Enjoy Alkollü Alkolsüz İçecekler A.Ş.'nin Isparta'daki tesisinde aromatize şarap bazlı içecekler üreten yerli markasıdır. Fabrika 2019'da faaliyete geçmiş olup, saatlik 18.000 şişelik kapasiteyle yerli üzümleri işleyerek ürün gamı oluşturur. Kalite-fiyat oranına önem veren bir misyon ve AR-GE odaklı vizyon ile çalışılmaktadır.",
    descEn: "Enjoy Shot is the domestic brand of Enjoy Alkollü Alkolsüz İçecekler A.Ş., founded in 2017, producing aromatized wine-based beverages at its facility in Isparta. The factory became operational in 2019, processing domestic grapes with an hourly capacity of 18,000 bottles to build its product range. The company operates with a mission focused on quality-price balance and an R&D-driven vision.",
  },
  cumbus: {
    name: "Cümbüş",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Şarap", en: "Wine" },
    logo: "/brands/aykut-ozkan.png",
    descTr: "Cümbüş, Aykut Özkan Şarapçılık portföyünde Çal/Denizli terroirine dayanan yerel bir şarap markasıdır. Kırmızı, beyaz ve roze çeşitleri bulunan marka; Çalkarası-Boğazkere, Sultaniye ve Çalkarası gibi yerel üzüm çeşitlerinden yapılmış şaraplarla öne çıkar. Çalkarası-Boğazkere kırmızı şarabı burunda kırmızı meyve aromaları, damakta taze ve kolay içimli bir karakter sunmaktadır.",
    descEn: "Cümbüş is a local wine brand within the Aykut Özkan Winery portfolio, based on the Çal/Denizli terroir. Featuring red, white, and rosé varieties, the brand stands out with wines made from local grape varieties such as Çalkarası-Boğazkere, Sultaniye, and Çalkarası. The Çalkarası-Boğazkere red wine offers red fruit aromas on the nose with a fresh, easy-drinking character on the palate.",
  },
};

const validBrands = Object.keys(brandData);

export function generateStaticParams() {
  const locales = ["tr", "en"];
  return locales.flatMap((locale) =>
    validBrands.map((brand) => ({ locale, brand }))
  );
}

export default async function BrandPage({
  params,
}: {
  params: { locale: string; brand: string };
}) {
  const { locale, brand } = params;

  if (!validBrands.includes(brand)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const t = dict.brandPage as Record<string, string>;
  const info = brandData[brand];
  const lang = locale === "en" ? "en" : "tr";
  const desc = lang === "en" ? info.descEn : info.descTr;
  const origin = info.origin[lang];
  const category = info.category[lang];

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href={`/${locale}/markalarimiz`}
            className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {t.backLink}
          </Link>
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {category}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {info.name}
          </h1>
          <div className="flex items-center gap-2 mt-6">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
            </svg>
            <span className="text-gray-400 text-sm font-semibold tracking-wider uppercase">{origin}</span>
          </div>
        </div>
      </section>

      {/* Brand Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Brand Logo */}
            <div className={`aspect-[4/3] ${info.logoBg || "bg-transparent"} border border-gray-100 rounded-lg flex items-center justify-center p-10`}>
              <Image
                src={info.logo}
                alt={info.name}
                width={400}
                height={300}
                className="object-contain max-h-full"
                priority
              />
            </div>

            {/* Brand info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                  {origin}
                </span>
                <span className="inline-flex px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                  {category}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {info.name}
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-400 mb-10">
            {t.ctaDesc}
          </p>
          <Link href={`/${locale}/iletisim`} className="btn-white">
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
