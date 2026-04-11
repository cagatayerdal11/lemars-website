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

  // Koyu arka plan (giriş ekranı, footer, hero):
  // grayscale + contrast ile arka planı saf beyaza, logoyu saf siyaha çevir
  // sonra invert ile logoyu beyaz, arka planı siyah yap
  // mix-blend-screen ile siyah kısımlar (arka plan) transparan olur
  if (variant === "light") {
    return (
      <div className={className}>
        <Image
          src="/logo.png"
          alt="LeMars Gıda İçecek"
          width={width}
          height={height}
          className="object-contain mix-blend-screen"
          style={{
            filter: "grayscale(1) contrast(20) invert(1)",
          }}
          priority
        />
      </div>
    );
  }

  // Beyaz arka plan (header): mix-blend-multiply gri JPEG arka planını yok eder
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="LeMars Gıda İçecek"
        width={width}
        height={height}
        className="mix-blend-multiply object-contain"
        priority
      />
    </div>
  );
}
