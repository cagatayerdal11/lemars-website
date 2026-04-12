import type { Metadata } from "next";
import { getDictionary, Locale, isValidLocale } from "@/i18n/config";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TAPDKBanner from "@/components/TAPDKBanner";
import CookieBanner from "@/components/CookieBanner";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : "tr";
  const dict = await getDictionary(locale as Locale);
  const meta = dict.meta as { title: string; description: string };

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = isValidLocale(params.locale) ? params.locale : "tr";
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

  return (
    <AgeGate dict={ageGateDict}>
      <TAPDKBanner dict={tapdkDict} />
      <Header locale={locale} dict={navDict} brandList={brandList} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} dict={footerDict} navDict={navDict} />
      <CookieBanner dict={cookieDict} locale={locale} />
    </AgeGate>
  );
}
