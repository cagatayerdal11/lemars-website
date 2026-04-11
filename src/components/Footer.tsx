import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* TAPDK Uyari Bandi */}
      <div className="bg-primary-700 text-white text-center py-3 px-4">
        <p className="text-sm font-medium">
          Alkol, sagliga zararlidir. 18 yasindan kucuklere alkol satisi
          yapilmasi yasaktir.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Sirket Bilgisi */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo width={140} variant="light" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              Istanbul Avrupa Yakasi&apos;nda alkolu icecekler alaninda toptan
              satis ve dagitim hizmeti sunan firmamiz, restoran, bar ve
              perakende satis noktalarina hizli ve guvenilir tedarik cozumleri
              saglamaktadir.
            </p>
            <p className="text-xs text-gray-500">
              TAPDK Lisans Bilgisi: Toptan Alkolu Icecek Satis Belgesi
            </p>
          </div>

          {/* Hizli Linkler */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hizli Erisim</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  Hakkimizda
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  Iletisim
                </Link>
              </li>
            </ul>
          </div>

          {/* Iletisim */}
          <div>
            <h3 className="text-white font-semibold mb-4">Iletisim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-400">
                  Cihangir, Guvercin Cd. No: 2/90-91
                  <br />
                  34310 Avcilar/Istanbul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@lemars.com.tr" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  info@lemars.com.tr
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+902121234567" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                  +90 (212) 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Cizgi */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} LeMars Gida Icecek. Tum haklari saklidir.
            </p>
            <span className="text-xs text-gray-500">
              TAPDK uyarisi: Alkolu iceceklerin reklamina iliskin mevzuat
              hukumlerine uygun olarak hazirlanmistir.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
