import Link from "next/link";
import { getDictionary, Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

interface BrandInfo {
  name: string;
  origin: { tr: string; en: string };
  category: { tr: string; en: string };
  descTr: string;
  descEn: string;
}

const brandData: Record<string, BrandInfo> = {
  marengo: {
    name: "Marengo",
    origin: { tr: "İtalya", en: "Italy" },
    category: { tr: "Köpüklü Şarap & Vermut", en: "Sparkling Wine & Vermouth" },
    descTr: "Marengo, Bayadera Group portföyünde yer alan ve üzüm temelli ürün kategorilerinde konumlanan bir markadır. Köpüklü şarap ve vermut segmentlerinde şekillenen marka yapısı, grubun bu alandaki üretim yaklaşımı ve birikimiyle bütünleşmektedir. Klasik İtalyan teknolojisiyle Bayadera Group ortağı Vinicola Decordi işletmelerinde üretilen tüm içecekler, en iyi üzüm çeşitlerinden elde edilen narin ve ferahlatıcı tatlara sahiptir. Zaman içinde portföy içinde belirgin bir yere sahip olan Marengo, üzüm bazlı ürün geleneğini yansıtan markalardan biri olarak öne çıkmaktadır.",
    descEn: "Marengo is a brand within the Bayadera Group portfolio, positioned in grape-based product categories. With its structure shaped across sparkling wine and vermouth segments, the brand integrates the group's production approach and expertise in this field. All beverages are produced using classic Italian technology at Bayadera Group partner Vinicola Decordi facilities, featuring delicate and refreshing flavors from the finest grape varieties. Having established a distinctive place within the portfolio over time, Marengo stands out as one of the brands reflecting the grape-based product tradition.",
  },
  isabey: {
    name: "İsabey",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Şarap", en: "Wine" },
    descTr: "İsabey, Sevilen portföyünde yer alan ve bağ temelli üretim yaklaşımıyla bütünleşen bir şarap markasıdır. Beyaz ve kırmızı şarap kategorilerinde şekillenen marka yapısı, farklı üzüm çeşitleri üzerinden gelişen bir ürün çerçevesine sahiptir. İsabey, şirketin 1960'lardan bu yana süregelen bağcılık geleneği ve kurucu mirasıyla ilişkilenen markalardan biri olarak portföy içinde belirgin bir yere sahiptir.",
    descEn: "İsabey is a wine brand within the Sevilen portfolio, integrated with a vineyard-based production approach. Shaped across white and red wine categories, the brand structure features a product framework developed through different grape varieties. İsabey holds a distinctive place within the portfolio as one of the brands associated with the company's winemaking tradition dating back to the 1960s and its founder's legacy.",
  },
  "hlibny-dar": {
    name: "Hlibny Dar",
    origin: { tr: "Ukrayna", en: "Ukraine" },
    category: { tr: "Votka", en: "Vodka" },
    descTr: "Hlibny Dar, Ukrayna kökenli bir votka markası olup 2002 yılında pazara sunulmuştur. Marka ismi ve anlatımı, tahıl temelli üretim kültürüne referans veren bir tarihsel arka planla şekillenmektedir. Bayadera Group portföyü içinde yer alan Hlibny Dar, yıllar içerisinde grubun bilinen markalarından biri olarak konumlanmıştır. Resmî marka anlatımında isim, \"ekmeğin hediyesi\" (gift of bread) ifadesiyle açıklanmaktadır. Yalnızca doğal malzemelerden, yüksek kaliteli lüks alkol ve artezyen kuyusundan elde edilen ekolojik su kullanılarak üretilmektedir. 20 yılı aşkın süredir Hlibny Dar, kalite mükemmelliğini somutlaştırmaktadır.",
    descEn: "Hlibny Dar is a Ukrainian vodka brand introduced to the market in 2002. The brand name and narrative are shaped by a historical backdrop referencing grain-based production culture. Part of the Bayadera Group portfolio, Hlibny Dar has positioned itself as one of the group's well-known brands over the years. In the official brand narrative, the name is explained as \"gift of bread.\" Made exclusively from natural ingredients, high-quality luxury spirits using ecological water from an artesian well, the diamond clarity of the drink is ensured by new generation technologies. For more than 20 years, Hlibny Dar has embodied quality excellence.",
  },
  "scotch-blue": {
    name: "Scotch Blue",
    origin: { tr: "İskoçya", en: "Scotland" },
    category: { tr: "Viski", en: "Whisky" },
    descTr: "Scotch Blue, İskoçya kökenli bir blended viski markasıdır. Geleneksel İskoç damıtma yöntemleriyle üretilen marka, yumuşak ve dengeli tat profiliyle tanınmaktadır.",
    descEn: "Scotch Blue is a blended whisky brand of Scottish origin. Produced using traditional Scottish distillation methods, the brand is known for its smooth and balanced flavor profile.",
  },
  suvorov: {
    name: "Suvorov",
    origin: { tr: "Ukrayna", en: "Ukraine" },
    category: { tr: "Votka", en: "Vodka" },
    descTr: "Suvorov, Ukrayna kökenli bir votka markası olup, geleneksel damıtma yöntemleri ve kaliteli hammaddeler kullanılarak üretilmektedir. Saf ve yumuşak tat profiliyle dikkat çekmektedir.",
    descEn: "Suvorov is a vodka brand of Ukrainian origin, produced using traditional distillation methods and quality raw materials. It stands out with its pure and smooth flavor profile.",
  },
  enjoy: {
    name: "Enjoy",
    origin: { tr: "Ukrayna", en: "Ukraine" },
    category: { tr: "Likör & Kokteyl", en: "Liqueur & Cocktail" },
    descTr: "Enjoy, modern yaşam tarzına uygun, renkli ve ferahlatıcı içecek seçenekleri sunan bir markadır. Farklı aroma ve tat kombinasyonlarıyla geniş bir ürün yelpazesine sahiptir.",
    descEn: "Enjoy is a brand offering colorful and refreshing beverage options suited to the modern lifestyle. It features a wide product range with different aroma and flavor combinations.",
  },
  cumbus: {
    name: "Cümbüş",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Rakı", en: "Rakı (Anise Spirit)" },
    descTr: "Cümbüş, Türk rakı geleneğini yansıtan bir markadır. Anadolu'nun köklü içki kültüründen ilham alarak şekillenen marka, geleneksel damıtma yöntemleriyle üretilmektedir.",
    descEn: "Cümbüş is a brand reflecting the Turkish rakı tradition. Inspired by Anatolia's deep-rooted spirit culture, the brand is produced using traditional distillation methods.",
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
            {/* Logo placeholder */}
            <div className="aspect-[4/3] bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-300 text-sm font-medium mb-2">{t.logoPlaceholder}</p>
                <p className="text-4xl font-bold text-gray-200">{info.name}</p>
              </div>
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
