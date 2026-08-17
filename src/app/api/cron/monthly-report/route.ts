import { NextRequest, NextResponse } from "next/server";
import { sendMonthlyReport } from "@/lib/email/send-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Aylık yönetim raporu cron endpoint'i.
 * Vercel Cron, CRON_SECRET tanımlıysa isteği `Authorization: Bearer <CRON_SECRET>`
 * header'ı ile çağırır. Header eşleşmezse 401 (public spam engellenir).
 * Sensitive secret URL query'sine KONMAZ — yalnızca header kabul edilir.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET sunucuda tanımlı değil." },
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization") || "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (provided !== secret) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const result = await sendMonthlyReport({ isTest: false });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    sent: result.sent,
    monthName: result.monthName,
  });
}
