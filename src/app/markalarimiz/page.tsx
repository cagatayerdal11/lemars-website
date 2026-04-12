import Link from "next/link";

export default function Markalarimiz() {
  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Ürün Portföyü
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
            Markalarımız
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            Geniş ürün portföyümüzle işletmenizin ihtiyacına uygun
            çözümler sunuyoruz.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Sattığımız Ürünler
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Marka Portföyümüz
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Dünya ve Türkiye&apos;nin önde gelen içecek markalarını
              işletmenize ulaştırıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Placeholder cards - marka logoları buraya eklenecek */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <p className="text-gray-300 text-sm font-medium text-center">
                  Marka Logosu
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm mb-6">
              Ürün portföyümüz ve fiyat bilgileri için bizimle iletişime geçin.
            </p>
            <Link href="/iletisim" className="btn-primary">
              Fiyat Bilgisi Alın
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
