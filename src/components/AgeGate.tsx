"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const ageVerified = sessionStorage.getItem("lemars-age-verified");
    setVerified(ageVerified === "true");
  }, []);

  const handleYes = () => {
    sessionStorage.setItem("lemars-age-verified", "true");
    setVerified(true);
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Logo width={200} variant="light" />
          </div>

          <div className="bg-white rounded-lg p-10">
            {denied ? (
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Erişim Engellendi</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Bu web sitesine erişim için 18 yaşından büyük olmanız gerekmektedir.
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  4733 Sayılı Kanun ve 4250 Sayılı Kanun gereği alkollü içeceklerin
                  18 yaşından küçüklere satışı ve sunumu yasaktır.
                </p>
                <button
                  onClick={() => setDenied(false)}
                  className="text-primary-700 text-sm font-semibold hover:underline"
                >
                  Geri Dön
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Yaş Doğrulaması</h2>
                  <p className="text-gray-500 text-sm">
                    Bu web sitesine erişmek için 18 yaşından büyük olmanız gerekmektedir.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
                  <p className="text-orange-800 text-xs text-center font-medium leading-relaxed">
                    Alkol sağlığa zararlıdır. Alkol dostunuz değildir.
                    <br />18 yaşından küçüklere alkol satışı yasaktır.
                  </p>
                </div>

                <p className="text-center text-sm font-semibold text-gray-700 mb-6">
                  18 yaşından büyük müsünüz?
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handleYes}
                    className="flex-1 py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-all text-sm"
                  >
                    Evet
                  </button>
                  <button
                    onClick={() => setDenied(true)}
                    className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all text-sm"
                  >
                    Hayır
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                    Bu siteye girerek, 4733 Sayılı Tütün, Tütün Mamulleri ve Alkollü İçkiler
                    Piyasası Düzenleme Kurumu Kanunu ve 4250 Sayılı İspirto ve İspirtolu İçkiler
                    İnhisarı Kanunu kapsamında 18 yaşından büyük olduğunuzu teyit etmiş olursunuz.
                    Bu site herhangi bir alkollü içki markasının satışını, pazarlamasını veya aracı
                    hizmetini yapmamaktadır. İçerikler tamamen bilgilendirme amaçlıdır.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
