"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace("/admin/rapor");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Giriş başarısız.");
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold tracking-wide text-gray-900">
            LEMARS
          </div>
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-primary-700 mt-1">
            Digital Performance
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-8"
        >
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
            Yönetim Parolası
          </label>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="••••••••"
          />

          {error && (
            <p className="text-red-600 text-xs mt-3" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full mt-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor…" : "Giriş"}
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-6">
          Bu alan yalnızca LEMARS yönetimi içindir.
        </p>
      </div>
    </div>
  );
}
