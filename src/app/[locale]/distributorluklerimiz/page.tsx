import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";

const distributors = [
  { name: "Bayadera Group", logo: "/brands/marengo.png", logoBg: "", brands: { tr: "Marengo, Hlibny Dar", en: "Marengo, Hlibny Dar" } },
  { name: "Lotte Chilsung", logo: "/brands/scotch-blue.png", logoBg: "", brands: { tr: "Scotch Blue", en: "Scotch Blue" } },
  { name: "Suvorov Vin", logo: "/brands/suvorov.png", logoBg: "bg-gray-900", brands: { tr: "Suvorov Şarap", en: "Suvorov Wine" } },
  { name: "Enjoy Shot", logo: "/brands/enjoy.png", logoBg: "", brands: { tr: "Enjoy Shot", en: "Enjoy Shot" } },
  { name: "Aykut Özkan Şarapçılık", logo: "/brands/aykut-ozkan.png", logoBg: "", brands: { tr: "Cümbüş Şarap", en: "Cümbüş Wine" } },
  { name: "Hlibny Dar", logo: "/brands/hlibny-dar.png", logoBg: "", brands: { tr: "Hlibny Dar Votka", en: "Hlibny Dar Vodka" } },
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
              <div
                key={dist.name}
                className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <div className={`aspect-[3/2] ${dist.logoBg || "bg-gray-50"} flex items-center justify-center p-8`}>
                  <Image
                    src={dist.logo}
                    alt={dist.name}
                    width={220}
                    height={140}
                    className="object-contain max-h-full"
                  />
                </div>
                <div className="p-6 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{dist.name}</h3>
                  <p className="text-xs text-gray-400">{dist.brands[lang]}</p>
                </div>
              </div>
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
