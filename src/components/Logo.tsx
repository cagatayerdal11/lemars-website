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
  const subColor = variant === "light" ? "#ffffff" : "#1f2730";
  const lineColor = variant === "light" ? "#d45a1e" : "#d45a1e";
  const fontSize = Math.max(8, Math.round(width * 0.078));
  const lineTop = Math.round(logoHeight * 0.92);

  return (
    <div className={className} style={{ width, position: "relative" }}>
      <Image
        src={src}
        alt="LeMars Gıda İçecek"
        width={width}
        height={logoHeight}
        className="object-contain"
        priority
      />
      {/* Turuncu çizgi */}
      <div
        style={{
          position: "absolute",
          top: lineTop,
          left: 0,
          width: "65%",
          height: 2,
          background: lineColor,
        }}
      />
      {/* GIDA İÇECEK altyazısı */}
      <p
        style={{
          margin: 0,
          marginTop: 2,
          fontSize,
          fontWeight: 800,
          letterSpacing: "0.18em",
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
