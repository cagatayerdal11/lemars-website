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

interface BrandListDict {
  [key: string]: string;
}

const brands = [
  { slug: "scotch-blue", key: "scotch-blue" },
  { slug: "hlibny-dar", key: "hlibny-dar" },
  { slug: "marengo", key: "marengo" },
  { slug: "suvorov", key: "suvorov" },
  { slug: "cool", key: "cool" },
  { slug: "cumbus", key: "cumbus" },
  { slug: "isabey", key: "isabey" },
];

export default function Header({
  locale,
  dict,
  brandList,
}: {
  locale: string;
  dict: NavDict;
  brandList: BrandListDict;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);

  const up = (s: string) => localeUpper(s, locale);

  const navigation = [
    { name: up(dict.home), href: `/${locale}` },
    { name: up(dict.about), href: `/${locale}/hakkimizda` },
    { name: up(dict.services), href: `/${locale}/hizmetlerimiz` },
    { name: up(dict.distributorships), href: `/${locale}/distributorluklerimiz` },
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

            {/* MARKALARIMIZ dropdown */}
            <div className="relative group">
              <Link
                href={`/${locale}/markalarimiz`}
                className="text-[11px] font-semibold tracking-wider text-gray-700 hover:text-primary-700 transition-colors duration-200 flex items-center gap-1"
              >
                {up(dict.brands)}
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                <div className="bg-white border border-gray-100 rounded-lg shadow-lg py-2 min-w-[200px]">
                  <Link
                    href={`/${locale}/markalarimiz`}
                    className="block px-4 py-2 text-xs font-semibold tracking-wider text-primary-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    {up(dict.brands)}
                  </Link>
                  {brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/${locale}/markalarimiz/${brand.slug}`}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary-700 hover:bg-gray-50 transition-colors"
                    >
                      {brandList[brand.key] || brand.slug}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href={`/${locale}/iletisim`} className="btn-primary text-xs px-5 py-2.5">
              {up(dict.contact)}
            </Link>
            <LanguageSwitcher locale={locale} />
            <div className="flex items-center gap-2.5 ml-1">
              <a href="https://instagram.com/lemarsgida" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:text-primary-800 transition-colors" aria-label="Instagram">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://wa.me/905553643434" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors" aria-label="WhatsApp">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
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

            {/* Mobile brands section */}
            <div>
              <button
                onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                className="w-full flex items-center justify-between min-h-[44px] py-3 text-xs font-semibold tracking-widest text-gray-700 hover:text-primary-700 transition-colors"
              >
                {up(dict.brands)}
                <svg className={`w-3 h-3 transition-transform ${mobileBrandsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileBrandsOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  <Link
                    href={`/${locale}/markalarimiz`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center min-h-[44px] py-2 text-xs font-semibold tracking-wider text-primary-700"
                  >
                    {up(dict.brands)}
                  </Link>
                  {brands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/${locale}/markalarimiz/${brand.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center min-h-[44px] py-2 text-sm text-gray-500 hover:text-primary-700 transition-colors"
                    >
                      {brandList[brand.key] || brand.slug}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/iletisim`}
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 btn-primary text-center"
            >
              {up(dict.contact)}
            </Link>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/lemarsgida" target="_blank" rel="noopener noreferrer" className="text-primary-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://wa.me/905553643434" target="_blank" rel="noopener noreferrer" className="text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
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
