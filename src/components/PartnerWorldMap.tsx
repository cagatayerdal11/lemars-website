import type { Locale } from "@/i18n/config";
import { LAND_PATH, COUNTRY_PATHS, COUNTRY_CENTROIDS, MAP_W, MAP_H } from "./world-map-paths";

/**
 * Distribütörlük ağı dünya haritası — iş ortağı üretici/tedarikçi firmaların
 * bulunduğu ÜLKELERİ gösterir.
 *
 * MEVZUAT SINIRI (bilerek dar tutulmuştur):
 *  - Haritada yalnızca ÜLKE adları yer alır.
 *  - Alkollü içki markası, ürün/ambalaj görseli, logo, amblem, tadım anlatımı,
 *    fiyat veya kampanya bilgisi BULUNMAZ.
 *  Dayanak: Satış ve Sunum Yönetmeliği m.11/4 c.1 (kurumsal sitede markalara ancak
 *  "reklam ve ürün tanıtımı yapılmaksızın ve görsel unsurlar kullanmaksızın liste
 *  halinde" yer verilebilir) ve 4250 s.K. m.6/1 c.1 (reklam ve tüketicilere yönelik
 *  tanıtım yasağı). Coğrafi kapsam bilgisi kurumsal bilgilendirmedir.
 *
 * Teknik: server component, animasyon ve harita kütüphanesi YOK. Ülke sınırları
 * Natural Earth 110m verisinden author-time üretilip statik SVG yolu olarak
 * gömülmüştür (bkz. world-map-paths.ts). Küçük ekranda harita içi etiketler CSS ile
 * gizlenir, altta HTML liste gösterilir.
 */

/** Etiket sırası yukarıdan aşağıya — ülke merkezlerinin enlemine göre artan,
 *  böylece kılavuz çizgileri birbirini kesmez. */
const ORDER = ["ua", "at", "md", "tr", "kr"] as const;
const HUB = "tr";

// Tuval: harita 0–1000, etiket sütunu 1046'dan başlar.
const VB_W = 1360;
const LABEL_X = 1046;
const GUTTER_X = 1030;
const FIRST_Y = 130;
const ROW_GAP = 48;

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    desc: string;
    note: string;
    countries: Record<string, string>;
    hubSuffix: string;
    alt: string;
  }
> = {
  tr: {
    eyebrow: "Küresel Ağımız",
    title: "Distribütörlüklerimizin yayıldığı ülkeler",
    desc: "İş ortağı üretici ve tedarikçi firmalarımız beş ülkede yer alır. Dağıtım operasyonumuz İstanbul Avrupa Yakası merkezlidir.",
    note: "Bu harita yalnızca iş ortağı firmalarımızın bulunduğu ülkeleri gösteren kurumsal bilgilendirmedir; ürün, marka, görsel veya tanıtım unsuru içermez.",
    countries: { ua: "Ukrayna", at: "Avusturya", md: "Moldova", tr: "Türkiye", kr: "Güney Kore" },
    hubSuffix: " — merkez",
    alt: "Dünya haritası: distribütörlük ağımızın yayıldığı ülkeler — Ukrayna, Avusturya, Moldova, Güney Kore ve merkezimizin bulunduğu Türkiye.",
  },
  en: {
    eyebrow: "Our Global Network",
    title: "Countries our distributorships span",
    desc: "Our partner producers and suppliers are located in five countries. Our distribution operation is based on the European side of Istanbul.",
    note: "This map is corporate information showing only the countries where our partner companies are located; it contains no product, brand, image or promotional element.",
    countries: { ua: "Ukraine", at: "Austria", md: "Moldova", tr: "Türkiye", kr: "South Korea" },
    hubSuffix: " — headquarters",
    alt: "World map: countries our distributorship network spans — Ukraine, Austria, Moldova, South Korea and Türkiye, where we are based.",
  },
};

/**
 * Kılavuz çizgisi: ülke merkezinden kısa bir çıkış, ardından etiket satırına düz
 * diyagonal, sonra etikete kısa yatay giriş. Etiketler enlem sırasına göre
 * dizildiği için diyagonaller birbirini kesmez.
 */
function leaderPath(cx: number, cy: number, labelY: number) {
  const stub = cx + 10;
  return `M${cx} ${cy} L${stub} ${cy} L${MAP_W} ${labelY} L${GUTTER_X} ${labelY}`;
}

export default function PartnerWorldMap({ locale }: { locale: Locale }) {
  const t = COPY[locale] ?? COPY.tr;

  const rows = ORDER.map((key, i) => ({
    key,
    labelY: FIRST_Y + i * ROW_GAP,
    centroid: COUNTRY_CENTROIDS[key],
    isHub: key === HUB,
  }));

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-gray-500 mt-4 max-w-2xl">{t.desc}</p>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200 bg-[#f8f9fa]">
          <svg
            viewBox={`0 0 ${VB_W} ${MAP_H}`}
            className="w-full h-auto block"
            role="img"
            aria-label={t.alt}
          >
            <title>{t.title}</title>
            <desc>{t.alt}</desc>

            {/* Harita içi etiketler yalnızca geniş ekranda; küçükte altta HTML liste var. */}
            <style>{`@media (max-width:767px){.lm-labels{display:none}}`}</style>

            <rect width={VB_W} height={MAP_H} fill="#f8f9fa" />

            {/* Vurgulanmayan ülkeler */}
            <path d={LAND_PATH} fill="#e2e5e9" fillRule="evenodd" aria-hidden="true" />

            {/* İş ortağı ülkeleri */}
            {ORDER.map((key) => (
              <path
                key={key}
                d={COUNTRY_PATHS[key]}
                fill={key === HUB ? "#c2410c" : "#E8611A"}
                aria-hidden="true"
              />
            ))}

            <g className="lm-labels">
              <g fill="none" stroke="#E8611A" strokeWidth="1.1" strokeOpacity="0.55">
                {rows.map((r) => (
                  <path key={r.key} d={leaderPath(r.centroid[0], r.centroid[1], r.labelY)} />
                ))}
              </g>

              {/* Moldova ve Avusturya dünya ölçeğinde neredeyse görünmez; kılavuz
                  çizgisinin başladığı yeri işaretlemek için nokta eklenir. */}
              {rows.map((r) => (
                <circle
                  key={r.key}
                  cx={r.centroid[0]}
                  cy={r.centroid[1]}
                  r={r.isHub ? 5 : 4}
                  fill={r.isHub ? "#c2410c" : "#E8611A"}
                />
              ))}

              <g fontFamily="var(--font-poppins), system-ui, sans-serif" fontSize="19">
                {rows.map((r) => (
                  <text
                    key={r.key}
                    x={LABEL_X}
                    y={r.labelY + 6}
                    fill={r.isHub ? "#c2410c" : "#1f2937"}
                    fontWeight={r.isHub ? 600 : 400}
                  >
                    {t.countries[r.key]}
                    {r.isHub ? t.hubSuffix : ""}
                  </text>
                ))}
              </g>
            </g>
          </svg>
        </div>

        {/* Küçük ekran listesi — harita içi etiketlerin okunabilir karşılığı. */}
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 md:hidden">
          {rows.map((r) => (
            <li key={r.key} className="flex items-center gap-2 text-sm text-gray-700">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: r.isHub ? "#c2410c" : "#E8611A" }}
                aria-hidden="true"
              />
              <span className={r.isHub ? "font-semibold text-primary-800" : ""}>
                {t.countries[r.key]}
                {r.isHub ? t.hubSuffix : ""}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-gray-400 leading-relaxed max-w-3xl">{t.note}</p>
      </div>
    </section>
  );
}
