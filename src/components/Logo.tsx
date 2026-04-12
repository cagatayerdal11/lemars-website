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
  const height = Math.round(width * 0.335);
  const src = variant === "light" ? "/logo-white.png" : "/logo-transparent.png";

  return (
    <div className={className}>
      <Image
        src={src}
        alt="LeMars Gıda İçecek"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}
