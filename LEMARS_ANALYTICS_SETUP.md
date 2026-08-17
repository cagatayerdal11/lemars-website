# LEMARS — Dijital Performans Sistemi Kurulum Rehberi

Bu rehber teknik bilgi gerektirmeden, adım adım kurulumu anlatır. Sırasıyla
takip edin. Sonundaki **MANUAL ACTION REQUIRED** listesi yapılacakların özetidir.

Sistem 3 parçadan oluşur:
1. **Ölçüm** — Google Analytics 4 (siteyi kimin kullandığı) + Search Console (Google görünürlüğü)
2. **Yönetim paneli** — `/admin/rapor` (parola korumalı, Türkçe)
3. **Otomatik aylık e-posta** — her ayın 4'ünde geçen ayın raporu

---

## 1) Google Analytics (GA4)

1. <https://analytics.google.com> → **Admin (⚙)** → **Create → Property**.
2. Property adı: `LEMARS`. Zaman dilimi: **(GMT+03:00) Istanbul**. Para birimi: TRY.
3. **Data Streams → Add stream → Web** → URL: `https://www.lemarsgida.com`, ad: `LEMARS Web`.
4. Açılan ekrandaki **Measurement ID** (`G-XXXXXXXXXX`) değerini kopyalayın →
   `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
5. **Property ID** (sadece rakam): Admin → **Property Settings** → sağ üstteki
   sayı → `GA4_PROPERTY_ID`.
6. **Custom dimensions** (kırılımların görünmesi için — önemli):
   Admin → **Custom definitions → Create custom dimension**. Aşağıdakileri
   *Event* kapsamında, parametre adlarıyla birebir aynı ekleyin:
   | Dimension name | Scope | Event parameter |
   |---|---|---|
   | Action Type | Event | `action_type` |
   | CTA Location | Event | `cta_location` |
   | Network | Event | `network` |

   > Bu adım yapılmazsa temel sayılar yine gelir; sadece WhatsApp/Telefon/E-posta/Form
   > **kırılımı** boş görünür.

## 2) Google Search Console

1. <https://search.google.com/search-console> → **Add property**.
2. **URL prefix** seçin ve `https://www.lemarsgida.com/` girin (veya alan adı
   doğrulaması yaptıysanız **Domain** → `lemarsgida.com`).
3. Doğrulamayı tamamlayın (site zaten sizinse muhtemelen otomatik).
4. Seçtiğiniz değeri `SEARCH_CONSOLE_SITE_URL`'e yazın:
   - URL prefix ise: `https://www.lemarsgida.com/`
   - Domain ise: `sc-domain:lemarsgida.com`

## 3) Google Cloud / Servis Hesabı (raporları sunucunun çekmesi için)

1. <https://console.cloud.google.com> → üstten proje oluşturun: `lemars-reporting`.
2. **APIs & Services → Enable APIs** → şu ikisini etkinleştirin:
   - **Google Analytics Data API**
   - **Google Search Console API** (veya "Search Console API")
3. **APIs & Services → Credentials → Create credentials → Service account**.
   - Ad: `lemars-reporting`. Oluşturun, rol vermeden bitirin.
4. Oluşan servis hesabına tıklayın → **Keys → Add key → Create new key → JSON**.
   İnen dosyayı açın; içindeki:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (tüm `\n`'lerle birlikte, çift tırnak içinde)
5. **GA4 erişimi ver:** GA4 → Admin → **Property Access Management → +** →
   servis hesabı e-postasını ekleyin, rol **Viewer**.
6. **Search Console erişimi ver:** Search Console → **Settings → Users and
   permissions → Add user** → servis hesabı e-postası, izin **Full** (veya Restricted).

> **Güvenlik:** JSON anahtar dosyasını repoya koymayın. Değerler yalnızca env
> değişkeni olarak girilir. `.gitignore` `.env*` ve `*.pem` dosyalarını zaten yok sayar.

## 4) E-posta (Resend — zaten kurulu)

1. <https://resend.com> → **API Keys** → mevcut/yeni key → `RESEND_API_KEY`.
2. **Domains → Add domain** → `lemarsgida.com` → gösterilen DNS kayıtlarını ekleyin,
   doğrulanmasını bekleyin.
3. `REPORT_EMAIL_FROM` = `LEMARS Raporlama <rapor@lemarsgida.com>` (doğrulanmış domain).
4. `REPORT_EMAIL_TO` = raporu alacak adres(ler), virgülle: `yonetim@lemarsgida.com,info@lemarsgida.com`.

## 5) Admin paneli parolası

1. Güçlü bir parola belirleyin. Güvenli (tuzlu scrypt) hash'ini üretin (Terminal,
   proje klasöründe):
   ```bash
   node scripts/generate-admin-hash.mjs 'GUCLU_PAROLANIZ'
   ```
   Çıkan `scrypt$...$...` değerini olduğu gibi → `ADMIN_PASSWORD_HASH`.
   (Parola hiçbir yere kaydedilmez; sadece hash saklanır.)
2. Oturum ve cron anahtarları:
   ```bash
   openssl rand -hex 32   # ADMIN_SESSION_SECRET
   openssl rand -hex 32   # CRON_SECRET
   ```

