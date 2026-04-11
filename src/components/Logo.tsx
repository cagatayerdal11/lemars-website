import Image from "next/image";

export default function Logo({
  className = "",
  width = 160,
  variant = "orange",
}: {
  className?: string;
  width?: number;
  variant?: "dark" | "light" | "orange";
}) {
  const height = Math.round(width * 0.35);

  // Koyu arka plan: beyaz logo (invert)
  // Beyaz arka plan: turuncu logo (mix-blend-multiply arka planı yok eder)
  const filterClass =
    variant === "light"
      ? "brightness-0 invert drop-shadow-none"
      : "mix-blend-multiply";

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="/logo.png"
        alt="LeMars Gıda İçecek"
        width={width}
        height={height}
        className={`${filterClass} object-contain`}
        style={{ background: "transparent" }}
        priority
      />
    </div>
  );
}
