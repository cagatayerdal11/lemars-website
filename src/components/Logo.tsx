export default function Logo({
  className = "",
  width = 160,
  variant = "dark",
}: {
  className?: string;
  width?: number;
  variant?: "dark" | "light" | "orange";
}) {
  const fill =
    variant === "light"
      ? "#FFFFFF"
      : variant === "orange"
        ? "#E8611A"
        : "#E8611A";

  const height = width * 0.3;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 150"
      width={width}
      height={height}
      className={className}
      aria-label="LeMars Logo"
    >
      {/* L */}
      <text
        x="0"
        y="120"
        fontFamily="Poppins, Montserrat, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="140"
        fill={fill}
        letterSpacing="-2"
      >
        LEMARS
      </text>
      {/* Planet Icon */}
      <g transform="translate(440, 55)">
        <circle cx="22" cy="22" r="18" fill={fill} />
        <ellipse
          cx="22"
          cy="22"
          rx="32"
          ry="8"
          fill="none"
          stroke={fill}
          strokeWidth="4"
          transform="rotate(-25, 22, 22)"
        />
      </g>
    </svg>
  );
}
