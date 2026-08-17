import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LEMARS Gida Icecek",
  description: "Toptan Alkollü Icecek Dagitimi",
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
