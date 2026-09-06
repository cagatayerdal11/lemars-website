import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import PartnerWorldMap from "@/components/PartnerWorldMap";

/**
 * Distribütörlüklerimiz — iş ortağı firmaların NÖTR kurumsal listesi.
 *
 * Dayanak ve sınırlar:
 *  - Satış ve Sunum Yönetmeliği m.11/4, 1. cümle: kurumsal internet sitesinde marka
 *    adlarına ancak "reklam ve ürün tanıtımı yapılmaksızın ve görsel unsurlar
 *    kullanmaksızın liste halinde" yer verilebilir.
 *  - 4250 s.K. m.6/1, 1. cümle: her ne surette olursa olsun reklam ve tüketicilere
 *    yönelik tanıtım yasağı.
 *  - 4250 s.K. m.6/1, 7584/2026 ile eklenen cümle: alkollü içki üretici/ithalatçı/
 *    pazarlayan FİRMALARIN isim, marka, logo ve amblemleri de yasak kapsamına
 *    alınmıştır (lafzen fiziksel mekânlar sayılmıştır; internet sitesi bakımından
 *    kapsam tartışmalıdır — bu nedenle firma logoları da muhafazakâr biçimde
 *    kaldırılmıştır).
 *
 * ÜÇÜNCÜ İNCELEME (6 Eylül 2026) — MARKA LİSTESİ SAYFASI TAMAMEN KALDIRILDI:
 * /markalarimiz sayfası bu sayfayla içerik olarak örtüştüğü için silinmiş ve kalıcı
 * olarak buraya yönlendirilmiştir. Sonuç olarak alkollü içki ÜRÜN MARKASI ADLARI
 * artık sitenin hiçbir yerinde yayımlanmamaktadır. m.11/4'ün tanıdığı "ürünler
 * bölümünde düz metin marka listesi" iznine dayanılmamakta, daha dar bir çizgi
 * benimsenmektedir. Bu sayfada yalnızca ÜRETİCİ/TEDARİKÇİ FİRMA UNVANI ile nötr
 * künye bilgisi yer alır.
 *
 * Bu sayfada BULUNMAZ: firma/marka logosu, ürün görseli, ürün markası adı, ürün övgüsü
 * ("prestijli", "köklü", "yüksek segment" vb.), tadım anlatımı, fiyat bilgisi.
 */

type Partner = {
  /** Yalnızca ÜRETİCİ/TEDARİKÇİ FİRMA UNVANI. Ürün markası adı tutulmaz (m.11/4). */
  name: string;
  /** Yalnızca doğrulanabilir, nötr kurumsal künye bilgisi. Ürün/marka övgüsü içermez. */
  factsTr: string;
  factsEn: string;
};

const partners: Partner[] = [
  {
    name: "Ottakringer Brauerei",
    factsTr: "Viyana, Avusturya merkezli bira üreticisi. 1837'den beri faaliyet göstermektedir.",
    factsEn: "Beer producer based in Vienna, Austria. Operating since 1837.",
  },
  {
    name: "Bayadera Group",
    factsTr: "Ukrayna merkezli içecek üreticisi ve dağıtım grubu.",
    factsEn: "Ukraine-based beverage producer and distribution group.",
  },
  {
    name: "Lotte Chilsung Beverage",
    factsTr: "Güney Kore merkezli içecek üreticisi.",
    factsEn: "South Korea-based beverage producer.",
  },
  {
    name: "Aykut Özkan Şarapçılık",
    factsTr: "Çal / Denizli merkezli üretici firma.",
    factsEn: "Producer based in Çal / Denizli, Türkiye.",
  },
  {
    name: "KVINT (Tiraspol Şarap ve İçki Fabrikası)",
    factsTr: "Moldova merkezli üretici firma.",
    factsEn: "Moldova-based producer.",
  },
  {
    name: "Brysis İçecek Sanayi ve Ticaret A.Ş.",
    factsTr: "Kırklareli'nde üretim tesisi bulunan Türkiye merkezli içecek üreticisi.",
    factsEn: "Türkiye-based beverage producer with a production facility in Kırklareli.",
  },
];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale as Locale);
  const s = (dict.seo as Record<string, { title: string; description: string }>).distributorships;
  return buildMetadata({
    locale: params.locale,
    path: "/distributorluklerimiz",
    title: s.title,
    description: s.description,
  });
}

export default async function Distributorluklerimiz({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const t = dict.distributorships as Record<string, string>;
  const locale = params.locale;
  const lang = locale === "en" ? "en" : "tr";

  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32 hero-glow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t.heroEyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl break-words">
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

          <ul className="border-t border-gray-200">
            {partners.map((p) => (
              <li key={p.name} className="border-b border-gray-200 py-6">
                <h3 className="text-gray-900 font-semibold text-base">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{lang === "en" ? p.factsEn : p.factsTr}</p>
              </li>
            ))}
          </ul>

          {/* Marka adları burada YAYIMLANMAZ; yalnızca ürünler bölümünde (m.11/4). */}
          <p className="mt-10 text-xs text-gray-400 leading-relaxed">{t.brandsNote}</p>

          <div className="mt-14 pt-10 border-t border-gray-100">
            <p className="text-gray-500 text-sm mb-6">{t.ctaDesc}</p>
            <Link href={`/${locale}/iletisim`} className="btn-primary">
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Sayfanın en altı: iş ortaklarının bulunduğu ülkeleri gösteren dünya haritası.
          Yalnızca ülke adları — marka, ürün veya logo görseli içermez. */}
      <PartnerWorldMap locale={lang} />
    </>
  );
}
