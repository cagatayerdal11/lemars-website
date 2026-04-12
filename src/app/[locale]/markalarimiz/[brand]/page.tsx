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
    descTr: "Marengo, Bayadera Group portföyünde yer alan İtalya esintili bir köpüklü şarap markasıdır. Köpüklü şarap ve vermut segmentlerinde konumlanan marka, Bayadera Group ortağı Vinicola Decordi tesislerinde klasik İtalyan teknolojisiyle üretilmektedir. En iyi üzüm çeşitlerinden elde edilen narin ve ferahlatıcı tatlarıyla tanınan Marengo; meyve, şeftali, çilek ve çiçek aromaları barındıran köpüklü şaraplarıyla şık bir kutlama deneyimi sunar.",
    descEn: "Marengo is an Italian-inspired sparkling wine brand within the Bayadera Group portfolio. Positioned across sparkling wine and vermouth segments, the brand is produced using classic Italian technology at Bayadera Group partner Vinicola Decordi facilities. Known for its delicate and refreshing flavors from the finest grape varieties, Marengo offers an elegant celebration experience with sparkling wines featuring notes of fruit, peach, strawberry, and floral aromas.",
  },
  isabey: {
    name: "İsabey",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Şarap", en: "Wine" },
    descTr: "İsabey, Sevilen Şarapları bünyesinde yer alan ve bağ temelli üretim yaklaşımıyla bütünleşen bir şarap markasıdır. 1960'lardan bu yana süregelen bağcılık geleneği ve kurucu mirasıyla şekillenen İsabey, beyaz ve kırmızı şarap kategorilerinde farklı üzüm çeşitleri üzerinden gelişen zengin bir ürün portföyüne sahiptir. Türk bağcılık kültürünün köklü birikimini yansıtan markalardan biri olarak öne çıkmaktadır.",
    descEn: "İsabey is a wine brand within the Sevilen Wines portfolio, integrated with a vineyard-based production approach. Shaped by the company's winemaking tradition dating back to the 1960s and its founder's legacy, İsabey features a rich product portfolio developed across white and red wine categories through different grape varieties. It stands out as one of the brands reflecting the deep heritage of Turkish viticulture.",
  },
  "hlibny-dar": {
    name: "Hlibny Dar",
    origin: { tr: "Ukrayna", en: "Ukraine" },
    category: { tr: "Votka", en: "Vodka" },
    descTr: "Hlibny Dar, Ukrayna kökenli ve 2002 yılında pazara sunulan uluslararası ödüllü bir votka markasıdır. Bayadera Group portföyünde yer alan marka, tahıl temelli üretim kültürüne referans veren tarihsel arka planıyla şekillenmiştir. Resmî marka anlatımında isim \"ekmeğin hediyesi\" (gift of bread) ifadesiyle açıklanmaktadır. Yalnızca doğal malzemelerden, yüksek kaliteli lüks alkol ve artezyen kuyusundan elde edilen ekolojik su kullanılarak üretilen Hlibny Dar, yeni nesil teknolojilerle elde edilen kristal berraklığıyla tanınmaktadır. Küresel derecelendirmelerde Smirnoff ve Absolut gibi devlerle birlikte en iyi beş votka arasında yer almaktadır.",
    descEn: "Hlibny Dar is an award-winning Ukrainian vodka brand introduced to the market in 2002. Part of the Bayadera Group portfolio, the brand is shaped by a historical narrative referencing grain-based production culture. In the official brand story, the name is explained as \"gift of bread.\" Produced exclusively from natural ingredients, high-quality luxury spirits, and ecological water from an artesian well, Hlibny Dar is renowned for its diamond clarity achieved through new-generation technologies. It rightfully ranks among the top five vodka leaders globally, alongside well-known giants such as Smirnoff and Absolut.",
  },
  "scotch-blue": {
    name: "Scotch Blue",
    origin: { tr: "Güney Kore", en: "South Korea" },
    category: { tr: "Harman Viski", en: "Blended Whisky" },
    descTr: "Scotch Blue, Lotte Chilsung Beverage bünyesinde 1997 yılında tanıtılan bir harman viski markasıdır. Kore damak zevkine uygun olarak özel olarak harmanlanan marka, Güney Kore viski pazarında öncü konumdadır. Yumuşak ve dengeli tat profiliyle tanınan Scotch Blue, Lotte grubunun içki portföyünde önemli bir yere sahiptir.",
    descEn: "Scotch Blue is a blended whisky brand introduced in 1997 under Lotte Chilsung Beverage. Specially blended to suit the Korean palate, the brand holds a pioneering position in the South Korean whisky market. Known for its smooth and balanced flavor profile, Scotch Blue occupies an important place in the Lotte group's beverage portfolio.",
  },
  suvorov: {
    name: "Suvorov",
    origin: { tr: "Moldova", en: "Moldova" },
    category: { tr: "Şarap", en: "Wine" },
    descTr: "Suvorov, Moldova menşeli bir şarap markasıdır. Moldova'nın köklü bağcılık geleneği ve zengin terroir yapısından beslenen marka, kaliteli üzüm çeşitlerinden elde edilen şaraplarıyla tanınmaktadır. Kırmızı ve beyaz şarap kategorilerinde ürün yelpazesine sahip olan Suvorov, Moldova şarap kültürünün birikimini yansıtan markalardan biri olarak öne çıkmaktadır.",
    descEn: "Suvorov is a wine brand of Moldovan origin. Drawing from Moldova's deep-rooted viticulture tradition and rich terroir, the brand is known for its wines crafted from quality grape varieties. With a product range spanning red and white wine categories, Suvorov stands out as one of the brands reflecting the heritage of Moldovan wine culture.",
  },
  enjoy: {
    name: "Enjoy Shot",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Aromatize Şarap Bazlı İçecek", en: "Aromatized Wine-Based Beverage" },
    descTr: "Enjoy Shot, Türkiye'de aromatize şarap bazlı içecek üreten yerli bir markadır. Isparta Süleyman Demirel Organize Sanayi Bölgesi'nde kurulan fabrikasında 2019 yılında üretime başlayan marka, ülke genelindeki üzümleri işleyerek aromatize şarap bazlı içkiler üretmektedir. Saatlik 18.000 şişe üretim kapasitesine sahip tesiste kalite-fiyat dengesine önem veren bir misyon ve AR-GE odaklı bir vizyon ile çalışılmaktadır.",
    descEn: "Enjoy Shot is a Turkish brand producing aromatized wine-based beverages. The brand began production in 2019 at its factory established in the Isparta Süleyman Demirel Organized Industrial Zone, processing grapes from across the country to create aromatized wine-based drinks. Operating with an hourly capacity of 18,000 bottles, the facility works with a mission focused on quality-price balance and an R&D-driven vision.",
  },
  cumbus: {
    name: "Cümbüş",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Şarap", en: "Wine" },
    descTr: "Cümbüş, Aykut Özkan Şarapçılık'a ait bir şarap markasıdır. Çal/Denizli terroirini temel alan marka, kırmızı, beyaz ve roze çeşitleriyle üretim yapmaktadır. Çalkarası ve Boğazkere gibi yerli üzüm çeşitlerinden elde edilen şaraplarıyla tanınan Cümbüş, burunda kırmızı meyve aromaları ve damakta taze, kolay içimli bir karakter sunmaktadır.",
    descEn: "Cümbüş is a wine brand owned by Aykut Özkan Winery. Based on the Çal/Denizli terroir, the brand produces red, white, and rosé varieties. Known for its wines crafted from indigenous grape varieties such as Çalkarası and Boğazkere, Cümbüş offers red fruit aromas on the nose with a fresh, easy-drinking character on the palate.",
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
