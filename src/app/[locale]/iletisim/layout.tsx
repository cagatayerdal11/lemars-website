import type { Metadata } from "next";
import { getDictionary, Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";

// The İletişim page is a client component, so its metadata is provided by
// this server layout wrapper.
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale as Locale);
  const seo = (dict.seo as Record<string, { title: string; description: string }>).contact;
  return buildMetadata({
    locale: params.locale,
    path: "/iletisim",
    title: seo.title,
    description: seo.description,
  });
}

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
