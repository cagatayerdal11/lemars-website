import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Kurumsal iletişim formu API'si.
 *
 * MEVZUAT NOTU: "Fiyat Bilgisi" gibi fiyat/teklif konuları kaldırılmıştır
 * (Satış ve Sunum Yönetmeliği m.21/2-3: marka bazlı bildirim ve fiyat duyurusu
 * yasağı; aykırı fiyat bildirimi reklam sayılır). Konu başlıkları beyaz liste ile
 * doğrulanır. Form yalnızca kurumsal iletişimdir; sipariş/satış aracı değildir ve
 * gönderim için tüketici-yönelik olmadığına dair onay (acknowledge) zorunludur.
 *
 * GÜVENLİK: Tüm kullanıcı girdileri uzunluk/format bakımından doğrulanır ve
 * giden e-posta HTML'ine yerleştirilmeden önce escape edilir (HTML injection'a karşı).
 */

const ALLOWED_SUBJECTS = [
  "Kurumsal Bilgi Talebi",
  "Tedarik Süreci",
  "İş Birliği",
  "Diğer",
  "Corporate Enquiry",
  "Supply Process",
  "Partnership",
  "Other",
];

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(s: string): boolean {
  return s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

// İç bilgilendirme — yalnızca personele (Meta WhatsApp Business API). Kamuya açık
// bir CTA değildir; env anahtarları yoksa sessizce atlanır.
async function sendStaffNotification(data: {
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
    `*Yeni Kurumsal İletişim Formu*`,
    ``,
    `*Ad:* ${data.name}`,
    data.company ? `*Şirket:* ${data.company}` : null,
    `*E-posta:* ${data.email}`,
    `*Telefon:* ${data.phone}`,
    data.subject ? `*Konu:* ${data.subject}` : null,
    ``,
    `*Mesaj:*`,
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
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
    });
  } catch {
    // İç bildirim opsiyonel — e-posta asıl kanal.
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return bad("Geçersiz istek gövdesi.");
  }

  const name = String(body.name ?? "").trim();
  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const acknowledge = body.acknowledge === true;

  // Sunucu tarafı doğrulama (istemci kontrolünden bağımsız).
  if (!name || name.length > 120) return bad("Ad Soyad gereklidir (en fazla 120 karakter).");
  if (!isValidEmail(email)) return bad("Geçerli bir e-posta adresi gereklidir.");
  if (company.length > 160) return bad("Şirket adı çok uzun.");
  if (phone.length > 40) return bad("Telefon numarası çok uzun.");
  if (!message || message.length > 5000) return bad("Mesaj gereklidir (en fazla 5000 karakter).");
  if (subject && !ALLOWED_SUBJECTS.includes(subject)) return bad("Geçersiz konu başlığı.");
  if (!acknowledge) {
    return bad(
      "Formu göndermek için, bu formun tüketiciye yönelik sipariş/satış/tanıtım amacı taşımadığını onaylamanız gerekir."
    );
  }

  const safeSubject = ALLOWED_SUBJECTS.includes(subject) ? subject : "Genel";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY tanımlı değil — form e-postası gönderilemedi.");
    return NextResponse.json(
      { error: "E-posta servisi yapılandırılmamış." },
      { status: 503 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: "LEMARS Gıda İçecek <onboarding@resend.dev>",
        to: ["info@lemarsgida.com"],
        subject: `Yeni Kurumsal İletişim Formu: ${escapeHtml(safeSubject)}`,
        html: `
          <h2>Yeni Kurumsal İletişim Formu Mesajı</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Ad Soyad</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Şirket</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(company) || "-"}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">E-posta</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Konu</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(safeSubject)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;" colspan="2">Mesaj</td></tr>
            <tr><td style="padding:8px;white-space:pre-wrap;" colspan="2">${escapeHtml(message)}</td></tr>
          </table>
          <hr style="margin-top:20px;" />
          <p style="font-size:12px;color:#999;">Bu mesaj lemarsgida.com kurumsal iletişim formundan gönderilmiştir.</p>
        `,
      }),
      sendStaffNotification({ name, company, email, phone, subject: safeSubject, message }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    // PII loglanmaz — yalnızca hata türü.
    console.error(
      "İletişim formu gönderim hatası:",
      error instanceof Error ? error.message : "bilinmeyen hata"
    );
    return NextResponse.json({ error: "Mesaj gönderilemedi." }, { status: 500 });
  }
}
