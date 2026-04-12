import Link from "next/link";
import { getDictionary, Locale } from "@/i18n/config";

export default async function Distributorluklerimiz({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.distributorships as Record<string, unknown>;
  const locale = params.locale;

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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <p className="text-gray-300 text-sm font-medium text-center">
                  {t.placeholder as string}
                </p>
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
