import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, Locale, isValidLocale } from "@/i18n/config";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TAPDKBanner from "@/components/TAPDKBanner";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";
import ScrollProgress from "@/components/ScrollProgress";
import MobileActionBar from "@/components/MobileActionBar";
import MarsCursor from "@/components/MarsCursor";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : "tr";
  const dict = await getDictionary(locale as Locale);
  const meta = dict.meta as { title: string; description: string };

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "LEMARS",
    title: meta.title,
    description: meta.description,
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: "LEMARS",
      locale: locale === "en" ? "en_US" : "tr_TR",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "LEMARS Gıda İçecek" }],
    },
    twitter: {
      card: "summary_large_image",
      images: [OG_IMAGE],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale;
  const dict = await getDictionary(locale as Locale);

  const ageGateDict = dict.ageGate as {
    title: string;
    subtitle: string;
    warning: string;
    warningLine2: string;
    question: string;
    yes: string;
    no: string;
    deniedTitle: string;
    deniedText: string;
    deniedLegal: string;
    goBack: string;
    legalNote: string;
    birthYearNotSaved: string;
  };

  const cookieDict = dict.cookie as {
    message: string;
    accept: string;
    reject: string;
    learnMore: string;
  };

  const tapdkDict = dict.tapdk as { banner: string };

  const navDict = dict.nav as {
    home: string;
    about: string;
    services: string;
    distributorships: string;
    brands: string;
    contact: string;
  };

  const brandList = (dict.brandList || {}) as Record<string, string>;

  const footerDict = dict.footer as {
    desc: string;
    tapdkNote: string;
    pagesTitle: string;
    contactTitle: string;
    address: string;
    addressCity: string;
    email: string;
    phone: string;
    instagram: string;
    linkedin: string;
    legalNote: string;
    copyright: string;
    termsLink: string;
    privacyLink: string;
    disclaimerLink: string;
  };

  const isEn = locale === "en";
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LEMARS Gıda İçecek",
    legalName:
      "LEMARS GIDA İÇECEK SATIŞ PAZARLAMA SANAYİ TİCARET LİMİTED ŞİRKETİ",
    description: isEn
      ? "LEMARS is a TAPDK-licensed B2B wholesale food & beverage distributor on the European side of Istanbul, Turkey. With 20+ years of experience it supplies businesses — restaurants, bars, hotels, cafés and retail outlets — with sales, supply, logistics and distribution services. It does not sell to end consumers."
      : "LEMARS, İstanbul Avrupa Yakası'nda faaliyet gösteren TAPDK lisanslı B2B toptan gıda ve içecek dağıtım şirketidir. 20+ yıllık deneyimle restoran, bar, otel, kafe ve perakende satış noktalarına satış, tedarik, lojistik ve dağıtım hizmeti sunar; tüketiciye perakende satış yapmaz.",
    slogan: isEn
      ? "Reliable Supply, Strong Partnership."
      : "Güvenilir Tedarik, Güçlü Ortaklık.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-transparent.png`,
    image: `${SITE_URL}/logo-transparent.png`,
    email: "info@lemarsgida.com",
    telephone: "+902128091883",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cihangir Mah. Güvercin Cd. No: 2/90-91",
      addressLocality: "Avcılar",
      addressRegion: "İstanbul",
      postalCode: "34310",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: isEn
        ? "European side of Istanbul, Turkey"
        : "İstanbul Avrupa Yakası",
    },
    knowsAbout: isEn
      ? [
          "Wholesale beverage distribution",
          "HoReCa supply",
          "B2B food and beverage logistics",
          "Beverage distributorship",
        ]
      : [
          "Toptan içecek dağıtımı",
          "HoReCa tedarik",
          "B2B gıda ve içecek lojistiği",
          "İçecek distribütörlüğü",
        ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+902128091883",
      email: "info@lemarsgida.com",
      contactType: "sales",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://instagram.com/lemarsgida",
      "https://www.linkedin.com/company/lemars-g%C4%B1da-i%C3%A7ecek/",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LEMARS Gıda İçecek",
    url: SITE_URL,
    inLanguage: locale === "en" ? "en-US" : "tr-TR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <MarsCursor />
      <AgeGate dict={ageGateDict}>
        <GoogleAnalytics />
        <AnalyticsClickTracker />
        <ScrollProgress />
        <TAPDKBanner dict={tapdkDict} />
        <Header locale={locale} dict={navDict} brandList={brandList} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={footerDict} navDict={navDict} />
        <CookieBanner dict={cookieDict} locale={locale} />
        <WhatsAppButton />
        <MobileActionBar locale={locale} />
      </AgeGate>
    </>
  );
}
