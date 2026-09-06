/**
 * Site genelinde görünen yasal bilgilendirme bandı.
 *
 * NOT: Bileşen adı geçmişten gelen "TAPDKBanner" olarak korunmuştur (iç isimlendirme).
 * Kullanıcıya görünen metinde "TAPDK" ibaresi KULLANILMAZ: TAPDK kapatılmış olup
 * görevleri T.C. Tarım ve Orman Bakanlığı Tütün ve Alkol Dairesi Başkanlığına
 * devredilmiştir. Bant metni i18n `tapdk.banner` anahtarından gelir.
 */
interface TAPDKBannerDict {
  banner: string;
}

export default function TAPDKBanner({ dict }: { dict: TAPDKBannerDict }) {
  return (
    <div className="bg-gray-900 text-gray-400 text-center py-2 px-4">
      <p className="text-[10px] tracking-wider">
        {dict.banner}
      </p>
    </div>
  );
}
