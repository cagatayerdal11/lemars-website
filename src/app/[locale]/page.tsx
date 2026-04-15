import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

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
    { number: 1800, suffix: "+", label: t.stat_sales as string },
    { number: 20, suffix: "+", label: t.stat_experience as string },
    { number: 400, suffix: "+", label: t.stat_products as string },
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
      <section className="bg-gray-900 overflow-hidden">
        <div className="relative">
          {/* Desktop: görsel sağ tarafta, absolute */}
          <div className="hidden md:block absolute inset-y-0 right-0 md:w-[55%] lg:w-[50%]">
            <Image
              src="/hero-truck.jpg"
              alt="LEMARS Gıda İçecek — Toptan Dağıtım"
              fill
              className="object-cover object-center"
              priority
              sizes="55vw"
              quality={95}
            />
            <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-gray-900 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-40">
            <div className="max-w-xl lg:max-w-lg">
              <ScrollReveal>
                <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6 md:mb-8">
                  {t.heroEyebrow as string}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 md:mb-8">
                  {t.heroTitle as string}
                  <br />
                  <span className="text-primary-500">{t.heroTitleAccent as string}</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-sm md:text-lg text-gray-400 leading-relaxed mb-8 md:mb-12 max-w-md">
                  {t.heroDesc as string}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/${locale}/iletisim`} className="btn-primary">
                    {t.ctaAbout as string}
                  </Link>
                  <Link href={`/${locale}/hizmetlerimiz`} className="btn-outline border-white/20 text-white hover:bg-white/10 hover:text-white">
                    {t.ctaServices as string}
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Mobil: görsel metin altında, net ve bağımsız blok */}
        <div className="relative md:hidden h-[280px]">
          <Image
            src="/hero-truck.jpg"
            alt="LEMARS Gıda İçecek — Toptan Dağıtım"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={95}
          />
        </div>

        {/* 3 Highlight — her zaman yan yana */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 grid grid-cols-3 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <span className="text-lg md:text-xl font-bold text-white">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </span>
                <span className="block text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            {features.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-white p-12 group hover:bg-gray-50 transition-colors duration-300">
                  <span className="text-primary-600 text-xs font-bold tracking-widest">{item.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-4 mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
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
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-3 gap-5">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 md:p-8 text-center border border-gray-100 rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-primary-700 mb-2">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-500 tracking-wider uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{t.servicesEyebrow as string}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.servicesTitle as string}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group">
                  <div className="w-full h-px bg-primary-700 mb-8 origin-left group-hover:scale-x-100 scale-x-50 transition-transform duration-500" />
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <Link href={`/${locale}/hizmetlerimiz`} className="text-primary-700 text-xs font-semibold tracking-wider uppercase hover:tracking-[0.2em] transition-all">
                    {t.svcMore as string} &rarr;
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
