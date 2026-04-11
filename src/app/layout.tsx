import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TAPDKBanner from "@/components/TAPDKBanner";

export const metadata: Metadata = {
  title: "LeMars Gıda İçecek | Toptan Alkollü İçecek Dağıtımı",
  description:
    "İstanbul Avrupa Yakası'nda restoran, bar ve perakende satış noktalarına alkollü içecek toptan satış ve dağıtım hizmeti.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        <AgeGate>
          <TAPDKBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AgeGate>
      </body>
    </html>
  );
}
