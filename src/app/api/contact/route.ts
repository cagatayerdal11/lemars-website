import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWhatsAppNotification(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_TOKEN;

  if (!phoneNumberId || !token) return;

  const text = [
    `*Yeni İletişim Formu*`,
    ``,
    `*Ad:* ${data.name}`,
    data.company ? `*Şirket:* ${data.company}` : null,
    `*E-posta:* ${data.email}`,
    `*Telefon:* ${data.phone}`,
    data.subject ? `*Konu:* ${data.subject}` : null,
    ``,
    `*Mesaj:*`,
    data.message,
    ``,
    `_lemarsgida.com iletişim formundan_`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "905553643434",
          type: "text",
          text: { body: text },
        }),
      }
    );
  } catch {
    // WhatsApp bildirimi opsiyonel — e-posta asıl kanal
  }
}

export async function POST(request: Request) {
  try {
    const { name, company, email, phone, subject, message } =
      await request.json();

    const subjectMap: Record<string, string> = {
      tedarik: "Tedarik Talebi",
      fiyat: "Fiyat Bilgisi",
      isbirligi: "İş Birliği",
      diger: "Diğer",
    };

    const emailSubject = `Yeni İletişim Formu: ${subjectMap[subject] || "Genel"}`;

    // E-posta ve WhatsApp bildirimi paralel gönder
    await Promise.all([
      resend.emails.send({
        from: "LEMARS Gıda İçecek <onboarding@resend.dev>",
        to: ["info@lemarsgida.com"],
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
          <p style="font-size:12px;color:#999;">Bu mesaj lemarsgida.com iletişim formundan gönderilmiştir.</p>
        `,
      }),
      sendWhatsAppNotification({
        name,
        company,
        email,
        phone,
        subject: subjectMap[subject] || "Genel",
        message,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    return NextResponse.json(
      { error: "E-posta gönderilemedi" },
      { status: 500 }
    );
  }
}
