import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";

export default async function Hakkimizda({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.about as Record<string, unknown>;
  const locale = params.locale;

  const competencies = [
    { title: t.comp1Title as string, desc: t.comp1Desc as string },
    { title: t.comp2Title as string, desc: t.comp2Desc as string },
    { title: t.comp3Title as string, desc: t.comp3Desc as string },
    { title: t.comp4Title as string, desc: t.comp4Desc as string },
    { title: t.comp5Title as string, desc: t.comp5Desc as string },
  ];

  const advantages = [
    { title: t.adv1Title as string, desc: t.adv1Desc as string },
    { title: t.adv2Title as string, desc: t.adv2Desc as string },
    { title: t.adv3Title as string, desc: t.adv3Desc as string },
    { title: t.adv4Title as string, desc: t.adv4Desc as string },
    { title: t.adv5Title as string, desc: t.adv5Desc as string },
    { title: t.adv6Title as string, desc: t.adv6Desc as string },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 py-24 md:py-32 overflow-hidden">
        <Image src="/istanbul.jpg" alt="" fill className="object-cover opacity-15" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.heroEyebrow as string}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
            {t.heroTitle as string}
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            {t.heroDesc as string}
          </p>
        </div>
      </section>

      {/* Experience + Competencies */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.expEyebrow as string}</p>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-8">
                {t.expTitle as string}
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed">
                <p>{t.expP1 as string}</p>
                <p>{t.expP2 as string}</p>
                <p>{t.expP3 as string}</p>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-2">{t.compEyebrow as string}</p>
              {competencies.map((item, i) => (
                <div key={i} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0">
                  <span className="text-primary-700 text-xs font-bold tracking-widest mt-1">{String(i + 1).padStart(2, '0')}</span>
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

      {/* Why LEMARS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.whyEyebrow as string}</p>
            <h2 className="text-4xl font-bold text-gray-900">{t.whyTitle as string}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {advantages.map((item, i) => (
              <div key={i} className="bg-white p-10">
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
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
