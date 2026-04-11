"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ageVerified = sessionStorage.getItem("lemars-age-verified");
    setVerified(ageVerified === "true");
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!birthDate) {
      setError("Lütfen doğum tarihinizi seçiniz.");
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age >= 18) {
      sessionStorage.setItem("lemars-age-verified", "true");
      setVerified(true);
    } else {
      setDenied(true);
    }
  };

  // Max date: bugünden 18 yıl öncesi değil, bugün (doğrulama kodda yapılıyor)
  const today = new Date().toISOString().split("T")[0];

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
          {/* Logo - koyu arka planla uyumlu */}
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
                  onClick={() => { setDenied(false); setBirthDate(""); }}
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
                    Bu web sitesine erişmek için lütfen doğum tarihinizi seçiniz.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-orange-800 text-xs text-center font-medium leading-relaxed">
                    Alkol sağlığa zararlıdır. Alkol dostunuz değildir.
                    <br />18 yaşından küçüklere alkol satışı yasaktır.
                  </p>
                </div>

                <form onSubmit={handleVerify}>
                  <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider text-center">
                    Doğum Tarihiniz
                  </label>

                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={today}
                    min="1920-01-01"
                    required
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
                  />

                  {error && (
                    <p className="text-red-600 text-xs text-center mt-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-6 py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-all text-sm"
                  >
                    Giriş Yap
                  </button>
                </form>

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
