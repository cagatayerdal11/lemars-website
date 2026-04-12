export default function Logo({
  className = "",
  width = 160,
  variant = "orange",
}: {
  className?: string;
  width?: number;
  variant?: "dark" | "light" | "orange";
}) {
  const height = Math.round(width * 0.28);

  const fillMap: Record<string, string> = {
    orange: "#d45a1e",
    light: "#ffffff",
    dark: "#1f2730",
  };

  const fill = fillMap[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 525 120"
      width={width}
      height={height}
      className={className}
      aria-label="LeMars Gıda İçecek"
      role="img"
    >
      {/* L */}
      <path d="M0 10h28v75h42v25H0z" fill={fill} />
      {/* E */}
      <path d="M80 10h65v23H108v14h33v21h-33v17h40v25H80z" fill={fill} />
      {/* M */}
      <path d="M155 10h38l19 48 19-48h38v100h-27V48l-22 52h-16l-22-52v62h-27z" fill={fill} />
      {/* A */}
      <path d="M283 10h32l38 100h-29l-6-18h-38l-6 18h-29zm5 60h26l-13-40z" fill={fill} />
      {/* R */}
      <path d="M358 10h50c22 0 35 14 35 33 0 15-8 26-21 31l25 36h-31l-22-33h-8v33h-28zm28 46h18c8 0 13-5 13-13s-5-12-13-12h-18z" fill={fill} />
      {/* S */}
      <path d="M450 84c6 6 16 10 24 10 8 0 13-3 13-9 0-6-6-8-17-12-18-6-31-14-31-34 0-21 16-33 39-33 15 0 27 5 36 13l-15 19c-6-5-13-9-21-9-7 0-11 3-11 8 0 7 7 9 18 13 18 6 30 14 30 33 0 22-17 34-41 34-17 0-32-6-41-16z" fill={fill} />
      {/* Planet icon */}
      <circle cx="503" cy="82" r="12" fill={fill} />
      <ellipse cx="503" cy="82" rx="20" ry="5" fill="none" stroke={fill} strokeWidth={3.5} />
    </svg>
  );
}
