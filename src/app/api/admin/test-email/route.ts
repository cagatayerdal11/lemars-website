import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/admin";
import { sendMonthlyReport } from "@/lib/email/send-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const result = await sendMonthlyReport({ isTest: true });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    sent: result.sent,
    monthName: result.monthName,
  });
}
