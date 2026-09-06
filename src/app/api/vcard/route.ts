import { NextResponse } from "next/server";

// vCard 3.0 — maximum compatibility with iOS, Android, Outlook, Google Contacts
// Served with text/vcard charset=utf-8 so Turkish characters render correctly.
export async function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:LEMARS Gıda İçecek",
    "N:LEMARS Gıda İçecek;;;;",
    "ORG:LEMARS Gıda İçecek Sanayi ve Ticaret Ltd. Şti.",
    "TITLE:Toptan Tedarik ve Dağıtım",
    "TEL;TYPE=WORK,VOICE:+902128091883",
    "TEL;TYPE=CELL,VOICE:+905553643434",
    "EMAIL;TYPE=WORK,INTERNET:info@lemarsgida.com",
    "ADR;TYPE=WORK:;;Cihangir Mah. Güvercin Cd. No: 2/90-91;Avcılar/İstanbul;;34310;Türkiye",
    "URL:https://www.lemarsgida.com",
    // "TAPDK" ibaresi kaldırıldı: TAPDK kapatılmış, görevleri T.C. Tarım ve Orman
    // Bakanlığı Tütün ve Alkol Dairesi Başkanlığına devredilmiştir. Kartvizit yalnızca
    // nötr kurumsal künye taşır; ürün/marka tanıtımı içermez.
    "NOTE:Çalışma Saatleri: Pazartesi-Cuma 09:00-18:00 | B2B toptan tedarik ve dağıtım. Tüketiciye satış yapılmaz.",
    "END:VCARD",
    "",
  ].join("\r\n");

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="LEMARS.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
