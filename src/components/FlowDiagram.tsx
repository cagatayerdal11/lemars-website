"use client";

interface FlowDiagramProps {
  title: string;
  subtitle: string;
  leftLabel: string;
  rightHeader: string;
  rightLabels: string[];
  centerLabel: string;
}

// Delivery truck that rides along an SVG path — rotate="auto" so it leans
// into curves like it's following the road. Centered at local (0,0) so
// animateMotion translates it cleanly.
function DeliveryTruck({ pathId, begin, dur }: { pathId: string; begin: number; dur: number }) {
  return (
    <g>
      {/* Soft ground shadow */}
      <ellipse cx="0" cy="12" rx="16" ry="2" fill="#000" opacity="0.12" />
      {/* Cargo box (orange LEMARS branding) */}
      <rect x="-16" y="-10" width="23" height="16" rx="2" fill="#ea580c" stroke="#9a3412" strokeWidth="0.4" />
      {/* White stripe across cargo (subtle LEMARS band) */}
      <rect x="-14" y="-5" width="19" height="4" fill="white" opacity="0.95" />
      <rect x="-14" y="1.5" width="19" height="1.2" fill="white" opacity="0.5" />
      {/* Cab */}
      <path d="M 7 -5 L 11 -5 L 15 -1 L 15 6 L 7 6 Z" fill="#9a3412" />
      {/* Windshield */}
      <rect x="8" y="-3.5" width="5" height="3.5" rx="0.5" fill="#bae6fd" />
      {/* Headlight */}
      <circle cx="14.5" cy="4" r="0.7" fill="#fef3c7" />
      {/* Wheels (tire + rim) */}
      <circle cx="-10" cy="8" r="3.2" fill="#1f2937" />
      <circle cx="-10" cy="8" r="1.4" fill="#9ca3af" />
      <circle cx="9.5" cy="8" r="3.2" fill="#1f2937" />
      <circle cx="9.5" cy="8" r="1.4" fill="#9ca3af" />

      <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto" begin={`${begin}s`}>
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </g>
  );
}

// 40x40 icon paths (stroke-based)
const icons = {
  // Stacked package/products box — "400+ Ürün"
  package:
    "M 20 4 L 34 11 L 34 28 L 20 35 L 6 28 L 6 11 Z M 6 11 L 20 18 L 34 11 M 20 18 L 20 35 M 13 7.5 L 27 14.5",
  // Retail / Market
  shop:
    "M 7 14 L 33 14 L 31 28 L 9 28 Z M 9 18 L 31 18 M 13 34 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 27 34 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 7 14 L 10 6 L 30 6 L 33 14",
  // Bar — cocktail / martini glass
  bar:
    "M 7 8 L 33 8 L 22 22 L 22 32 L 28 36 L 12 36 L 18 32 L 18 22 Z M 13 12 L 27 12",
  // Restaurant — plate with fork & knife
  restaurant:
    "M 20 22 m -13 0 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0 M 20 22 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 14 5 L 14 14 M 26 5 L 26 14",
  // Hotel — multi-story building with windows
  hotel:
    "M 8 7 L 32 7 L 32 36 L 8 36 Z M 8 7 L 20 2 L 32 7 M 12 13 L 16 13 M 24 13 L 28 13 M 12 19 L 16 19 M 24 19 L 28 19 M 12 25 L 16 25 M 24 25 L 28 25 M 17 36 L 17 30 L 23 30 L 23 36",
  // Depo — warehouse with roll-up door
  warehouse:
    "M 4 18 L 20 7 L 36 18 M 8 18 L 8 36 L 32 36 L 32 18 M 14 36 L 14 24 L 26 24 L 26 36 M 14 28 L 26 28 M 14 32 L 26 32",
};

// Larger LEMARS warehouse icon for center node (100x60)
const lemarsWarehouseIcon =
  "M 5 28 L 50 6 L 95 28 M 12 28 L 12 58 L 88 58 L 88 28 M 35 58 L 35 38 L 65 38 L 65 58 M 35 46 L 65 46 M 35 52 L 65 52 M 20 36 L 28 36 L 28 42 L 20 42 Z M 72 36 L 80 36 L 80 42 L 72 42 Z";

const rightIconSet = [
  icons.shop, // Market
  icons.bar, // Bar
  icons.restaurant, // Restoran
  icons.hotel, // Otel
  icons.warehouse, // Depo
];

