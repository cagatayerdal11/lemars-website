import Link from "next/link";
import Logo from "./Logo";

interface FooterDict {
  desc: string;
  tapdkNote: string;
  /** Belge/yetki bilgisi. "TAPDK" ibaresi kaldırıldı: TAPDK kapatılmış olup görevleri
   *  T.C. Tarım ve Orman Bakanlığı Tütün ve Alkol Dairesi Başkanlığına devredilmiştir. */
  licenseNote: string;
  pagesTitle: string;
  contactTitle: string;
  address: string;
  addressCity: string;
  email: string;
  phone: string;
  linkedin: string;
  legalNote: string;
  copyright: string;
  termsLink: string;
  privacyLink: string;
  disclaimerLink: string;
}

interface NavDict {
  home: string;
  about: string;
  services: string;
  distributorships: string;
  brands: string;
  contact: string;
}

export default function Footer({
  locale,
  dict,
  navDict,
}: {
  locale: string;
  dict: FooterDict;
  navDict: NavDict;
}) {
  const pages = [
    { name: navDict.home, href: `/${locale}` },
    { name: navDict.about, href: `/${locale}/hakkimizda` },
    { name: navDict.services, href: `/${locale}/hizmetlerimiz` },
    { name: navDict.distributorships, href: `/${locale}/distributorluklerimiz` },
    { name: navDict.brands, href: `/${locale}/markalarimiz` },
    { name: navDict.contact, href: `/${locale}/iletisim` },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="bg-primary-700 text-white text-center py-3 px-4">
        <p className="text-xs font-medium tracking-wider">
          {dict.tapdkNote}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Logo width={140} variant="light" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8">
              {dict.desc}
            </p>
            <p className="text-xs text-gray-600">
              {dict.licenseNote}
            </p>
          </div>

          <div>
            <h3 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              {dict.pagesTitle}
            </h3>
            <ul className="space-y-4">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-primary-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              {dict.contactTitle}
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://maps.app.goo.gl/7XnNs1arH4NeqCcp6" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                  {dict.address}
                  <br />{dict.addressCity}
                </a>
              </li>
              <li>
                <a href="mailto:info@lemarsgida.com" className="hover:text-primary-400 transition-colors">
                  {dict.email}
                </a>
              </li>
              <li>
                <a href="tel:+902128091883" className="hover:text-primary-400 transition-colors">
                  {dict.phone}
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/lemars-g%C4%B1da-i%C3%A7ecek/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary-400 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  {dict.linkedin}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
            <p className="text-xs text-gray-400 leading-relaxed text-center">
              <strong className="text-gray-300">{locale === "tr" ? "Yasal Bilgilendirme:" : "Legal Notice:"}</strong> {dict.legalNote}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              {dict.copyright.replace("{year}", new Date().getFullYear().toString())}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
              <Link href={`/${locale}/yasal/kullanim-kosullari`} className="text-xs text-gray-500 hover:text-primary-400 transition-colors">
                {dict.termsLink}
              </Link>
              <Link href={`/${locale}/yasal/kvkk`} className="text-xs text-gray-500 hover:text-primary-400 transition-colors">
                {dict.privacyLink}
              </Link>
              <Link href={`/${locale}/yasal/sorumluluk-reddi`} className="text-xs text-gray-500 hover:text-primary-400 transition-colors">
                {dict.disclaimerLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
