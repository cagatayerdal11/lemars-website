"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { localeUpper } from "@/i18n/utils";

interface NavDict {
  home: string;
  about: string;
  services: string;
  distributorships: string;
  brands: string;
  contact: string;
}

// NOT: Marka açılır menüsü kaldırıldı. Marka adları yalnızca /markalarimiz sayfasında,
// Satış ve Sunum Yönetmeliği m.11/4 uyarınca düz metin liste olarak yayımlanır;
// navigasyonda marka bazlı bağlantı ve marka detay sayfası bulunmaz.
// NOT: Instagram ve WhatsApp kısayolları başlıktan kaldırıldı (4250 s.K. m.6/1 ve
// Yön. m.11 kapsamında tüketiciye yönelik tanıtım/satışa teşvik bağlantısı oluşturmamak için).
// Kurumsal LinkedIn ve harita (fiziki adres) bilgilendirme amaçlı korunur.

export default function Header({
  locale,
  dict,
}: {
  locale: string;
  dict: NavDict;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const up = (s: string) => localeUpper(s, locale);

  const navigation = [
    { name: up(dict.home), href: `/${locale}` },
    { name: up(dict.about), href: `/${locale}/hakkimizda` },
    { name: up(dict.services), href: `/${locale}/hizmetlerimiz` },
    { name: up(dict.distributorships), href: `/${locale}/distributorluklerimiz` },
    { name: up(dict.brands), href: `/${locale}/markalarimiz` },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href={`/${locale}`} className="flex items-center">
            <Logo width={150} variant="orange" />
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[11px] font-semibold tracking-wider text-gray-700 hover:text-primary-700 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href={`/${locale}/iletisim`} className="btn-primary text-xs px-5 py-2.5">
              {up(dict.contact)}
            </Link>
            <LanguageSwitcher locale={locale} />
            <div className="flex items-center gap-2.5 ml-1">
              <a href="https://www.linkedin.com/company/lemars-g%C4%B1da-i%C3%A7ecek/" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-[#004182] transition-colors" aria-label="LinkedIn">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://maps.app.goo.gl/7XnNs1arH4NeqCcp6" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600 transition-colors" aria-label="Google Maps">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
              </a>
            </div>
            <a href="tel:+902128091883" className="text-xs font-semibold text-gray-500 hover:text-primary-700 transition-colors whitespace-nowrap">
              +90 (212) 809 18 83
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Menü"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-gray-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[44px] py-3 text-xs font-semibold tracking-widest text-gray-700 hover:text-primary-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href={`/${locale}/iletisim`}
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 btn-primary text-center"
            >
              {up(dict.contact)}
            </Link>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/lemars-g%C4%B1da-i%C3%A7ecek/" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="tel:+902128091883" className="text-xs font-semibold text-gray-500">+90 (212) 809 18 83</a>
              </div>
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
