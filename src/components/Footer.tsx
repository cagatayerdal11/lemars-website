import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="bg-primary-700 text-white text-center py-3 px-4">
        <p className="text-xs font-medium tracking-wider">
          Alkol sağlığa zararlıdır. 18 yaşından küçüklere alkol satışı yapılması yasaktır.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <Logo width={140} variant="light" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8">
              İstanbul Avrupa Yakası&apos;nda alkollü içecekler alanında toptan
              satış ve dağıtım hizmeti sunan firmamız, restoran, bar ve
              perakende satış noktalarına güvenilir tedarik çözümleri sağlar.
            </p>
            <p className="text-xs text-gray-600">
              TAPDK Lisans Bilgisi: Toptan Alkollü İçecek Satış Belgesi
            </p>
          </div>

          <div>
            <h3 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Sayfalar
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Anasayfa", href: "/" },
                { name: "Hakkımızda", href: "/hakkimizda" },
                { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
                { name: "İletişim", href: "/iletisim" },
              ].map((item) => (
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
              İletişim
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://maps.app.goo.gl/7XnNs1arH4NeqCcp6" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                  Cihangir, Güvercin Cd. No: 2/90-91
                  <br />34310 Avcılar/İstanbul
                </a>
              </li>
              <li>
                <a href="mailto:info@lemars.com.tr" className="hover:text-primary-400 transition-colors">
                  info@lemars.com.tr
                </a>
              </li>
              <li>
                <a href="tel:+902121234567" className="hover:text-primary-400 transition-colors">
                  +90 (212) 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} LeMars Gıda İçecek. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-600">
            TAPDK mevzuatına uygun olarak hazırlanmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
}
