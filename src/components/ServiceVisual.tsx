/**
 * LEMARS hizmet görselleştirmesi — 4 hizmet için markaya özel, animasyonlu SVG
 * paneller (stok fotoğraf yerine). Server-rendered, SMIL/CSS animasyon.
 * Koyu marka zemini + turuncu çizgi sanatı.
 */

type ServiceType = "horeca" | "retail" | "logistics" | "operations";

const ORANGE = "#E8611A";
const ORANGE_2 = "#f97316";
const ORANGE_3 = "#fdba74";

function Art({ type }: { type: ServiceType }) {
  if (type === "horeca") {
    // Mekânlara (restoran/otel/kafe) tedarik — çatı silüetleri + akan teslimat
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <line x1="0" y1="232" x2="400" y2="232" stroke="#334155" strokeWidth="1.5" />
        {/* venues */}
        {[
          { x: 70, w: 66, h: 84 },
          { x: 168, w: 74, h: 120 },
          { x: 274, w: 60, h: 96 },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={232 - b.h} width={b.w} height={b.h} fill="none" stroke="#475569" strokeWidth="1.6" rx="3" />
            {[0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={b.x + 10 + c * (b.w / 2 - 4)}
                  y={232 - b.h + 14 + r * 22}
                  width="10"
                  height="12"
                  fill={ORANGE}
                  opacity="0.55"
                >
                  <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.2s" begin={`${(i + r + c) * 0.4}s`} repeatCount="indefinite" />
                </rect>
              ))
            )}
          </g>
        ))}
        {/* hub + delivery pulses to each venue */}
        <circle cx="30" cy="232" r="7" fill={ORANGE} />
        {[103, 205, 304].map((tx, i) => (
          <circle key={i} r="3.5" fill={ORANGE_3}>
            <animateMotion dur="2.6s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={`M 30 232 L ${tx} 190`} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.6s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    );
  }

  if (type === "retail") {
    // Perakende dağıtım — raflar dolar
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {[60, 130, 200].map((y, row) => (
          <g key={row}>
            <line x1="60" y1={y + 34} x2="340" y2={y + 34} stroke="#475569" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5].map((c) => (
              <rect
                key={c}
                x={64 + c * 46}
                y={y + 34 - 10 - (c % 3) * 6}
                width="30"
                height={10 + (c % 3) * 6}
                rx="2"
                fill={c % 2 === 0 ? ORANGE : ORANGE_2}
                opacity="0"
              >
                <animate attributeName="opacity" values="0;0.75" dur="0.5s" begin={`${row * 0.5 + c * 0.12}s`} fill="freeze" repeatCount="1" />
                <animate attributeName="opacity" values="0.75;0.35;0.75" dur="4s" begin={`${row * 0.5 + c * 0.12 + 0.5}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>
        ))}
      </svg>
    );
  }

  if (type === "logistics") {
    // Lojistik — dalgalı rota + hareket eden araç ışığı
    const path = "M 24 250 C 120 250 90 150 200 150 C 310 150 280 60 376 60";
    return (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path d={path} fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
        <path d={path} fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="10 14" opacity="0.7">
          <animate attributeName="stroke-dashoffset" values="48;0" dur="1.3s" repeatCount="indefinite" />
        </path>
        {[24, 200, 376].map((cx, i) => (
          <circle key={i} cx={cx} cy={i === 1 ? 150 : i === 0 ? 250 : 60} r="6" fill="#0d1523" stroke={ORANGE} strokeWidth="2.5" />
        ))}
        <circle r="6" fill={ORANGE_3}>
          <animateMotion dur="4s" repeatCount="indefinite" path={path} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.55 1" />
        </circle>
      </svg>
    );
  }

  // operations — operasyon & tedarik koordinasyonu: bağlı süreç düğümleri + sıralı onay
  // ve akan koordinasyon. Satış/pazarlama/tanıtım grafiği KULLANILMAZ
  // (4250 s.K. m.6/1; Satış ve Sunum Yönetmeliği m.11 ve m.20).
  const steps = [80, 160, 240, 320];
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <line x1="80" y1="150" x2="320" y2="150" stroke="#334155" strokeWidth="2" />
      {steps.map((x, i) => (
        <g key={i}>
          <rect
            x={x - 26}
            y={124}
            width="52"
            height="52"
            rx="8"
            fill="#0d1523"
            stroke={i === steps.length - 1 ? ORANGE : "#475569"}
            strokeWidth="1.8"
          />
          <path
            d={`M ${x - 10} 150 l 6 7 l 13 -15`}
            fill="none"
            stroke={ORANGE}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="34"
            strokeDashoffset="34"
          >
            <animate attributeName="stroke-dashoffset" values="34;0" dur="0.5s" begin={`${i * 0.5}s`} fill="freeze" />
          </path>
        </g>
      ))}
      <circle r="4" fill={ORANGE_3}>
        <animateMotion dur="3s" repeatCount="indefinite" path="M 80 150 L 320 150" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function ServiceVisual({
  type,
  number,
  label,
}: {
  type: ServiceType;
  number: string;
  label: string;
}) {
  return (
    <div className="relative aspect-square max-h-96 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-[#0d1523] border border-white/5">
      <div className="absolute inset-0 top-6 bottom-16">
        <Art type={type} />
      </div>
      <span
        className="absolute top-4 right-5 text-6xl font-extrabold text-white/[0.06] select-none"
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-16 flex items-center justify-center bg-gradient-to-t from-[#0d1523] to-transparent">
        <p className="text-white text-sm tracking-[0.2em] uppercase font-medium">{label}</p>
      </div>
    </div>
  );
}
