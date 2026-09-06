import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

// Kök metadata yalnızca /[locale] dışındaki rotalar (ör. /admin) için geçerlidir;
// herkese açık sayfaların başlık/açıklaması src/app/[locale]/layout.tsx ve
// buildMetadata() üzerinden gelir. Ürün/marka tanıtımı içermez.
export const metadata: Metadata = {
  title: "LEMARS Gıda İçecek",
  description: "Toptan tedarik, lojistik ve dağıtım — kurumsal bilgilendirme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`h-full antialiased ${poppins.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}
