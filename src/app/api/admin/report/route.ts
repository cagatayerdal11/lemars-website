import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/admin";
import { buildReport } from "@/lib/reporting/report";
import { isPeriodKey } from "@/lib/reporting/periods";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const periodParam = req.nextUrl.searchParams.get("period") || "last30";
  const key = isPeriodKey(periodParam) ? periodParam : "last30";
  const fresh = req.nextUrl.searchParams.get("fresh") === "1";

  try {
    const report = await buildReport(key, { fresh });
    return NextResponse.json(report);
  } catch {
    // Detay (credential/hata) public'e sızdırılmaz.
    return NextResponse.json(
      { error: "Rapor oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
