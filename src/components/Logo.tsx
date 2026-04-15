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
  const logoHeight = Math.round(width * 0.335);
  const src = variant === "light" ? "/logo-white.png" : "/logo-transparent.png";
  const lineColor = "#d45a1e";
  const subColor = variant === "light" ? "#ffffff" : "#1f2730";
  const fontSize = Math.max(8, Math.round(width * 0.075));
  const lineHeight = Math.max(2, Math.round(width * 0.016));

  return (
    <div className={className} style={{ width }}>
      <Image
        src={src}
        alt="LEMARS Gıda İçecek"
        width={width}
        height={logoHeight}
        className="object-contain"
        priority
      />
      {/* Turuncu çizgi - LEMARS yazısının tam altında, soldan sağa */}
      <div
        style={{
          width: "100%",
          height: lineHeight,
          background: lineColor,
          marginTop: -Math.round(logoHeight * 0.12),
        }}
      />
      {/* GIDA İÇECEK - sağa yaslı */}
      <p
        style={{
          margin: 0,
          marginTop: Math.round(width * 0.02),
          fontSize,
          fontWeight: 800,
          letterSpacing: "0.15em",
          color: subColor,
          textAlign: "right",
          lineHeight: 1,
        }}
      >
        GIDA İÇECEK
      </p>
    </div>
  );
}
