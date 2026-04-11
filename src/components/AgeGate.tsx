"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const ageVerified = sessionStorage.getItem("lemars-age-verified");
    if (ageVerified === "true") {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, []);

  const handleVerify = () => {
    sessionStorage.setItem("lemars-age-verified", "true");
    setVerified(true);
  };

  const handleDeny = () => {
    setDenied(true);
  };

  if (verified === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <Logo width={200} variant="light" />
          </div>

          {/* Yas Dogrulama Karti */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {denied ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Erisim Engellendi
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Bu web sitesine erisim icin 18 yasindan buyuk olmaniz
                  gerekmektedir. 4733 Sayili Kanun geregi alkolu iceceklerin 18
                  yasindan kucuklere satisi yasaktir.
                </p>
                <button
                  onClick={() => setDenied(false)}
                  className="text-primary-700 text-sm font-medium hover:underline"
                >
                  Geri Don
                </button>
              </div>
            ) : (
              <>
                {/* Uyari Ikonu */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Yas Dogrulamasi
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Bu web sitesi alkolu icecek toptan satisi hakkinda bilgi
                    icermektedir.
                  </p>
                </div>

                {/* Uyari Metni */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                  <p className="text-orange-800 text-sm text-center font-medium">
                    Alkol, sagliga zararlidir. 18 yasindan kucuklere alkol
                    satisi yasaktir.
                  </p>
                </div>

                {/* Soru */}
                <p className="text-center text-gray-800 font-semibold mb-6">
                  18 yasindan buyuk musunuz?
                </p>

                {/* Butonlar */}
                <div className="flex gap-4">
                  <button
                    onClick={handleVerify}
                    className="flex-1 py-3.5 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-200 shadow-sm"
                  >
                    Evet, 18 Yasindan Buyugum
                  </button>
                  <button
                    onClick={handleDeny}
                    className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200"
                  >
                    Hayir
                  </button>
                </div>

                {/* Yasal Bilgi */}
                <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">
                  Bu siteye girerek, 4733 Sayili Kanun ve TAPDK duzenlemeleri
                  kapsaminda 18 yasindan buyuk oldugunuzu teyit etmis
                  olursunuz. Alkolu iceceklerin reklamina, tanitimina ve
                  pazarlamasina iliskin yasal sinirlamalar gecerlidir.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
