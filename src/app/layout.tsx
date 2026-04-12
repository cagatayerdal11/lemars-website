import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeMars Gida Icecek",
  description: "Toptan Alkollü Icecek Dagitimi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}
