"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { trackLanguageChange } from "@/lib/analytics/gtag";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  // Remove the current locale prefix from the path
  const pathWithoutLocale = pathname.replace(/^\/(tr|en)/, "") || "/";

  const onSwitch = (to: string) => {
    if (to === locale) return;
    trackLanguageChange({ from_locale: locale, to_locale: to, page_path: pathname });
  };

  return (
    <div className="flex items-center gap-1 text-xs font-semibold tracking-wider">
      <Link
        href={`/tr${pathWithoutLocale}`}
        onClick={() => onSwitch("tr")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "tr"
            ? "bg-primary-700 text-white"
            : "text-gray-500 hover:text-primary-700"
        }`}
      >
        TR
      </Link>
      <span className="text-gray-300">|</span>
      <Link
        href={`/en${pathWithoutLocale}`}
        onClick={() => onSwitch("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-primary-700 text-white"
            : "text-gray-500 hover:text-primary-700"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
