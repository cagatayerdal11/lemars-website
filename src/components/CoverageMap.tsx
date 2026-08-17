interface CoverageStat {
  value: string;
  label: string;
}

interface CoverageMapProps {
  eyebrow: string;
  title: string;
  desc?: string;
  stats?: CoverageStat[];
  seaLabel: string;
}

// Stylised İstanbul European-side districts. Coordinates are schematic
// (west → east, north higher), not GIS-accurate — tuned for legibility.
const HUB = { name: "Avcılar", x: 235, y: 356 };

type LabelPos = "top" | "bottom" | "left" | "right";
const DISTRICTS: { n: string; x: number; y: number; p: LabelPos }[] = [
  { n: "Sarıyer", x: 885, y: 118, p: "top" },
  { n: "Esenyurt", x: 150, y: 196, p: "top" },
  { n: "Başakşehir", x: 342, y: 162, p: "top" },
  { n: "Kağıthane", x: 762, y: 204, p: "top" },
  { n: "Eyüpsultan", x: 626, y: 236, p: "left" },
  { n: "Bağcılar", x: 432, y: 258, p: "top" },
  { n: "Şişli", x: 738, y: 268, p: "right" },
  { n: "Beylikdüzü", x: 112, y: 300, p: "left" },
  { n: "Küçükçekmece", x: 320, y: 300, p: "top" },
  { n: "Bahçelievler", x: 476, y: 322, p: "left" },
  { n: "Beşiktaş", x: 818, y: 330, p: "right" },
  { n: "Bakırköy", x: 524, y: 384, p: "bottom" },
  { n: "Zeytinburnu", x: 606, y: 382, p: "bottom" },
  { n: "Fatih", x: 694, y: 380, p: "bottom" },
];

function labelAttrs(x: number, y: number, p: LabelPos) {
  switch (p) {
    case "top":
      return { x, y: y - 15, anchor: "middle" as const };
    case "bottom":
      return { x, y: y + 25, anchor: "middle" as const };
    case "left":
      return { x: x - 13, y: y + 4, anchor: "end" as const };
    case "right":
      return { x: x + 13, y: y + 4, anchor: "start" as const };
  }
}

