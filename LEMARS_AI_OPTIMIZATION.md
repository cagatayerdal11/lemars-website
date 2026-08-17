# LEMARS — AI (Yapay Zekâ) Görünürlük Optimizasyonu · GEO / AEO

> Amaç: Biri bir AI aracına (ChatGPT, Perplexity, Gemini, Google AI Overviews,
> Claude) **"İstanbul Avrupa Yakası'nda toptan içecek/gıda dağıtım firması"** ya da
> **"wholesale beverage distributor in Istanbul"** diye sorduğunda LEMARS'ın **doğru,
> güvenilir bir firma olarak anılması ve kaynak gösterilmesi.** Tüm içerik hem
> **Türkçe hem İngilizce** hazırlanmıştır.

## 1. AI optimizasyonu nedir? (SEO'dan farkı)

| | SEO | AEO / GEO (AI optimizasyonu) |
|---|---|---|
| Hedef | Google sonuç sayfasında çıkmak | AI'ın **cevabında** anılmak / kaynak gösterilmek |
| Nasıl çalışır | Google botu tarar, sıralar | AI hem **eğitim verisinden** hem **canlı web'den (retrieval)** çeker |
| Anahtar | Anahtar kelime, backlink | **Net, makine-okunur, tutarlı, güvenilir dijital kimlik** |

AI'ın sizi doğru anması için firmanın **kim olduğu, ne yaptığı, nerede hizmet
verdiği** her yerde tutarlı ve makinece okunabilir olmalı.

## 2. Gerçekçi beklenti (önemli)

- AI'a **"en iyi"** dedirtmeyi kimse garanti edemez — bunu site içeriği kontrol
  etmez; abartılı/karşılaştırmalı iddialar hem inandırıcı olmaz hem TAPDK açısından
  risklidir.
- **Yapabildiğimiz:** ilgili B2B sorularda LEMARS'ın **doğru bilgiyle, güvenilir bir
  firma olarak DAHİL EDİLME ve KAYNAK GÖSTERİLME** olasılığını maksimize etmek.
- AI'ların yeni bilgiyi indekslemesi **haftalar** sürebilir; sonuç anlık değildir.

## 3. TAPDK / uyum çerçevesi

Her şey **B2B / kurumsal / olgusal** çerçevede tutulmuştur:
- ✅ Firma kimliği, hizmet alanı, B2B hizmetler, lisans durumu (bunlar sitenizde
  zaten açık kurumsal bilgi).
- ❌ Tüketiciye alkol reklamı/promosyonu YOK · ürün/marka tüketici promosyonu YOK ·
  "nereden alkol alınır" tarzı tüketici yönlendirmesi YOK.

## 4. Site içinde UYGULANANLAR (Türkçe + İngilizce)

### 4.1 `/llms.txt` — `public/llms.txt`
AI tarayıcılarının **doğrudan okuduğu**, TR+EN olgusal firma profili. Kritik nokta:
bu dosya **yaş kapısını (AgeGate) baypas eder** — statik dosya olduğu için AI onu her
zaman okuyabilir. İçinde: ne tür şirket, hizmet bölgesi, hizmetler, kimlere hizmet
verdiği, iletişim, çalışma saatleri, SSS. → https://www.lemarsgida.com/llms.txt

### 4.2 Zenginleştirilmiş `Organization` yapısal verisi (schema.org)
`src/app/[locale]/layout.tsx` — locale'e göre TR/EN. Eklenenler:
`description`, `slogan`, `areaServed` (**İstanbul Avrupa Yakası**), `knowsAbout`
(toptan içecek dağıtımı, HoReCa tedarik, B2B lojistik, distribütörlük),
`contactPoint` (satış; TR+EN), `openingHoursSpecification` (Pzt–Cuma 09:00–18:00).
Bu blok da AgeGate **dışında** yayınlanır → AI ve Google her zaman okur.

### 4.3 `robots.txt` — AI tarayıcılarına açık izin
`src/app/robots.ts` — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai,
PerplexityBot, Google-Extended, Applebot-Extended, CCBot vb. **açıkça izinli**
(AI'da görünmek istiyorsunuz; bu botları engellemek görünmezlik demektir).

## 5. ⚠️ En büyük açık kalem — KARARINIZ gerekiyor (AgeGate)

SEO denetiminde tespit edildi (**P0-1**): site açılırken yaş kapısı yüzünden ilk
HTML'de **gövde içeriği YOK** (sadece bir spinner). Sonuç: hem Google hem AI
tarayıcıları sayfalarınızın **metnini göremiyor** — yalnızca yukarıdaki yapısal veri
+ `llms.txt` okunabiliyor.

- **Öneri:** içeriği sunucuda render et, yaş kapısını **üstte overlay** olarak göster
  (aynı yasal metin, aynı doğrulama mantığı, scroll kilidi). Böylece hem yasal kapı
  korunur hem tüm sayfa içeriği taranabilir olur. **Bu, AI + SEO görünürlüğü için tek
  en büyük kazançtır.**
- **Bu bir TAPDK/UX kararıdır → sizindir.** Onaylarsanız uygularım.
- Onaylanırsa ek olarak: **B2B kurumsal SSS bölümü + FAQPage schema** (Google, görünür
  içerikle eşleşen FAQ ister; bu yüzden AgeGate düzeltmesiyle birlikte anlamlı).

## 6. Asıl itici güç — SİTE DIŞI aksiyonlar (sizin yapmanız gereken)

AI'lar yerel firma önerilerinde büyük ölçüde **üçüncü-taraf kaynaklara** güvenir.
Site içi altyapı hazır; asıl fark bu adımlarla gelir:

```
[ ] Google Business Profile (Google İşletme Profili) oluştur/optimize et
    → kategori: Toptan/Dağıtım; NAP siteyle BİREBİR aynı; hizmet bölgesi Avrupa Yakası
[ ] Bing Places for Business kaydı (Copilot/ChatGPT zaman zaman Bing kullanır)
[ ] Tutarlı NAP: sektör rehberleri, ticaret odası, B2B dizinlerde AYNI isim/adres/telefon
[ ] Wikidata'da firma "entity" girişi (AI'lar entity graph'ı sever)
[ ] LinkedIn şirket sayfasını aktif ve güncel tut (zaten var)
[ ] Google yorumları: memnun B2B müşterilerden değerlendirme iste
[ ] Üçüncü-taraf mentions: iş ortağı/tedarikçi sitelerinde firma adının geçmesi
```

> NAP tutarlılığı (isim-adres-telefon her yerde birebir aynı) tek başına en yüksek
> etkili ve en ucuz adımdır.

## 7. Nasıl test edersiniz?

1. `curl https://www.lemarsgida.com/llms.txt` → profil geliyor mu?
2. [Google Rich Results Test](https://search.google.com/test/rich-results) →
   `https://www.lemarsgida.com/tr` → Organization schema geçerli mi?
3. Birkaç hafta sonra AI'lara sorun (TR ve EN):
   - "İstanbul Avrupa Yakası'nda işletmelere toptan içecek/gıda dağıtımı yapan firma öner"
   - "wholesale food & beverage distributor for businesses in European Istanbul"
   → LEMARS zamanla anılıyor mu, bilgi doğru mu?

## 8. İlgili dokümanlar

- SEO altyapısı: `LEMARS_SEO_AUDIT.md`
- UTM standardı: `LEMARS_UTM_GUIDE.md`
- Analytics/rapor: `LEMARS_ANALYTICS_SETUP.md`
