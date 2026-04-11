"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "ANASAYFA", href: "/" },
    { name: "HAKKIMIZDA", href: "/hakkimizda" },
    { name: "HİZMETLERİMİZ", href: "/hizmetlerimiz" },
    { name: "İLETİŞİM", href: "/iletisim" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center">
            <Logo width={150} variant="orange" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-semibold tracking-widest text-gray-700 hover:text-primary-700 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+902121234567"
              className="text-xs font-semibold tracking-wider text-gray-500 hover:text-primary-700 transition-colors"
            >
              +90 (212) 123 45 67
            </a>
            <Link href="/iletisim" className="btn-primary">
              İletişim
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
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
          <div className="md:hidden pb-6 pt-2 border-t border-gray-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-xs font-semibold tracking-widest text-gray-700 hover:text-primary-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 btn-primary text-center"
            >
              İletişim
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
