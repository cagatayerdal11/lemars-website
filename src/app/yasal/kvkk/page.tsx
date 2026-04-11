export const metadata = {
  title: "KVKK Aydınlatma Metni | LeMars Gıda İçecek",
};

export default function KVKK() {
  return (
    <>
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">KVKK Aydınlatma Metni ve Çerez Politikası</h1>
          <p className="text-gray-400 mt-4">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Veri Sorumlusu</h2>
              <p>
                LeMars Gıda İçecek Sanayi ve Ticaret Limited Şirketi olarak, 6698 Sayılı Kişisel Verilerin
                Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi
                aşağıda açıklanan amaçlar doğrultusunda işlemekteyiz.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Toplanan Kişisel Veriler</h2>
              <p>İletişim formumuz aracılığıyla aşağıdaki kişisel veriler toplanmaktadır:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Ad ve soyad</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>Şirket/işletme adı</li>
                <li>İletişim mesajı içeriği</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Verilerin İşlenme Amacı</h2>
              <p>Kişisel verileriniz yalnızca aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>İletişim taleplerinize yanıt verilmesi</li>
                <li>Ticari iletişim ve bilgilendirme faaliyetleri</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Verilerin Aktarılması</h2>
              <p>
                Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmamaktadır.
                Verileriniz yurt dışına aktarılmamaktadır.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Çerez Politikası</h2>
              <p>
                Bu web sitesi, kullanıcı deneyimini iyileştirmek amacıyla çerez (cookie) kullanabilmektedir.
                Zorunlu çerezler sitenin düzgün çalışması için gereklidir. Analitik veya pazarlama amaçlı
                çerez kullanılmamaktadır.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Haklarınız</h2>
              <p>KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                <li>KVKK&apos;nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. İletişim</h2>
              <p>
                KVKK kapsamındaki haklarınızı kullanmak için{" "}
                <a href="mailto:info@lemars.com.tr" className="text-primary-700 font-semibold hover:underline">
                  info@lemars.com.tr
                </a>{" "}
                adresine başvurabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
