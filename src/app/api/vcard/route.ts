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
    "TITLE:Toptan Alkollü İçecek Dağıtımı",
    "TEL;TYPE=WORK,VOICE:+902128091883",
    "TEL;TYPE=CELL,VOICE:+905553643434",
    "EMAIL;TYPE=WORK,INTERNET:info@lemarsgida.com",
    "ADR;TYPE=WORK:;;Cihangir Mah. Güvercin Cd. No: 2/90-91;Avcılar/İstanbul;;34310;Türkiye",
    "URL:https://www.lemarsgida.com",
    "NOTE:Çalışma Saatleri: Pazartesi-Cuma 09:00-18:00 | TAPDK Lisanslı Toptan Alkollü İçecek Dağıtımı",
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
