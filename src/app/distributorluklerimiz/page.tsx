import Link from "next/link";

export default function Distributorluklerimiz() {
  return (
    <>
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            İş Ortaklarımız
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            Distribütörlüklerimiz
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            Türkiye&apos;nin ve dünyanın önde gelen içecek üreticilerinin
            İstanbul Avrupa Yakası distribütörüyüz.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary-700 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Çalıştığımız Firmalar
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Distribütörlük Portföyümüz
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Aşağıdaki firmaların yetkili distribütörü olarak İstanbul Avrupa Yakası genelinde
              toptan satış ve dağıtım hizmeti sunmaktayız.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Placeholder cards - firma logoları buraya eklenecek */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <p className="text-gray-300 text-sm font-medium text-center">
                  Firma Logosu
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm mb-6">
              Distribütörlük portföyümüz hakkında detaylı bilgi almak için bizimle iletişime geçin.
            </p>
            <Link href="/iletisim" className="btn-primary">
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
