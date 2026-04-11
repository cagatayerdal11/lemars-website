export const metadata = {
  title: "Sorumluluk Reddi | LeMars Gıda İçecek",
};

export default function SorumlulukReddi() {
  return (
    <>
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Sorumluluk Reddi Beyanı</h1>
          <p className="text-gray-400 mt-4">Yasal Uyarı ve Feragat Bildirimi</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Genel Bilgilendirme</h2>
              <p>
                Bu web sitesinde yer alan bilgiler, LeMars Gıda İçecek Sanayi ve Ticaret Limited Şirketi
                tarafından genel bilgilendirme amacıyla sunulmaktadır. Bu site, herhangi bir alkollü içki
                markasının satışını, pazarlamasını veya aracı hizmetini yapmamaktadır.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Reklam Yasağı Uyumu</h2>
              <p>
                Bu site, 4733 Sayılı Kanun ve 4250 Sayılı İspirto ve İspirtolu İçkiler İnhisarı Kanunu ile
                TAPDK düzenlemelerinin reklam ve tanıtım yasağı hükümlerine tam uyum gösterecek şekilde
                hazırlanmıştır. Sitede yer alan hiçbir içerik, alkollü içecek tüketimini teşvik veya
                özendirme amacı taşımamaktadır.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Bilgilerin Doğruluğu</h2>
              <p>
                Sitede sunulan bilgilerin doğruluğu ve güncelliği konusunda azami özen gösterilmekle birlikte,
                bu bilgilerin eksiksiz, doğru veya güncel olduğuna dair herhangi bir garanti verilmemektedir.
                LeMars Gıda İçecek, sitedeki bilgilerin kullanılmasından doğabilecek doğrudan veya dolaylı
                zararlardan sorumlu tutulamaz.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Üçüncü Taraf Bağlantıları</h2>
              <p>
                Bu site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu bağlantılar kolaylık
                sağlamak amacıyla sunulmakta olup, söz konusu sitelerin içeriklerinden veya gizlilik
                politikalarından LeMars Gıda İçecek sorumlu değildir.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Sorumluluk Sınırlaması</h2>
              <p>
                Sitedeki bilgilerin yanlış kullanımından, eksik veya hatalı anlaşılmasından doğacak
                zararlardan LeMars Gıda İçecek yönetimi sorumlu tutulamaz. Kullanıcılar, sitedeki
                bilgileri kendi sorumluluklarında kullanmayı kabul eder.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <p className="text-orange-800 text-sm font-medium text-center leading-relaxed">
                Alkol sağlığa zararlıdır. Alkol dostunuz değildir.
                <br />
                18 yaşından küçüklere alkollü içecek satışı ve sunumu, 4733 ve 4250 Sayılı
                Kanunlar kapsamında yasaktır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