export default function FlowDiagram({
  title,
  subtitle,
  leftLabel,
  rightHeader,
  rightLabels,
  centerLabel,
}: FlowDiagramProps) {
  const width = 1200;
  const height = 680;
  const centerX = width / 2;
  const centerY = height / 2;
  const leftX = 160;
  const rightX = width - 160;
  const nodeSize = 86;
  const centerSize = 190;
  const leftNodeSize = 120;

  const leftPosition = { x: leftX, y: centerY };

  const computeRightPositions = (count: number, x: number) => {
    const topY = 90;
    const bottomY = height - 90;
    const step = count > 1 ? (bottomY - topY) / (count - 1) : 0;
    return Array.from({ length: count }, (_, i) => ({
      x,
      y: count === 1 ? centerY : topY + step * i,
    }));
  };

  const rightPositions = computeRightPositions(rightLabels.length, rightX);

  // Single curved path from left node to center
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
      <div className="text-center mb-12">
        <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          {leftLabel} &rarr; {centerLabel} &rarr; {rightHeader}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[920px] h-auto"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${leftLabel} to ${rightHeader} via ${centerLabel}`}
        >
          <defs>
            <linearGradient id="lemarsCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            <path id="fd-leftPath" d={leftPath} />
            {rightPaths.map((d, i) => (
              <path key={`rpd-${i}`} id={`fd-rp-${i}`} d={d} />
            ))}
          </defs>

          {/* Path strokes */}
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
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
          ))}

          {/* Center pulse halo */}
          <circle cx={centerX} cy={centerY} r={centerSize / 2 + 15} fill="#fb923c" opacity="0.2">
            <animate
              attributeName="r"
              values={`${centerSize / 2 + 10};${centerSize / 2 + 34};${centerSize / 2 + 10}`}
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.25;0.05;0.25"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Moving dots on left path — multiple dots showing "400+ products flowing in" */}
          {[0, 0.5, 1.0, 1.5, 2.0].map((delay, i) => (
            <circle key={`lmd-${i}`} r={i % 2 === 0 ? "8" : "5"} fill="#ea580c" opacity={i % 2 === 0 ? "1" : "0.6"}>
              <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${delay}s`}>
                <mpath href="#fd-leftPath" />
              </animateMotion>
            </circle>
          ))}

          {/* LEMARS delivery trucks — one per destination, staggered */}
          {rightPaths.map((_, i) => (
            <DeliveryTruck
              key={`truck-${i}`}
              pathId={`fd-rp-${i}`}
              begin={i * 0.9}
              dur={4.8 + (i % 3) * 0.4}
            />
          ))}

          {/* Left node — 400+ Ürün */}
          <g>
            <rect
              x={leftPosition.x - leftNodeSize / 2}
              y={leftPosition.y - leftNodeSize / 2}
              width={leftNodeSize}
              height={leftNodeSize}
              rx="24"
              fill="white"
              stroke="#fed7aa"
              strokeWidth="2.5"
            />
            <path
              d={icons.package}
              transform={`translate(${leftPosition.x - 20}, ${leftPosition.y - 38})`}
              stroke="#ea580c"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={leftPosition.x}
              y={leftPosition.y + 16}
              textAnchor="middle"
              fontSize="26"
              fontWeight="800"
              fill="#ea580c"
            >
              400+
            </text>
            <text
              x={leftPosition.x}
              y={leftPosition.y + 38}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#6b7280"
              letterSpacing="1"
            >
              {leftLabel}
            </text>
          </g>

          {/* Center LEMARS node — warehouse icon + label */}
          <g>
            <rect
              x={centerX - centerSize / 2}
              y={centerY - centerSize / 2}
              width={centerSize}
              height={centerSize}
              rx="34"
              fill="url(#lemarsCenterGrad)"
            />
            <path
              d={lemarsWarehouseIcon}
              transform={`translate(${centerX - 50}, ${centerY - 56})`}
              stroke="white"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1={centerX - 55}
              y1={centerY + 22}
              x2={centerX + 55}
              y2={centerY + 22}
              stroke="white"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <text
              x={centerX}
              y={centerY + 50}
              textAnchor="middle"
              fontSize="26"
              fontWeight="800"
              fill="white"
              letterSpacing="4"
            >
              {centerLabel}
            </text>
          </g>

          {/* Right section header — İŞLETMENİZ */}
          <g>
            <rect
              x={rightX - 70}
              y={30}
              width={140}
              height={32}
              rx="16"
              fill="#fff7ed"
              stroke="#fed7aa"
              strokeWidth="1.5"
            />
            <text
              x={rightX}
              y={51}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#ea580c"
              letterSpacing="3"
            >
              {rightHeader}
            </text>
          </g>

          {/* Right nodes — business types */}
          {rightLabels.map((label, i) => {
            const pos = rightPositions[i];
            const iconPath = rightIconSet[i] || rightIconSet[0];
            return (
              <g key={`rnode-${i}`}>
                <rect
                  x={pos.x - nodeSize / 2}
                  y={pos.y - nodeSize / 2}
                  width={nodeSize}
                  height={nodeSize}
                  rx="20"
                  fill="white"
                  stroke="#e5e7eb"
                  strokeWidth="1.5"
                />
                <path
                  d={iconPath}
                  transform={`translate(${pos.x - 20}, ${pos.y - 20})`}
                  stroke="#9ca3af"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x={pos.x}
                  y={pos.y + nodeSize / 2 + 24}
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="600"
                  fill="#4b5563"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