## 6) Vercel ortam değişkenleri

Vercel → **Project (lemars-website) → Settings → Environment Variables** →
aşağıdakileri **Production** (ve istenirse Preview) için ekleyin:

| Değişken | Tür | Açıklama |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | GA4 Measurement ID (G-…) |
| `NEXT_PUBLIC_SITE_URL` | Public | `https://www.lemarsgida.com` |
| `GA4_PROPERTY_ID` | Secret | GA4 property numarası |
| `GOOGLE_CLIENT_EMAIL` | Secret | Servis hesabı e-postası |
| `GOOGLE_PRIVATE_KEY` | Secret | Servis hesabı private key (\n'lerle) |
| `SEARCH_CONSOLE_SITE_URL` | Secret | SC property URL'i |
| `RESEND_API_KEY` | Secret | Resend API key |
| `REPORT_EMAIL_FROM` | Secret | Gönderen |
| `REPORT_EMAIL_TO` | Secret | Alıcı(lar) |
| `ADMIN_PASSWORD_HASH` | Secret | Parola SHA-256 hex |
| `ADMIN_SESSION_SECRET` | Secret | Oturum imza anahtarı |
| `CRON_SECRET` | Secret | Cron koruması |

> `GOOGLE_PRIVATE_KEY`'i Vercel'e yapıştırırken JSON'daki `\n`'leri olduğu gibi
> bırakın; kod bunları otomatik gerçek satır sonuna çevirir.

Ardından **Deploy** (yeni bir push veya Vercel'de "Redeploy").

## 7) Cron (aylık e-posta)

- `vercel.json` içindeki cron **her ayın 4'ü, 06:00 UTC ≈ 09:00 Türkiye** çalışır.
- Vercel Cron, isteği otomatik olarak `Authorization: Bearer <CRON_SECRET>` ile
  çağırır; `CRON_SECRET`'i Vercel'de tanımlamanız yeterlidir.
- **Not (Vercel Hobby planı):** Cron'lar günde bir kez tetiklenebilir ve tam
  saatinde değil, o saat *içinde* çalışabilir. Aylık rapor için bu sorun değildir.
  Pro planda tetikleme daha hassastır.

## 8) Admin girişi

1. `https://www.lemarsgida.com/admin/rapor` adresine gidin.
2. Parolanızı girin (adım 5). Panel açılır.
3. Üstten dönem seçebilir, **Verileri Yenile / Test E-mail / Yazdır** yapabilir,
   **Çıkış** ile oturumu kapatabilirsiniz.

---

## Test

1. **Canlı event testi:** Siteyi açın, çerez banner'ında **Kabul Et**'e basın.
   GA4 → **Reports → Realtime**. WhatsApp / telefon / e-posta / form / Instagram /
   LinkedIn / dil değiştir aksiyonlarını yapın; `contact_action`, `social_click`,
   `language_change` event'lerini Realtime'da görün.
2. **Consent testi:** Çerezi **Reddet** dediğinizde event GİTMEMELİ (Realtime boş).
3. **Dashboard:** `/admin/rapor` → doğru parola girer, veriler yüklenir. Yanlış
   parola reddedilir. Kaynak yapılandırılmamışsa uyarı görünür (panel boş kalmaz).
4. **Test e-posta:** Panelde **Test E-mail Gönder** → onay → gelen kutusunu kontrol edin.
5. **Cron testi (manuel):**
   ```bash
   curl -H "Authorization: Bearer <CRON_SECRET>" https://www.lemarsgida.com/api/cron/monthly-report
   ```
   Yetkisiz istek (header'sız) **401** dönmeli.

---

## MANUAL ACTION REQUIRED

Aşağıdakiler kod ile yapılamaz; sizin yapmanız gerekir:

```
[ ] GA4 property + web data stream oluştur → Measurement ID + Property ID al
[ ] GA4'te custom dimensions ekle: action_type, cta_location, network
[ ] Search Console property'yi doğrula
[ ] Google Cloud'da GA Data API + Search Console API'yi etkinleştir
[ ] Servis hesabı oluştur + JSON key indir
[ ] Servis hesabına GA4 property'de Viewer erişimi ver
[ ] Servis hesabına Search Console'da kullanıcı erişimi ver
[ ] Resend'de lemarsgida.com domainini doğrula, from adresini ayarla
[ ] Admin parolası belirle → SHA-256 hash üret
[ ] ADMIN_SESSION_SECRET ve CRON_SECRET üret (openssl rand -hex 32)
[ ] Tüm environment variable'ları Vercel'e gir
[ ] Production deploy et
[ ] GA4 Realtime'da event testini yap (kabul + reddet)
[ ] /admin/rapor girişini test et
[ ] Test rapor e-postası gönder
```

## UTM standardı (website dışı linkler için)

Sosyal medya bio'ları ve dış linkler için UTM etiketleme standardı ayrı dosyada:
**[`LEMARS_UTM_GUIDE.md`](./LEMARS_UTM_GUIDE.md)**. Mevcut linkleri değiştirmeden
önce oradaki hazır linkleri kullanın.
