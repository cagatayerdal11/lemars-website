"use client";

interface FlowDiagramProps {
  title: string;
  subtitle: string;
  leftTitle: string;
  rightTitle: string;
  leftLabels: string[];
  rightLabels: string[];
  centerLabel: string;
}

// 40x40 icon paths (stroke based, no fill)
const icons = {
  whisky:
    "M 13 4 L 13 9 L 10 13 L 10 34 Q 10 36 12 36 L 28 36 Q 30 36 30 34 L 30 13 L 27 9 L 27 4 Z M 10 19 L 30 19",
  wine:
    "M 11 4 L 29 4 L 26 22 L 22 26 L 22 33 L 27 36 L 13 36 L 18 33 L 18 26 L 14 22 Z",
  vodka:
    "M 12 4 L 28 4 L 28 10 L 31 14 L 31 34 Q 31 36 29 36 L 11 36 Q 9 36 9 34 L 9 14 L 12 10 Z M 12 18 L 28 18",
  restaurant:
    "M 20 5 Q 32 5 32 20 Q 32 35 20 35 Q 8 35 8 20 Q 8 5 20 5 M 14 11 L 14 22 M 12 11 L 16 11 M 26 11 L 26 22 M 24 11 L 28 11",
  hotel:
    "M 6 15 L 20 5 L 34 15 L 34 36 L 6 36 Z M 14 22 L 18 22 M 22 22 L 26 22 M 14 28 L 18 28 M 22 28 L 26 28",
  shop:
    "M 8 12 L 32 12 L 30 28 L 12 28 Z M 12 16 L 30 16 M 14 34 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 28 34 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0",
};

const leftIconSet = [icons.whisky, icons.wine, icons.vodka];
const rightIconSet = [icons.restaurant, icons.hotel, icons.shop];

export default function FlowDiagram({
  title,
  subtitle,
  leftTitle,
  rightTitle,
  centerLabel,
  leftLabels,
  rightLabels,
}: FlowDiagramProps) {
  const width = 1000;
  const height = 540;
  const centerX = width / 2;
  const centerY = height / 2;
  const leftX = 130;
  const rightX = width - 130;
  const nodeSize = 96;
  const centerSize = 150;

  const computePositions = (count: number, x: number) => {
    if (count === 1) return [{ x, y: centerY }];
    const topY = 100;
    const bottomY = height - 100;
    const step = (bottomY - topY) / (count - 1);
    return Array.from({ length: count }, (_, i) => ({ x, y: topY + step * i }));
  };

  const leftPositions = computePositions(leftLabels.length, leftX);
  const rightPositions = computePositions(rightLabels.length, rightX);

  const leftPaths = leftPositions.map((pos) => {
    const sx = pos.x + nodeSize / 2;
    const sy = pos.y;
    const ex = centerX - centerSize / 2;
    const ey = centerY;
    const midX = sx + (ex - sx) * 0.55;
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  });

  const rightPaths = rightPositions.map((pos) => {
    const sx = centerX + centerSize / 2;
    const sy = centerY;
    const ex = pos.x - nodeSize / 2;
    const ey = pos.y;
    const midX = sx + (ex - sx) * 0.45;
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  });

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          {leftTitle} → {centerLabel} → {rightTitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[760px] h-auto"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${leftTitle} to ${rightTitle} flow through ${centerLabel}`}
        >
          <defs>
            <linearGradient id="lemarsCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            {leftPaths.map((d, i) => (
              <path key={`lpd-${i}`} id={`fd-lp-${i}`} d={d} />
            ))}
            {rightPaths.map((d, i) => (
              <path key={`rpd-${i}`} id={`fd-rp-${i}`} d={d} />
            ))}
          </defs>

          {/* Visible dashed paths */}
          {leftPaths.map((d, i) => (
            <path
              key={`lps-${i}`}
              d={d}
              stroke="#e5e7eb"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
          ))}
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
          <circle cx={centerX} cy={centerY} r={centerSize / 2 + 12} fill="#fb923c" opacity="0.2">
            <animate
              attributeName="r"
              values={`${centerSize / 2 + 8};${centerSize / 2 + 28};${centerSize / 2 + 8}`}
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

          {/* Moving dots — brands flowing into LEMARS */}
          {leftPaths.map((_, i) => (
            <g key={`lmd-${i}`}>
              <circle r="8" fill="#ea580c">
                <animateMotion dur="3.5s" repeatCount="indefinite" begin={`${i * 0.7}s`}>
                  <mpath href={`#fd-lp-${i}`} />
                </animateMotion>
              </circle>
              <circle r="4" fill="#ea580c" opacity="0.5">
                <animateMotion dur="3.5s" repeatCount="indefinite" begin={`${i * 0.7 + 1.2}s`}>
                  <mpath href={`#fd-lp-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}

          {/* Moving dots — LEMARS distributing to businesses */}
          {rightPaths.map((_, i) => (
            <g key={`rmd-${i}`}>
              <circle r="8" fill="#ea580c">
                <animateMotion dur="3.5s" repeatCount="indefinite" begin={`${i * 0.7 + 1.8}s`}>
                  <mpath href={`#fd-rp-${i}`} />
                </animateMotion>
              </circle>
              <circle r="4" fill="#ea580c" opacity="0.5">
                <animateMotion dur="3.5s" repeatCount="indefinite" begin={`${i * 0.7 + 3}s`}>
                  <mpath href={`#fd-rp-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}

          {/* Left nodes (Brands) */}
          {leftLabels.map((label, i) => {
            const pos = leftPositions[i];
            const iconPath = leftIconSet[i] || leftIconSet[0];
            return (
              <g key={`lnode-${i}`}>
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
                  y={pos.y + nodeSize / 2 + 30}
                  textAnchor="middle"
                  fontSize="19"
                  fontWeight="600"
                  fill="#4b5563"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Center node — LEMARS */}
          <g>
            <rect
              x={centerX - centerSize / 2}
              y={centerY - centerSize / 2}
              width={centerSize}
              height={centerSize}
              rx="30"
              fill="url(#lemarsCenterGrad)"
            />
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              fontSize="28"
              fontWeight="800"
              fill="white"
              letterSpacing="3"
            >
              {centerLabel}
            </text>
          </g>

          {/* Right nodes (Businesses) */}
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
                  y={pos.y + nodeSize / 2 + 30}
                  textAnchor="middle"
                  fontSize="19"
                  fontWeight="600"
                  fill="#4b5563"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Section header labels */}
          <text
            x={leftX}
            y={50}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="#ea580c"
            letterSpacing="3"
          >
            {leftTitle}
          </text>
          <text
            x={rightX}
            y={50}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="#ea580c"
            letterSpacing="3"
          >
            {rightTitle}
          </text>
        </svg>
      </div>
    </div>
  );
}
