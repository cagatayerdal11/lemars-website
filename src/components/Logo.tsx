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

  if (variant === "light") {
    // Koyu arka plan: logo beyaz zemin üzerinde, köşeleri yuvarlatılmış badge
    return (
      <div
        className={`inline-flex items-center justify-center bg-white rounded-xl px-6 py-3 ${className}`}
      >
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

  // Beyaz arka plan: mix-blend-multiply gri JPEG arka planını yok eder
  return (
    <div className={`relative ${className}`}>
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
