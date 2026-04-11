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

  return (
    <Image
      src="/logo.png"
      alt="LeMars Gıda İçecek"
      width={width}
      height={height}
      className={`${variant === "light" ? "brightness-0 invert" : "mix-blend-multiply"} ${className}`}
      priority
    />
  );
}
