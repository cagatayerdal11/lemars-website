"use client";

interface FlowDiagramProps {
  title: string;
  subtitle: string;
  leftNumber: string;
  leftLabel: string;
  rightLabels: string[];
}

// Delivery truck that rides along an SVG path with rotate="auto" so it
// leans into curves. Centered at local (0,0).
function DeliveryTruck({ pathId, begin, dur }: { pathId: string; begin: number; dur: number }) {
  return (
    <g>
      <ellipse cx="0" cy="12" rx="17" ry="2" fill="#000" opacity="0.14" />
      {/* Cargo box */}
      <rect
        x="-17"
        y="-11"
        width="24"
        height="17"
        rx="2"
        fill="#ea580c"
        stroke="#9a3412"
        strokeWidth="0.6"
      />
      {/* White LEMARS band */}
      <rect x="-15" y="-6" width="20" height="5" fill="white" opacity="0.96" />
      <text
        x="-5"
        y="-2"
        textAnchor="middle"
        fontSize="4"
        fontWeight="900"
        fill="#ea580c"
        letterSpacing="0.3"
      >
        LEMARS
      </text>
      {/* Lower accent stripe */}
      <rect x="-15" y="1.5" width="20" height="1.4" fill="white" opacity="0.55" />
      {/* Cab */}
      <path d="M 7 -5 L 11 -5 L 15 -1 L 15 6 L 7 6 Z" fill="#9a3412" />
      {/* Windshield */}
      <rect x="8" y="-3.5" width="5" height="3.5" rx="0.5" fill="#bae6fd" />
      {/* Headlight */}
      <circle cx="14.5" cy="4" r="0.7" fill="#fef3c7" />
      {/* Wheels */}
      <circle cx="-11" cy="8" r="3.3" fill="#1f2937" />
      <circle cx="-11" cy="8" r="1.4" fill="#9ca3af" />
      <circle cx="10" cy="8" r="3.3" fill="#1f2937" />
      <circle cx="10" cy="8" r="1.4" fill="#9ca3af" />

      <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto" begin={`${begin}s`}>
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </g>
  );
}

