"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookieDict {
  message: string;
  accept: string;
  reject: string;
  learnMore: string;
}

export default function CookieBanner({
  dict,
  locale,
}: {
  dict: CookieDict;
  locale: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lemars-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lemars-cookie-consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("lemars-cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-gray-300 text-sm leading-relaxed">
            {dict.message}
          </p>
          <Link
            href={`/${locale}/yasal/kvkk`}
            className="text-primary-400 text-xs font-semibold hover:underline mt-1 inline-block"
          >
            {dict.learnMore} &rarr;
          </Link>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-5 py-2.5 text-xs font-semibold text-gray-400 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors uppercase tracking-wider"
          >
            {dict.reject}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-primary-700 rounded-md hover:bg-primary-800 transition-colors uppercase tracking-wider"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
