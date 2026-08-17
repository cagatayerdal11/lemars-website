import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth/session";
import { isAdminConfigured } from "@/lib/auth/admin";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export default function RaporPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-lg font-bold text-gray-900 mb-2">
            Yönetim paneli henüz yapılandırılmadı
          </h1>
          <p className="text-sm text-gray-500">
            <code>ADMIN_PASSWORD_HASH</code> ve{" "}
            <code>ADMIN_SESSION_SECRET</code> ortam değişkenleri tanımlandıktan
            sonra bu panel kullanılabilir. Kurulum için{" "}
            <code>LEMARS_ANALYTICS_SETUP.md</code> dosyasına bakın.
          </p>
        </div>
      </div>
    );
  }

  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  return <Dashboard />;
}
