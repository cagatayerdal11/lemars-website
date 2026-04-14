import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";

export default async function Home({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.home as Record<string, unknown>;
  const locale = params.locale;

  const features = [
    { title: t.feat1Title as string, desc: t.feat1Desc as string, num: "01" },
    { title: t.feat2Title as string, desc: t.feat2Desc as string, num: "02" },
    { title: t.feat3Title as string, desc: t.feat3Desc as string, num: "03" },
  ];

  const stats = [
    { number: "1800+", label: t.stat_sales as string },
    { number: "20+", label: t.stat_experience as string },
    { number: "400+", label: t.stat_products as string },
  ];

  const services = [
    { title: t.svc1Title as string, desc: t.svc1Desc as string },
    { title: t.svc2Title as string, desc: t.svc2Desc as string },
    { title: t.svc3Title as string, desc: t.svc3Desc as string },
    { title: t.svc4Title as string, desc: t.svc4Desc as string },
  ];

  const aboutTitleLines = (t.aboutTitle as string).split("\n");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 overflow-hidden">
        {/* Sağ tarafta görsel — masaüstünde yarım, mobilde alt kısımda */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[55%] lg:w-[50%]">
          <Image
            src="/hero-truck.jpg"
            alt="LeMars Gıda İçecek — Toptan Dağıtım"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            quality={95}
          />
          {/* Sol kenarda dar geçiş — sadece metin/görsel birleşim noktası */}
          <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-gray-900 to-transparent" />
          {/* Mobilde üstte dar geçiş — metin okunabilirliği için */}
          <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-gray-900 to-transparent md:hidden" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 md:py-40">
          <div className="max-w-xl lg:max-w-lg">
            <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-8">
              {t.heroEyebrow as string}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
              {t.heroTitle as string}
              <br />
              <span className="text-primary-500">{t.heroTitleAccent as string}</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-12 max-w-md">
              {t.heroDesc as string}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/iletisim`} className="btn-primary">
                {t.ctaAbout as string}
              </Link>
              <Link href={`/${locale}/hizmetlerimiz`} className="btn-outline border-white/20 text-white hover:bg-white/10 hover:text-white">
                {t.ctaServices as string}
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            {features.map((item, i) => (
              <div key={i} className="bg-white p-12 group hover:bg-gray-50 transition-colors duration-300">
                <span className="text-primary-600 text-xs font-bold tracking-widest">{item.num}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                {t.aboutEyebrow as string}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                {aboutTitleLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < aboutTitleLines.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-10">
                {t.aboutDesc as string}
              </p>
              <Link
                href={`/${locale}/hakkimizda`}
                className="inline-flex items-center gap-3 text-primary-700 text-sm font-semibold tracking-wider uppercase hover:gap-5 transition-all duration-300"
              >
                {t.aboutMore as string}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 md:p-8 text-center border border-gray-100 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">{stat.number}</div>
                  <div className="text-[10px] md:text-xs text-gray-500 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.servicesEyebrow as string}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.servicesTitle as string}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((item, i) => (
              <div key={i} className="group">
                <div className="w-full h-px bg-primary-700 mb-8 origin-left group-hover:scale-x-100 scale-x-50 transition-transform duration-500" />
                <h3 className="text-lg font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <Link href={`/${locale}/hizmetlerimiz`} className="text-primary-700 text-xs font-semibold tracking-wider uppercase hover:tracking-[0.2em] transition-all">
                  {t.svcMore as string} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.ctaEyebrow as string}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {(t.ctaTitle as string).split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            {t.ctaDesc as string}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/iletisim`} className="btn-white">{t.ctaButton as string}</Link>
            <a href="tel:+902128091883" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-md hover:bg-white/10 transition-all text-sm uppercase tracking-wider">
              {t.ctaPhone as string}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
