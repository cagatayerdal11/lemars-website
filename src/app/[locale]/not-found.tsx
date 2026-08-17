import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-white">
      <p className="text-primary-700 text-xs font-bold tracking-[0.3em] uppercase mb-5">
        404
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Sayfa bulunamadı
        <span className="block text-lg font-normal text-gray-400 mt-2">
          Page not found
        </span>
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
      </p>
      <Link href="/tr" className="btn-primary">
        Anasayfaya Dön
      </Link>
    </div>
  );
}
