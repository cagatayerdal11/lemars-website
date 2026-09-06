import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";

/**
 * Markalarımız — DÜZ METİN MARKA LİSTESİ.
 *
 * Dayanak: Tütün Mamulleri ve Alkollü İçkilerin Satışına ve Sunumuna İlişkin Usul ve
 * Esaslar Hakkında Yönetmelik m.11/4, 1. cümle (Ek:RG-18/9/2013-28769):
 *   "Alkollü içki üretici, ithalatçı veya toptan satıcıları, ürettikleri, ithal ettikleri
 *    veya pazarladıkları ürünlerin isimlerine/markalarına Kurumsal internet sitelerinin
 *    ürünler bölümünde, reklam ve ürün tanıtımı yapılmaksızın ve görsel unsurlar
 *    kullanmaksızın liste halinde yer verebilirler."
 *
 * Bu nedenle bu sayfada BULUNMAZ: marka logosu, ürün/ambalaj görseli, kategori/menşe
 * rozeti, tadım-aroma anlatımı, fiyat bilgisi ve marka detay sayfasına bağlantı.
 * Ürün görseli ve teknik bilgi, aynı fıkranın 2-3. cümleleri uyarınca ancak kullanıcı
 * adı+parola korumalı, satış belgesi sahiplerine açık B2B alanda yayımlanabilir —
 * böyle bir alan bu sitede KURULMAMIŞTIR.
 */

// Yalnızca marka adı anahtarları. Görsel, kategori, menşe ve üretici bilgisi tutulmaz.
const BRAND_KEYS = [
  "ottakringer",
  "scotch-blue",
  "hlibny-dar",
  "marengo",
  "suvorov",
  "cool",
  "cumbus",
  "isabey",
] as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale as Locale);
  const s = (dict.seo as Record<string, { title: string; description: string }>).brands;
  return buildMetadata({ locale: params.locale, path: "/markalarimiz", title: s.title, description: s.description });
}

export default async function Markalarimiz({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.brands as Record<string, string>;
  const brandList = (dict.brandList || {}) as Record<string, string>;
  const locale = params.locale;

  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32 hero-glow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t.heroEyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl break-words">
            {t.heroTitle}
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">{t.heroDesc}</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {t.sectionEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sectionTitle}</h2>
            <p className="text-gray-500 mt-4">{t.sectionDesc}</p>
          </div>

          {/* Düz metin liste — görsel unsur, bağlantı ve tanıtım metni içermez. */}
          <ul className="border-t border-gray-200">
            {BRAND_KEYS.map((key) => (
              <li
                key={key}
                className="border-b border-gray-200 py-4 text-gray-900 text-base font-medium"
              >
                {brandList[key] || key}
              </li>
            ))}
          </ul>

          <p className="mt-10 text-xs text-gray-400 leading-relaxed">{t.listNotice}</p>

          <div className="mt-14 pt-10 border-t border-gray-100">
            <p className="text-gray-500 text-sm mb-6">{t.ctaDesc}</p>
            <Link href={`/${locale}/iletisim`} className="btn-primary">
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
