import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";

export default async function Hizmetlerimiz({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.services as Record<string, unknown>;
  const locale = params.locale;

  const s1Items = t.s1Items as string[];
  const s2Items = t.s2Items as string[];
  const s3Items = t.s3Items as string[];
  const s4Items = t.s4Items as string[];
  const categories = t.categories as string[];

  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.heroEyebrow as string}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">{t.heroTitle as string}</h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            {t.heroDesc as string}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">
          {/* Service 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.s1Eyebrow as string}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">{t.s1Title as string}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{t.s1Desc as string}</p>
              <ul className="space-y-3">
                {s1Items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-700 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square max-h-96 rounded-lg overflow-hidden">
              <Image src="/delivery-truck.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary-500 text-6xl font-bold mb-2">01</p>
                  <p className="text-white text-sm tracking-[0.2em] uppercase">HoReCa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-square max-h-96 rounded-lg overflow-hidden">
              <Image src="/hero-warehouse.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary-500 text-6xl font-bold mb-2">02</p>
                  <p className="text-white text-sm tracking-[0.2em] uppercase">{locale === "tr" ? "Perakende" : "Retail"}</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.s2Eyebrow as string}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">{t.s2Title as string}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{t.s2Desc as string}</p>
              <ul className="space-y-3">
                {s2Items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-700 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.s3Eyebrow as string}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">{t.s3Title as string}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{t.s3Desc as string}</p>
              <ul className="space-y-3">
                {s3Items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-700 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square max-h-96 rounded-lg overflow-hidden">
              <Image src="/logistics.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary-500 text-6xl font-bold mb-2">03</p>
                  <p className="text-white text-sm tracking-[0.2em] uppercase">{locale === "tr" ? "Lojistik" : "Logistics"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-square max-h-96 rounded-lg overflow-hidden">
              <Image src="/customer-handshake.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary-500 text-6xl font-bold mb-2">04</p>
                  <p className="text-white text-sm tracking-[0.2em] uppercase">{locale === "tr" ? "Pazarlama & Dagitim" : "Marketing & Distribution"}</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.s4Eyebrow as string}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">{t.s4Title as string}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{t.s4Desc as string}</p>
              <ul className="space-y-3">
                {s4Items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-700 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.productsEyebrow as string}</p>
            <h2 className="text-4xl font-bold text-gray-900">{t.productsTitle as string}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
            {categories.map((item, i) => (
              <div key={i} className="bg-white p-8 text-center hover:bg-gray-50 transition-colors">
                <span className="text-sm font-semibold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-gray-400">
            {t.productsNote as string}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ctaTitle as string}</h2>
          <p className="text-gray-400 mb-10">{t.ctaDesc as string}</p>
          <Link href={`/${locale}/iletisim`} className="btn-white">{t.ctaButton as string}</Link>
        </div>
      </section>
    </>
  );
}