// Cartoon crate with 3 liquor bottles sticking out — 100x100 local coords
function BottleCrateIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 50}, ${cy - 50})`}>
      {/* ---- Bottle 1: Wine (left, dark red) ---- */}
      <rect x="14" y="8" width="12" height="4" rx="1" fill="#451a03" />
      <rect x="16" y="12" width="8" height="6" fill="#7f1d1d" />
      <path
        d="M 10 22 Q 10 26 14 27 L 14 66 Q 14 68 16 68 L 24 68 Q 26 68 26 66 L 26 27 Q 30 26 30 22 Z"
        fill="#991b1b"
        stroke="#7f1d1d"
        strokeWidth="0.8"
      />
      {/* Wine label */}
      <rect x="12" y="38" width="16" height="14" rx="0.5" fill="#fef3c7" stroke="#92400e" strokeWidth="0.5" />
      <rect x="14" y="42" width="12" height="1.2" fill="#7f1d1d" />
      <rect x="14" y="45" width="8" height="1" fill="#92400e" opacity="0.6" />
      <rect x="14" y="47" width="10" height="1" fill="#92400e" opacity="0.6" />
      {/* Highlight */}
      <rect x="12" y="28" width="1.8" height="34" rx="0.5" fill="white" opacity="0.28" />

      {/* ---- Bottle 2: Whisky (center, tallest, amber) ---- */}
      <rect x="42" y="4" width="14" height="4" rx="1" fill="#451a03" />
      <rect x="44" y="8" width="10" height="8" fill="#b45309" />
      <path
        d="M 38 18 Q 38 22 42 23 L 42 66 Q 42 68 44 68 L 54 68 Q 56 68 56 66 L 56 23 Q 60 22 60 18 Z"
        fill="#d97706"
        stroke="#92400e"
        strokeWidth="0.8"
      />
      {/* Whisky label */}
      <rect x="40" y="36" width="18" height="16" rx="0.5" fill="#fef3c7" stroke="#92400e" strokeWidth="0.5" />
      <rect x="42" y="40" width="14" height="1.5" fill="#92400e" />
      <rect x="42" y="44" width="10" height="1" fill="#92400e" opacity="0.6" />
      <rect x="42" y="46" width="12" height="1" fill="#92400e" opacity="0.6" />
      {/* Highlight */}
      <rect x="40" y="24" width="2" height="38" rx="0.5" fill="white" opacity="0.28" />

      {/* ---- Bottle 3: Clear spirit (right, blue tint) ---- */}
      <rect x="72" y="10" width="12" height="4" rx="1" fill="#1e293b" />
      <rect x="74" y="14" width="8" height="6" fill="#94a3b8" />
      <path
        d="M 68 24 Q 68 28 72 29 L 72 66 Q 72 68 74 68 L 82 68 Q 84 68 84 66 L 84 29 Q 88 28 88 24 Z"
        fill="#cbd5e1"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      {/* Clear-spirit label */}
      <rect x="70" y="40" width="16" height="14" rx="0.5" fill="#fef3c7" stroke="#92400e" strokeWidth="0.5" />
      <rect x="72" y="44" width="12" height="1.2" fill="#1e40af" />
      <rect x="72" y="47" width="8" height="1" fill="#1e40af" opacity="0.6" />
      {/* Highlight */}
      <rect x="70" y="30" width="1.8" height="32" rx="0.5" fill="white" opacity="0.35" />

      {/* ---- Wooden Crate ---- */}
      <rect x="4" y="66" width="92" height="28" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1.2" />
      {/* Top rim (darker, opening) */}
      <rect x="4" y="66" width="92" height="4" fill="#78350f" />
      {/* Wood plank lines */}
      <line x1="4" y1="76" x2="96" y2="76" stroke="#78350f" strokeWidth="0.6" opacity="0.7" />
      <line x1="4" y1="85" x2="96" y2="85" stroke="#78350f" strokeWidth="0.6" opacity="0.7" />
      {/* Vertical slats */}
      <line x1="28" y1="70" x2="28" y2="94" stroke="#78350f" strokeWidth="0.6" opacity="0.5" />
      <line x1="50" y1="70" x2="50" y2="94" stroke="#78350f" strokeWidth="0.6" opacity="0.5" />
      <line x1="72" y1="70" x2="72" y2="94" stroke="#78350f" strokeWidth="0.6" opacity="0.5" />
    </g>
  );
}

// Right-side business icons (stroke-based, 40x40 local)
const rightIcons = [
  // 0 — Market (shopping bag with handle)
  "M 8 14 L 32 14 L 30 36 L 10 36 Z M 14 14 L 14 9 Q 14 4 20 4 Q 26 4 26 9 L 26 14",
  // 1 — Bar (martini glass)
  "M 7 8 L 33 8 L 22 22 L 22 32 L 28 36 L 12 36 L 18 32 L 18 22 Z M 13 12 L 27 12",
  // 2 — Restaurant (plate + fork & knife)
  "M 20 22 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 20 22 m -5.5 0 a 5.5 5.5 0 1 0 11 0 a 5.5 5.5 0 1 0 -11 0 M 8 6 L 8 32 M 6 6 L 6 13 M 10 6 L 10 13 M 32 6 L 32 32 M 30 6 L 30 13 Q 30 15 32 15",
  // 3 — Hotel (multi-story building)
  "M 8 6 L 32 6 L 32 36 L 8 36 Z M 12 12 L 16 12 M 24 12 L 28 12 M 12 18 L 16 18 M 24 18 L 28 18 M 12 24 L 16 24 M 24 24 L 28 24 M 17 36 L 17 30 L 23 30 L 23 36",
  // 4 — Depo (warehouse with roll-up door)
  "M 4 18 L 20 7 L 36 18 M 8 18 L 8 36 L 32 36 L 32 18 M 14 36 L 14 24 L 26 24 L 26 36 M 14 28 L 26 28 M 14 32 L 26 32",
];

export default function FlowDiagram({
  title,
  subtitle,
  leftNumber,
  leftLabel,
  rightLabels,
}: FlowDiagramProps) {
  const width = 1200;
  const height = 720;
  const centerX = width / 2;
  const centerY = height / 2;
  const leftX = 170;
  const rightX = width - 160;
  const nodeSize = 92;
  const centerSize = 220;
  const leftNodeSize = 160;

  const leftPosition = { x: leftX, y: centerY };

  const computeRightPositions = (count: number, x: number) => {
    const topY = 100;
    const bottomY = height - 100;
    const step = count > 1 ? (bottomY - topY) / (count - 1) : 0;
    return Array.from({ length: count }, (_, i) => ({
      x,
      y: count === 1 ? centerY : topY + step * i,
    }));
  };

  const rightPositions = computeRightPositions(rightLabels.length, rightX);

  // Curved path from left node to center
  const leftPath = (() => {
    const sx = leftPosition.x + leftNodeSize / 2;
    const sy = leftPosition.y;
    const ex = centerX - centerSize / 2;
    const ey = centerY;
    const midX = sx + (ex - sx) * 0.5;
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  })();

  // Fan-out paths from center to each right node
  const rightPaths = rightPositions.map((pos) => {
    const sx = centerX + centerSize / 2;
    const sy = centerY;
    const ex = pos.x - nodeSize / 2;
    const ey = pos.y;
    const midX = sx + (ex - sx) * 0.5;
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  });

  return (
    <div className="w-full">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[960px] h-auto"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${leftNumber} ${leftLabel} → LEMARS → ${rightLabels.join(", ")}`}
        >
          <defs>
            <filter id="centerShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#ea580c" floodOpacity="0.18" />
            </filter>
            <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.08" />
            </filter>

            <path id="fd-leftPath" d={leftPath} />
            {rightPaths.map((d, i) => (
              <path key={`rpd-${i}`} id={`fd-rp-${i}`} d={d} />
            ))}
          </defs>

          {/* Path strokes — dashed */}
          <path
            d={leftPath}
            stroke="#e5e7eb"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
          {rightPaths.map((d, i) => (
            <path
              key={`rps-${i}`}
              d={d}
              stroke="#e5e7eb"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          ))}

          {/* Center pulse halo */}
          <circle cx={centerX} cy={centerY} r={centerSize / 2 + 18} fill="#fb923c" opacity="0.18">
            <animate
              attributeName="r"
              values={`${centerSize / 2 + 12};${centerSize / 2 + 36};${centerSize / 2 + 12}`}
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.22;0.05;0.22"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Moving product dots on left path */}
          {[0, 0.6, 1.2, 1.8, 2.4].map((delay, i) => (
            <circle
              key={`lmd-${i}`}
              r={i % 2 === 0 ? "8" : "5"}
              fill="#ea580c"
              opacity={i % 2 === 0 ? "1" : "0.6"}
            >
              <animateMotion dur="3s" repeatCount="indefinite" begin={`${delay}s`}>
                <mpath href="#fd-leftPath" />
              </animateMotion>
            </circle>
          ))}

          {/* LEMARS delivery trucks on each right path */}
          {rightPaths.map((_, i) => (
            <DeliveryTruck
              key={`truck-${i}`}
              pathId={`fd-rp-${i}`}
              begin={i * 0.9}
              dur={4.8 + (i % 3) * 0.4}
            />
          ))}

          {/* ---- LEFT NODE: 400+ Ürün Çeşidi with bottle-crate illustration ---- */}
          <g filter="url(#nodeShadow)">
            <rect
              x={leftPosition.x - leftNodeSize / 2}
              y={leftPosition.y - leftNodeSize / 2}
              width={leftNodeSize}
              height={leftNodeSize}
              rx="26"
              fill="white"
              stroke="#fed7aa"
              strokeWidth="2"
            />
          </g>
          <BottleCrateIcon cx={leftPosition.x} cy={leftPosition.y - 6} />

          {/* Left labels below the node */}
          <text
            x={leftPosition.x}
            y={leftPosition.y + leftNodeSize / 2 + 36}
            textAnchor="middle"
            fontSize="32"
            fontWeight="900"
            fill="#ea580c"
          >
            {leftNumber}
          </text>
          <text
            x={leftPosition.x}
            y={leftPosition.y + leftNodeSize / 2 + 60}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="#6b7280"
            letterSpacing="1.5"
          >
            {leftLabel.toUpperCase()}
          </text>

          {/* ---- CENTER NODE: white card with LEMARS logo image ---- */}
          <g filter="url(#centerShadow)">
            <rect
              x={centerX - centerSize / 2}
              y={centerY - centerSize / 2}
              width={centerSize}
              height={centerSize}
              rx="36"
              fill="white"
              stroke="#fed7aa"
              strokeWidth="3"
            />
          </g>
          {/* LEMARS logo PNG */}
          <image
            href="/logo-transparent.png"
            x={centerX - 78}
            y={centerY - 56}
            width="156"
            height="60"
            preserveAspectRatio="xMidYMid meet"
          />
          {/* Orange separator line under the logo */}
          <rect
            x={centerX - 78}
            y={centerY + 8}
            width="156"
            height="4"
            rx="1"
            fill="#ea580c"
          />
          {/* GIDA İÇECEK text */}
          <text
            x={centerX + 78}
            y={centerY + 38}
            textAnchor="end"
            fontSize="18"
            fontWeight="900"
            fill="#1f2937"
            letterSpacing="3"
          >
            GIDA İÇECEK
          </text>

          {/* ---- RIGHT NODES: 5 business types (no header badge) ---- */}
          {rightLabels.map((label, i) => {
            const pos = rightPositions[i];
            const iconPath = rightIcons[i] || rightIcons[0];
            return (
              <g key={`rnode-${i}`}>
                <g filter="url(#nodeShadow)">
                  <rect
                    x={pos.x - nodeSize / 2}
                    y={pos.y - nodeSize / 2}
                    width={nodeSize}
                    height={nodeSize}
                    rx="22"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1.5"
                  />
                </g>
                <path
                  d={iconPath}
                  transform={`translate(${pos.x - 20}, ${pos.y - 20})`}
                  stroke="#6b7280"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x={pos.x}
                  y={pos.y + nodeSize / 2 + 28}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#374151"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Scroll-down cue — directs users to the detail sections below */}
      <div className="mt-10 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-[11px] font-semibold tracking-[0.3em] uppercase">
          {subtitle}
        </span>
        <svg
          className="w-5 h-5 animate-bounce text-primary-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
