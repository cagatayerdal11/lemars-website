/**
 * LEMARS — Google service-account access token (server-only).
 *
 * Bu modül yalnızca server tarafında (route handler / server component) import
 * edilmelidir; browser bundle'ına girmez. Secret'lar env'den okunur.
 */

import { JWT } from "google-auth-library";

export const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
export const SEARCH_CONSOLE_SCOPE =
  "https://www.googleapis.com/auth/webmasters.readonly";

/** GOOGLE_PRIVATE_KEY genelde \n kaçışlı saklanır — gerçek newline'a çevir. */
function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  // Bazı panolar key'i çift tırnakla sarar.
  if (key.startsWith('"') && key.endsWith('"')) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}

export function hasGoogleCredentials(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY
  );
}

// Scope başına client cache — google-auth-library token'ı client üzerinde cache'ler.
const clientCache = new Map<string, JWT>();

export async function getAccessToken(scope: string): Promise<string> {
  if (!hasGoogleCredentials()) {
    throw new Error("Google servis hesabı kimlik bilgileri tanımlı değil.");
  }

  let client = clientCache.get(scope);
  if (!client) {
    client = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY || ""),
      scopes: [scope],
    });
    clientCache.set(scope, client);
  }

  const { access_token } = await client.authorize();
  if (!access_token) {
    throw new Error("Google access token alınamadı.");
  }
  return access_token;
}