export default function CoverageMap({
  eyebrow,
  title,
  desc,
  stats,
  seaLabel,
}: CoverageMapProps) {
  const width = 1000;
  const height = 540;

  return (
    <section className="bg-gray-900 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
            {title}
          </h2>
          {desc && <p className="text-gray-400 leading-relaxed mt-6">{desc}</p>}
        </div>

        {/* Map */}
        <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full min-w-[680px] h-auto"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={`${title} — ${HUB.name} merkez, ${DISTRICTS.map((d) => d.n).join(", ")}`}
          >
            <defs>
              <radialGradient id="cm-coverage" cx="23.5%" cy="66%" r="70%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.34" />
                <stop offset="45%" stopColor="#f97316" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="cm-land" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#182234" />
              </linearGradient>
              <filter id="cm-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            {/* Water */}
            <rect x="0" y="0" width={width} height={height} fill="#0d1523" />

            {/* Faint graticule for map texture */}
            <g stroke="#1e293b" strokeWidth="1" opacity="0.5">
              <line x1="0" y1="135" x2={width} y2="135" />
              <line x1="0" y1="270" x2={width} y2="270" />
              <line x1="0" y1="405" x2={width} y2="405" />
              <line x1="250" y1="0" x2="250" y2={height} />
              <line x1="500" y1="0" x2="500" y2={height} />
              <line x1="750" y1="0" x2="750" y2={height} />
            </g>

            {/* Landmass (European side) */}
            <path
              d="M 0 0 H 1000 V 352
                 C 930 376 905 402 850 398
                 C 792 394 760 430 700 434
                 C 640 438 610 416 545 430
                 C 490 442 470 466 405 454
                 C 345 443 320 414 255 426
                 C 195 437 150 410 90 424
                 C 55 432 25 416 0 428 Z"
              fill="url(#cm-land)"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Coverage glow (subtle pulse) */}
            <ellipse cx={HUB.x} cy={HUB.y} rx="470" ry="200" fill="url(#cm-coverage)">
              <animate
                attributeName="opacity"
                values="0.9;0.55;0.9"
                dur="5s"
                repeatCount="indefinite"
              />
            </ellipse>

            {/* Connection lines hub → districts */}
            <g stroke="#f97316" strokeWidth="1.2" opacity="0.22" strokeLinecap="round">
              {DISTRICTS.map((d) => (
                <line key={`ln-${d.n}`} x1={HUB.x} y1={HUB.y} x2={d.x} y2={d.y} />
              ))}
            </g>

            {/* Dağıtım akışı — Avcılar merkezden ilçelere akan tedarik paketleri */}
            <g>
              {DISTRICTS.map((d, i) => {
                const begin = `${(i % 5) * 0.55}s`;
                const path = `M ${HUB.x} ${HUB.y} L ${d.x} ${d.y}`;
                return (
                  <circle key={`pk-${d.n}`} r="2.6" fill="#fdba74">
                    <animateMotion
                      dur="3.2s"
                      begin={begin}
                      repeatCount="indefinite"
                      path={path}
                      calcMode="spline"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      keySplines="0.4 0 0.2 1"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.82;1"
                      dur="3.2s"
                      begin={begin}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>

            {/* Broadcast rings from hub */}
            {[0, 1.6, 3.2].map((begin, i) => (
              <circle
                key={`ring-${i}`}
                cx={HUB.x}
                cy={HUB.y}
                r="30"
                fill="none"
                stroke="#f97316"
                strokeWidth="1.5"
              >
                <animate
                  attributeName="r"
                  values="30;250"
                  dur="4.8s"
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0"
                  dur="4.8s"
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* District nodes */}
            {DISTRICTS.map((d) => {
              const la = labelAttrs(d.x, d.y, d.p);
              return (
                <g key={`d-${d.n}`} className="group cursor-default">
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r="9"
                    fill="#f97316"
                    opacity="0"
                    className="transition-opacity duration-300 group-hover:opacity-20 group-active:opacity-20"
                  />
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r="4.5"
                    className="fill-slate-500 transition-colors duration-300 group-hover:fill-primary-500 group-active:fill-primary-500"
                  />
                  <text
                    x={la.x}
                    y={la.y}
                    textAnchor={la.anchor}
                    fontSize="14"
                    fontWeight="600"
                    className="fill-slate-400 transition-colors duration-300 group-hover:fill-white group-active:fill-white"
                    style={{ fontFamily: "inherit" }}
                  >
                    {d.n}
                  </text>
                </g>
              );
            })}

            {/* Sea label */}
            <text
              x="500"
              y="512"
              textAnchor="middle"
              fontSize="13"
              letterSpacing="5"
              fill="#334155"
              fontWeight="600"
            >
              {seaLabel}
            </text>

            {/* ===== HUB: LEMARS planet (from the logo) ===== */}
            <g>
              {/* glow */}
              <circle cx={HUB.x} cy={HUB.y} r="30" fill="#f97316" opacity="0.35" filter="url(#cm-glow)" />
              {/* planet body */}
              <circle cx={HUB.x} cy={HUB.y} r="14" fill="#ea580c" stroke="#fff7ed" strokeWidth="1.5" />
              {/* highlight */}
              <circle cx={HUB.x - 4} cy={HUB.y - 4} r="4" fill="#fdba74" opacity="0.9" />
              {/* Saturn ring */}
              <ellipse
                cx={HUB.x}
                cy={HUB.y}
                rx="24"
                ry="6"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                transform={`rotate(-18 ${HUB.x} ${HUB.y})`}
              />
            </g>
          </svg>
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center bg-white/[0.03] border border-white/10 rounded-xl py-6 px-4"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary-500 mb-1">
                  {s.value}
                </div>
                <div className="text-[11px] md:text-xs text-gray-400 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
