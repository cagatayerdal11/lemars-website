import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";

const brands: {
  slug: string;
  key: string;
  origin: { tr: string; en: string };
  category: { tr: string; en: string };
  producer: string;
  logo: string;
  logoBg: string;
  imageFit?: "contain" | "cover";
}[] = [
  { slug: "scotch-blue", key: "scotch-blue", origin: { tr: "Güney Kore", en: "South Korea" }, category: { tr: "Harman Viski", en: "Blended Whisky" }, producer: "Lotte Chilsung", logo: "/brands/scotch-blue.png", logoBg: "" },
  { slug: "hlibny-dar", key: "hlibny-dar", origin: { tr: "Ukrayna", en: "Ukraine" }, category: { tr: "Votka", en: "Vodka" }, producer: "Bayadera Group", logo: "/brands/hlibny-dar.png", logoBg: "" },
  { slug: "marengo", key: "marengo", origin: { tr: "İtalya", en: "Italy" }, category: { tr: "Köpüklü Şarap & Vermut", en: "Sparkling Wine & Vermouth" }, producer: "Bayadera Group", logo: "/brands/marengo.png", logoBg: "" },
  { slug: "suvorov", key: "suvorov", origin: { tr: "Moldova", en: "Moldova" }, category: { tr: "Divin & Şarap", en: "Divin & Wine" }, producer: "KVINT", logo: "/brands/suvorov.png", logoBg: "bg-gray-900" },
  { slug: "cool", key: "cool", origin: { tr: "Türkiye", en: "Turkey" }, category: { tr: "Likör", en: "Liqueur" }, producer: "Brysis", logo: "/brands/cool.webp", logoBg: "", imageFit: "cover" },
  { slug: "cumbus", key: "cumbus", origin: { tr: "Türkiye", en: "Turkey" }, category: { tr: "Şarap", en: "Wine" }, producer: "Aykut Özkan Şarapçılık", logo: "/brands/aykut-ozkan.png", logoBg: "" },
  { slug: "isabey", key: "isabey", origin: { tr: "Türkiye", en: "Turkey" }, category: { tr: "Şarap", en: "Wine" }, producer: "Aykut Özkan Şarapçılık", logo: "/brands/aykut-ozkan.png", logoBg: "" },
];

export default async function Markalarimiz({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.brands as Record<string, unknown>;
  const brandList = (dict.brandList || {}) as Record<string, string>;
  const locale = params.locale;
  const lang = locale === "en" ? "en" : "tr";

  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t.heroEyebrow as string}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/${locale}/markalarimiz/${brand.slug}`}
                className="bg-gray-50 border border-gray-100 rounded-lg p-8 hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Brand Logo */}
                <div className={`relative aspect-[3/2] ${brand.logoBg || "bg-gray-50"} border border-gray-100 rounded-md overflow-hidden mb-6 ${brand.imageFit === "cover" ? "" : "flex items-center justify-center p-6"}`}>
                  {brand.imageFit === "cover" ? (
                    <Image
                      src={brand.logo}
                      alt={brandList[brand.key] || brand.slug}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Image
                      src={brand.logo}
                      alt={brandList[brand.key] || brand.slug}
                      width={200}
                      height={120}
                      className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-2">
                  {brandList[brand.key] || brand.slug}
                </h3>

                <p className="text-xs text-gray-400 mb-3">{brand.category[lang]}</p>

                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {brand.origin[lang]}
                  </span>
                </div>
              </Link>
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
