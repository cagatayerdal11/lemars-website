import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Sayfa bulunamadı
        </h1>
        <p className="text-gray-500 mb-2 max-w-md mx-auto">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          The page you are looking for may have been moved or removed.
        </p>
        <Link href="/tr" className="btn-primary">
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}
