import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, company, email, phone, subject, message } = await request.json();

    const subjectMap: Record<string, string> = {
      tedarik: "Tedarik Talebi",
      fiyat: "Fiyat Bilgisi",
      isbirligi: "İş Birliği",
      diger: "Diğer",
    };

    const emailSubject = `Yeni İletişim Formu: ${subjectMap[subject] || "Genel"}`;

    await resend.emails.send({
      from: "LeMars Web <onboarding@resend.dev>",
      to: ["info@lemars.com.tr"],
      subject: emailSubject,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Ad Soyad</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Şirket</td><td style="padding:8px;border-bottom:1px solid #eee;">${company || "-"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">E-posta</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Konu</td><td style="padding:8px;border-bottom:1px solid #eee;">${subjectMap[subject] || "-"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;" colspan="2">Mesaj</td></tr>
          <tr><td style="padding:8px;" colspan="2">${message}</td></tr>
        </table>
        <hr style="margin-top:20px;" />
        <p style="font-size:12px;color:#999;">Bu mesaj lemars.com.tr iletişim formundan gönderilmiştir.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    return NextResponse.json({ error: "E-posta gönderilemedi" }, { status: 500 });
  }
}
