# LEMARS — Alkollü İçki Mevzuatı Uyum İncelemesi ve Uygulanan Düzeltmeler

**İnceleme tarihi:** 5 Eylül 2026
**Site:** https://www.lemarsgida.com (TR + EN, Next.js 14.2.35 App Router)
**Çalışma dalı:** `compliance/alkol-mevzuat-uyum` (temel: `bfee389` = `origin/main` = canlı sürüm)
**Kapsam:** Halka açık bütün sayfalar, bileşenler, statik dosyalar, meta veriler, JSON-LD, API çıktıları ve `llms.txt`.

> **UYARI — GARANTİ DEĞİLDİR.** Bu çalışma, doğrulanabilir birincil mevzuat kaynaklarına dayanarak
> tespit edilen riskleri azaltmayı amaçlar. "Site artık yüzde yüz hukuka uygundur" şeklinde bir
> garanti verilmemektedir. Aşağıda **§6**'da sayılan noktalar hukuken tartışmalıdır ve bir hukuk
> müşaviri ile TADAB'dan yazılı görüş alınmasını gerektirir. Bu belge hukuki mütalaa değildir.

---

## 1. Doğrulanan hukuki dayanak

Aşağıdaki hükümlerin tamamı, 5 Eylül 2026 tarihinde **mevzuat.gov.tr** ve **resmigazete.gov.tr**
üzerinden doğrudan indirilerek okunmuştur. Alıntılar birebirdir.

### 1.1 Kanun düzeyi

| # | Atıf | Birebir hüküm (özet alıntı) | Yürürlük | Kaynak |
|---|------|------------------------------|----------|--------|
| K1 | **4250 s.K. m.6/1, 1. cümle** (Yeniden düzenleme: 24/5/2013-6487/2) | "Alkollü içkilerin **her ne surette olursa olsun reklamı ve tüketicilere yönelik tanıtımı yapılamaz.**" | Yürürlükte — **7584/2026 bu cümleyi değiştirmemiştir** | mevzuat.gov.tr `1.3.4250` |
| K2 | **4250 s.K. m.6/1, 2. cümle** | "Bu ürünlerin kullanılmasını ve satışını özendiren veya teşvik eden **kampanya, promosyon ve etkinlik yapılamaz.**" | Yürürlükte | aynı |
| K3 | **4250 s.K. m.6/1, 3. cümle** | Tek istisna: "münhasıran alkollü içkilerin **uluslararası düzeyde tanıtımına yönelik ihtisas fuarları ile bilimsel yayın ve faaliyetler** düzenlenebilir." | Yürürlükte | aynı |
| K4 | **4250 s.K. m.6/1, 4. cümle** (Değişik: 11/6/2026-**7584**/2) | "…her ne surette olursa olsun hiçbir etkinliğe veya **her tür mecrada yapılacak yayın ve paylaşımlara** ticaret unvanları ile ürünlerinin marka, amblem, logoları ile ürünlerin arz ambalajında yer alan ifade, şekil, isim, işaret ve görselleri kullanarak **destek olamazlar.**" | **20/6/2026'dan itibaren yürürlükte, geçiş süresi YOK** | RG 20/6/2026-33286 |
| K5 | **4250 s.K. m.6/1, 5. cümle** (Ek: 7584/2) | Marka/logo/amblem ve ambalaj görselleri "**iş yerlerinin içinde, dışında, vitrinlerinde, satış ünitelerinde ve hiçbir etkinlik alanında** bulundurulamaz." | 20/6/2026; **perakende/açık satış işyerlerine 20/6/2027'ye kadar uyum süresi** (Geç. m.2) | RG 20/6/2026-33286 |
| K6b | **4250 s.K. m.6/2** | "Alkollü içkileri üretenler, ithal edenler ve pazarlayanlar her ne amaçla olursa olsun, **teşvik, hediye, eşantiyon, promosyon veya bedelsiz olarak alkollü içki dağıtamazlar.**" | Yürürlükte (6487/2) | mevzuat.gov.tr |
| K6 | **4250 s.K. m.7/1-(a)** | m.6/1 ve 6/2 yasaklarının ihlalinde idari para cezası. | Yürürlükte | mevzuat.gov.tr |
| K7 | **4733 s.K. m.8/5-(k)** | İnternetten satış yasağı ihlalinde ceza (4250 m.7/1-e bu bende atıf yapar). | Yürürlükte | mevzuat.gov.tr |

**2026 ceza tutarları (yeniden değerlenmiş — Tarım ve Orman Bakanlığı/TADAB'ın 2026 idari para
cezaları cetvellerinden, 5 Eylül 2026'da canlı indirilmiştir):**
- **Reklam / tanıtım yasağı** (4250 m.7/1-a, m.6/1–6/2 ihlali): **103.207 TL – 4.130.222 TL**
- **İnternetten tüketiciye satış** (4733 m.8/5-k): **605.070 TL – 3.025.926 TL** **+ 5651 sayılı Kanun
  uyarınca erişimin engellenmesi**

*Not: Kanun metnindeki nominal tutarlar (5.000–200.000 TL) 2013 tarihlidir; 5326 s.K. m.17/7 uyarınca
her yıl yeniden değerlenmektedir. Yukarıdaki rakamlar Bakanlık cetvelinden alınmıştır, yine de işlem
öncesi güncel cetvelden teyit edilmelidir.*

**Yaptırım, para cezasıyla sınırlı değildir:** ihlalin tekrarı hâlinde satış belgesinin askıya
alınması/iptali zinciri işleyebilir (4733 m.8) ve tüketiciye internetten satış tespitinde sitenin
tamamına **erişim engeli** uygulanabilir (Y11).

### 1.2 Yönetmelik düzeyi — **web sitesi için asıl bağlayıcı kural budur**

*Tütün Mamulleri ve Alkollü İçkilerin Satışına ve Sunumuna İlişkin Usul ve Esaslar Hakkında
Yönetmelik* (RG 7/1/2011-27808). **Tespit edilen son değişikliği RG 20/9/2023-32315'tir; 7584 sayılı
Kanundan sonra HENÜZ GÜNCELLENMEMİŞTİR** (bkz. §6.1).

| # | Atıf | Birebir hüküm | Siteye etkisi |
|---|------|----------------|----------------|
| **Y1** | **m.11/4, 1. cümle** (Ek: RG-18/9/2013-28769) | "Alkollü içki üretici, ithalatçı veya **toptan satıcıları**, … pazarladıkları ürünlerin **isimlerine/markalarına Kurumsal internet sitelerinin ürünler bölümünde, reklam ve ürün tanıtımı yapılmaksızın ve görsel unsurlar kullanmaksızın liste halinde** yer verebilirler." | **Marka ADI düz metin liste = İZİNLİ.** Marka logosu, ürün/ambalaj görseli, tadım anlatımı = **YASAK.** LEMARS bir *toptan satıcı* olduğu için hüküm doğrudan uygulanır. |
| **Y2** | **m.11/4, 2-3. cümleler** | Ürün markası ve görselleri ancak **kullanıcı adı + parola** ile korunan, **satış belgesi sahibi** kullanıcılara açık ayrı site/sayfada, "herhangi bir reklam unsuru içermemek kaydıyla" kullanılabilir; o sayfada **satış belgesindeki fiziki işyeri adresi + Kurum sicil numarası zorunludur.** | Böyle bir alan bu sitede **kurulmamıştır** (bu iş kapsamı dışı — bkz. §7 öneri). |
| **Y3** | **m.11/3** | Alkollü içki adı/markası içeren **alan/alt alan adı** ile reklam-tanıtım sitesi açılamaz. İhracat istisnası yalnızca **ÜRETİCİ** firmalara tanınmıştır. | `lemarsgida.com` marka adı içermiyor → uygun. İhracat istisnası LEMARS'a (dağıtıcı) **uygulanmaz**. |
| **Y4** | **m.11/1** | "Alkollü içkilerin **tüketicilere** satışını; bilgi toplumu hizmetleri ya da posta ile sipariş yöntemi kullanarak yapmak üzere **satış sistemi kurulamaz veya faaliyette bulunulamaz.**" | Tüketiciye açık sipariş/teklif/fiyat kanalı **kurulamaz**. |
| **Y5** | **m.11/2** | Belgeli satıcılara bilgi toplumu hizmetleri ile satışta **fiziki işyeri** şartı; ayrıca "**satışın gerçekleştirileceği ortam bilgileri Kuruma yazılı olarak bildirilir** ve bu bilgiler satış belgesi üzerinde Kurumca belirtilir. Satış belgesi üzerinde yer alan bilgiler dışında başka ortamlardan satış yapılamaz." | **İÇ KONTROL NOKTASI** — bkz. §6.5. |
| **Y6** | **m.20/1** | Genel reklam/tanıtım yasağı. Arz zinciri içi tanıtım ancak "**tamamen arz zinciri içinde** yapılan ve **tüketicilere yönelik olmayan**" ve "**teşvik edici ve özendirici olmaksızın**" olabilir. | Herkese açık bir site "tamamen arz zinciri içinde" **değildir**. → **"Biz B2B'yiz" savunması halka açık alan için geçerli değildir.** |
| **Y7** | **m.20/2** | Kullanımı/satışı özendiren kampanya, promosyon, etkinlik yasağı — "arz zinciri içerisindeki **tüm** gerçek ve tüzel kişileri kapsar." | "Promosyon desteği", "marka tanıtım desteği" gibi hizmet vaatleri riskli. |
| **Y8** | **m.20/9** | Marka/logo/amblem içeren "sözcükler, şekiller, resim ve harfler … **taşınabilir veya sabit her türlü materyal** üzerinde bulundurulamaz." | Web sitesinin "materyal" sayılıp sayılmayacağı lafzen tartışmalı — bkz. §6.2. |
| **Y9** | **m.21/2** | "Üretici, ithalatçı ve satıcılar arasında gerçekleştirilen ve **tüketiciye yansımayan** tamamen ticari bilgileri içeren bildirimler hariç olmak üzere, her ne amaçla olursa olsun, alkollü içkilerin marka, amblem, logo ve işaretleri kullanılarak **bildirim yapılamaz** … **fiyat duyuruları yapılamaz.**" | Halka açık "Fiyat Bilgisi Alın" çağrısı **doğrudan risklidir**. |
| **Y10** | **m.21/3** | "Bu maddeye aykırı düzenlendiği tespit edilen fiyat bildirimlerinin **reklam mahiyetinde olduğu kabul edilir.**" | Fiyat çağrısı = reklam karinesi. |
| **Y12** | **m.20/11** | "Alkollü içkiler sektöründe faaliyet gösteren firmaların kullandıkları **araçlarda**, bu ürünlere ilişkin markaların tanınmasını sağlayacak bir uygulamaya gidilemez… **Ticaret unvanlarıyla firma bilgilerine, ancak bu araçların yan yüzeylerinde ve bir yan yüzey alanının yüzde onunu aşmayacak oranda yer verilebilir.**" | **Fiziksel filoya ilişkin ayrı yükümlülük** — bkz. §6.7. |
| **Y11** | **m.26/3-(f)** | İnternette tüketicilere satış tespitinde **5651 sayılı Kanun uyarınca erişimin engellenmesi**. | Yaptırım yalnızca para cezası değil; **sitenin tamamına erişim engeli**. |

### 1.3 İdari yorum

**TADAB Duyuru No. 280** (26.06.2026): 7584 değişikliğini duyurur; **fiziksel işyerleri** için
20/06/2027 uyum süresi, **etkinlikler ile yayın ve paylaşımlar** için ise **20/06/2026'dan itibaren
derhal yürürlük** olduğunu belirtir. Duyuru **internet sitelerine hiç değinmemektedir**.
*Not: Duyuru "birinci fıkrası yeniden düzenlenmiştir" ve "beşinci fıkrasının dördüncü cümlesi"
ifadelerini kullanıyor; Resmî Gazete metni ile örtüşmüyor (RG: birinci fıkranın dördüncü cümlesi
değiştirilmiştir). **Çelişki hâlinde Resmî Gazete metni esastır.***

### 1.4 Doğrulanamayanlar (uydurulmadı, açıkça belirtiliyor)

- **Yargı kararı bulunamadı.** Bir alkollü içki üretici/dağıtıcısının **kendi kurumsal web sitesi**
  hakkında verilmiş Danıştay/idare mahkemesi kararına erişilemedi (karararama.danistay.gov.tr arama
  arayüzü yanıt vermedi). Erişilebilen Reklam Kurulu/TADAB yaptırım örneklerinin tamamı **sosyal
  medya** paylaşımlarına ilişkindir. **Bu konuda yerleşik uygulama doğrulanamamıştır.**
- **Bakanlığın dağıtıcı web sitelerine dair müstakil kılavuzu/SSS'si bulunamadı.** TADAB duyuru
  arşivi (No. 256–281, 2024–2026) tarandı; web sitesi konulu duyuru yoktur.
- **İnternet siteleri için yaş doğrulama zorunluluğu bulunamadı.** Ne 4250'de, ne Yönetmelikte, ne
  TADAB duyurularında internet sitesi için age-gate yükümlülüğü getiren hüküm tespit edilemedi.
  Yaş kontrolü **fiziki satış** için düzenlenmiştir.
- **B2B / sektörel yayın istisnası MEVZUATTA YOKTUR.** Tek açık istisna, uluslararası ihtisas
  fuarları ve bilimsel yayınlardır (K3 / Y6-m.20/3).

### 1.5 Sektör uygulaması (bağlayıcı değil — yalnızca fiilî risk göstergesi)

5 Eylül 2026'da Türkiye'den canlı olarak incelendi:

- **Doluca (doluca.com):** Yaş kapısı + ikinci bir "nihai tüketici misiniz?" kapısı. Tüketiciye
  açık ürün sayfası **yalnızca düz metin madde işaretli marka/ürün adı listesi** — tek bir
  şişe/etiket görseli, tadım notu veya fiyat yok. "Nihai tüketici değilim" → kullanıcı adı/şifre.
- **Suvla (suvla.com.tr):** Sitede kendi hukuki gerekçesini yayımlamış (birebir): *"…6487 sayılı
  kanunun 'Alkollü içkilerin her ne surette olursa olsun reklamı ve tüketicilere yönelik tanıtımı
  yapılamaz' hükmü gereğince İnternet sitemizin ürünler bölümünü tüketicilere açmamız
  yasaklanmıştır."* B2B alanı parola korumalı; fiyat listesi ve online sipariş yalnızca orada.
- **Diageo Türkiye:** Yaş kapısı yok; "Markalarımız" menüsü **ürün değil kategori** sayfalarına
  gidiyor (ör. "rakı nedir").

**Yorum:** Uyguladığımız model (halka açık düz metin marka listesi + görsel/tadım/fiyat yok)
sektördeki en yerleşik uygulamayla örtüşmektedir. Bu hukuka uygunluk kanıtı değildir, ancak
büyük hukuk departmanlarının aynı hükümden aynı sonucu çıkardığını gösterir.

---

## 2. Değiştirilen dosyalar

**Silinenler**
```
src/app/[locale]/markalarimiz/[brand]/page.tsx     marka detay sayfası (7 marka × 2 dil = 14 sayfa)
src/components/WineAccordion.tsx                   tadım/ABV/üzüm/eşleştirme akordiyonu
src/components/DistributorCard.tsx                 marka logolu distribütör kartı
public/drinks-hero.jpg                             bar sahnesi + içki şişeleri/kadehleri
public/drinks-illustration.svg                     şişe, kokteyl kadehi, şarap kadehi çizimi
public/brands/scotch-blue.png · hlibny-dar.png · marengo.png · suvorov.png · cool.png
public/brands/aykut-ozkan.png · brysis.png         marka ve üretici logoları (cool.png = şişe etiketi fotoğrafı)
```

**Değiştirilenler**
```
src/i18n/tr.json · src/i18n/en.json                98 metin anahtarı + 4 liste (her iki dilde eş yapı)
src/app/[locale]/markalarimiz/page.tsx             düz metin liste + mevzuat dayanağı notu
src/app/[locale]/distributorluklerimiz/page.tsx    logolar kaldırıldı, nötr künye
src/app/[locale]/hizmetlerimiz/page.tsx            kategori altındaki WhatsApp derin bağlantısı kaldırıldı
src/app/[locale]/iletisim/page.tsx                 form mevzuat notu + gönderim sonrası WhatsApp CTA'sı kaldırıldı
src/app/[locale]/layout.tsx                        JSON-LD: "TAPDK lisanslı" → belge ifadesi; contactType: sales → customer support
src/app/[locale]/yasal/kullanim-kosullari/page.tsx yeni "6. Sipariş ve Satış" bölümü
src/app/layout.tsx                                 kök metadata nötrleştirildi
src/app/api/contact/route.ts                       "Fiyat Bilgisi" konusu kaldırıldı + konu beyaz listesi
src/app/api/vcard/route.ts                         vCard'dan "TAPDK Lisanslı Toptan Alkollü İçecek Dağıtımı" kaldırıldı
src/app/sitemap.ts                                 açıklayıcı yorum güncellendi
src/components/FlowDiagram.tsx                     şişe kasası → sevkiyat kolisi; martini kadehi → işletme ikonu
src/components/Header.tsx                          marka açılır menüsü kaldırıldı, tek "Markalarımız" bağlantısı
src/components/Footer.tsx                          "TAPDK Lisans Bilgisi" → i18n licenseNote
src/components/FaqSection.tsx                      TAPDK sorusu + sipariş dili düzeltildi (FAQPage JSON-LD dâhil)
src/components/WhatsAppButton.tsx                  marka bazlı ön doldurulmuş mesajlar kaldırıldı
src/components/MobileActionBar.tsx                 "Teklif Al" → "İletişim"
src/components/TAPDKBanner.tsx                     açıklayıcı yorum (bileşen adı iç isimlendirme olarak korundu)
public/hero-truck.jpg                              bira kasası bölgesi kırpılarak çıkarıldı (1133×928 → 893×620)
public/llms.txt                                    TAPDK ibaresi + AI motorlarına yönelik tanıtım üretmeme notu
next.config.js                                     kaldırılan 14 marka sayfası için 21 kalıcı yönlendirme
```

---

## 3. Bulgu ve düzeltme tablosu

| # | Sayfa / öğe | Eski içerik | Risk gerekçesi | Yapılan değişiklik | Hukuki kaynak | Teyit |
|---|-------------|-------------|----------------|--------------------|----------------|-------|
| 1 | `/{tr,en}/markalarimiz/scotch-blue` | "kokusu **mumlu ve tereyağlı**; damakta **üzüm suyu tatlılığı, bisküvi ve kuru üzüm** notaları… **tatlı, yumuşak ve kolay içimli**. %40 alkol" | Klasik ürün tanıtımı + tüketimi özendiren duyusal anlatım | **Sayfa tamamen kaldırıldı** → 301 `/markalarimiz` | K1, Y1, Y6 | ✅ Birincil kaynaktan doğrulandı |
| 2 | `/markalarimiz/isabey` | 6 ürün akordiyonu: ABV, üzüm, "**tam gövdeli… uzun bir bitiş**", "**kırmızı et ve olgun peynirlere mükemmel eşlik eder**", "**aperatif olarak keyifle tüketilebilir**" | Tadım notu + **yemek eşleştirmesi + servis/tüketim önerisi** — doğrudan özendirme | **Sayfa + WineAccordion bileşeni kaldırıldı** | K1, Y1, Y6 | ✅ |
| 3 | `/markalarimiz/cool` | "**kokteyl bazı olarak veya soğuk shot olarak tüketilmektedir**" | Tüketim biçimi önerisi | Kaldırıldı | K1, Y6 | ✅ |
| 4 | `/markalarimiz/cumbus`, `marengo`, `suvorov`, `hlibny-dar` | "şık bir **içim deneyimi**", "**yumuşak ve zarif**", "**kolay içimli**", "servis sıcaklığı 16–18 °C" | Duyusal/özendirici anlatım + servis önerisi | Kaldırıldı | K1, Y6 | ✅ |
| 5 | `/markalarimiz` (liste) | 7 marka kartı: **logo görseli**, kategori, menşe, detay sayfası bağlantısı | Y1 "**görsel unsurlar kullanmaksızın liste halinde**" şartına aykırı | **Düz metin `<ul>` listesi**; logo/kategori/menşe/bağlantı yok; sayfada mevzuat dayanağı notu | **Y1** | ✅ |
| 6 | `/markalarimiz` CTA | "Ürün portföyümüz ve **fiyat bilgileri** için…" / buton: "**Fiyat Bilgisi Alın**" | **Y9** fiyat duyurusu yasağı; **Y10** aykırı fiyat bildirimi reklam sayılır | Fiyat ifadeleri kaldırıldı; buton "İletişime Geçin" | **Y9, Y10** | ✅ |
| 7 | `/distributorluklerimiz` | 6 kart, her biri **marka logosu** (`suvorov.png` = "Suvorov Vin", `cool.png` = **şişe etiketi fotoğrafı**) | Y1 görsel yasağı; K5 firma logolarını da kapsama aldı (lafzen fiziksel mekân) | Tüm logolar kaldırıldı; **metin listesi** | Y1, K5 | ✅ (K5'in siteye uygulanması **tartışmalı** — §6.2) |
| 8 | `/distributorluklerimiz` metinleri | "**prestijli**", "**köklü**", "**yüksek segmentte değerli**", "**uluslararası bilinirliği yüksek**", "geniş kitlelerle buluşturmaktadır" | Marka övgüsü = tanıtım | Nötr künye bilgisine indirildi (menşe + üretici sıfatı) | K1, Y6 | ✅ |
| 9 | `/hizmetlerimiz` — akış diyagramı | `BottleCrateIcon`: **şarap / viski / beyaz alkol şişeleri**, etiketleriyle çizilmiş | Ürün + ambalaj görselleştirmesi | **Nötr sevkiyat kolisi** ikonu | Y1, Y6 | ✅ |
| 10 | `/hizmetlerimiz` — "Bar" düğümü | **Martini kadehi** ikonu | Tüketim kabı görseli → özendirme | Nötr işletme (tezgâh+tente) ikonu | K1, Y6 | ✅ |
| 11 | `/hizmetlerimiz` hizmet 04 | "**Pazarlama & Tanıtım**… ürünlerinizi **tüketicilerle buluşturuyoruz**… **marka tanıtım ve promosyon desteği**… **pazar penetrasyonu**" | **Y7**: özendirici promosyon yasağı arz zincirindeki herkesi kapsar; "tüketicilerle buluşturma" doğrudan tüketiciyi hedefler | "**Satış Operasyonu & Raporlama**": sipariş toplama, rota planlama, stok devir takibi, teslimat raporlaması | **Y7**, K2 | ✅ |
| 12 | `/hizmetlerimiz` madde listeleri | "**Bar ve gece kulüpleri** için özel çözümler", "**Etkinlik ve organizasyonlar** için özel hizmet", "**Rekabetçi toptan fiyat politikası**" | Etkinlik desteği (K4) + fiyat iletişimi (Y9) | Belgeli işletme / sevkiyat planlaması / belge kontrolü ifadeleriyle değiştirildi | K4, Y9 | ✅ |
| 13 | `/hizmetlerimiz` kategori notu | Kategori tablosunun altında **WhatsApp derin bağlantısı** (ön doldurulmuş "ürün kategorileri hakkında bilgi almak istiyorum") | **Y4**: tüketiciye açık sipariş/talep kanalı | Bağlantı kaldırıldı, yalnızca nötr bilgilendirme notu | **Y4** | ✅ |
| 14 | WhatsApp butonu (tüm sayfalar) | Marka sayfasında: "Merhaba, **{Marka} markası** hakkında bilgi almak istiyorum"; iletişimde: "**tedarik teklifi** almak istiyorum" | **Y9** marka ile bildirim yasağı; **Y4** tüketiciye açık talep kanalı | Tek, nötr kurumsal mesaj; marka/teklif ifadesi yok | Y4, Y9 | ✅ |
| 15 | Mobil aksiyon çubuğu | 3. buton "**Teklif Al**" / "Get Quote" | Satış/fiyat çağrısı | "**İletişim**" | Y9, Y10 | ✅ |
| 16 | `/iletisim` form | Konu seçenekleri arasında "**Fiyat Bilgisi**" | **Y9** fiyat duyurusu | Seçenek kaldırıldı; konu beyaz listesi API'de doğrulanıyor | **Y9** | ✅ |
| 17 | `/iletisim` form | Form yalnızca "Bize Mesaj Gönderin" — sipariş alınmadığına dair beyan yok | **Y4/Y5**: tüketiciye satış sistemi yasağı; belgeli satışta ortam bildirimi şartı | Formun üstüne mevzuat notu eklendi ("sipariş alınmaz, satış yapılmaz, fiyat bildirimi yapılmaz…") | Y4, Y5 | ✅ |
| 18 | `/iletisim` gönderim sonrası | "**WhatsApp ile Hızlı Dönüş**" butonu | Form → satış kanalına yönlendirme | Buton kaldırıldı | Y4 | ✅ |
| 19 | Ana sayfa hero görseli | AI üretimi depo sahnesi; sağ ortada **"BEER" yazılı ve şişe simgeli ahşap kasalar** | Ambalaj/ürün unsurunun kamuya teşhiri (Y8 / m.20/10 ruhu) | Görsel **kırpıldı** (893×620): kasalar kadrajdan çıkarıldı; LEMARS marka aracı, depo ve streçli palet kaldı | Y8, m.20/10 | ✅ (risk **düşük**tü, muhafazakâr davranıldı) |
| 20 | `/drinks-hero.jpg`, `/drinks-illustration.svg` | Kodda kullanılmıyordu **ancak doğrudan URL ile servis ediliyordu**: bar sahnesi, viski/şarap/şampanya kadehleri, kokteyl | Erişilebilir tüketim sahnesi görselleri | **Dosyalar silindi** (git geçmişinde korunuyor) | K1, Y6 | ✅ Doğrudan URL testi §5 |
| 21 | "**TAPDK lisanslı**" ifadesi (ana sayfa, hakkımızda, SSS + FAQPage JSON-LD, footer, Organization JSON-LD, `llms.txt`, vCard) | 8 ayrı yerde | **Güncel olmayan/yanlış kurum adı** — TAPDK kapatılmış, görevleri T.C. Tarım ve Orman Bakanlığı TADAB'a devredilmiştir | "T.C. Tarım ve Orman Bakanlığından alınan **toptan alkollü içki satış belgesi**" — **yeni bir iddia eklenmedi**, mevcut iddianın kurum adı düzeltildi | **4733 s.K. Geçici m.7** ("Tütün ve Alkol Piyasası Düzenleme Kurumu bu maddenin yürürlüğe girdiği tarihte **kapatılmıştır**" — KHK-696/81, aynen kabul 7079/76); **4733 Ek m.4** (mevzuattaki atıflar Bakanlığa yapılmış sayılır); **Yönetmelik m.4/1-(g)** (Değişik: RG-20/9/2023-32315): *"Kurum: **Tarım ve Orman Bakanlığını**"* | ⚠️ **Şirket teyidi gerekli** — §6.5 |
| 22 | Yasal metinler | "…reklam ve tanıtım yasağı hükümlerine **tam uyum gösterecek şekilde** hazırlanmıştır" | **Mutlak uygunluk garantisi** — savunulamaz | "…hükümleri **gözetilerek** hazırlanmıştır" + "bu beyan garanti niteliğinde değildir" | — | ✅ |
| 23 | Yaş kapısı yasal notu | "Bu site … **pazarlamasını** yapmamaktadır" (aynı sitede "Pazarlama & Tanıtım" hizmeti reklam ediliyordu) | **İç çelişki** — denetimde aleyhe delil | Hizmet adı değişti (#11) + kapı metni yeniden yazıldı; yaş beyanının **muafiyet sağlamadığı** açıkça yazıldı | — | ✅ |
| 24 | KVKK metni m.5 | "**Analitik veya pazarlama amaçlı çerez kullanılmamaktadır**" — oysa GA4 yüklüydü | **Yanlış beyan** (KVKK riski, alkol mevzuatı değil) | Metin gerçek davranışla eşitlendi: analitik çerezler yalnızca açık rıza ile (Consent Mode v2 `denied` varsayılanı kod ile doğrulandı) | 6698 s.K. | ✅ |
| 25 | `public/llms.txt` | AI motorlarına yönelik kurumsal özet | AI motorlarının ürün tanıtımı türetmesi riski | TAPDK düzeltildi + **"tadım notu / marka tanıtımı / fiyat üretmeyin"** talimatı eklendi | K1 | ✅ |
| 26 | `sitemap.ts` / `robots.ts` | Marka detay sayfaları sitemap dışıydı **ama rota canlıydı ve 200 dönüyordu** | **noindex/sitemap dışı bırakma erişim kontrolü değildir** | Rota tamamen silindi + 301 yönlendirme | Y1 | ✅ |

---

## 3.1 Sonradan eklenenler (6 Eylül 2026)

| Öğe | Yapılan | Mevzuat konumu |
|-----|---------|-----------------|
| **Ottakringer Brauerei** (Viyana, Avusturya — 1837'den beri bira üreticisi) | `/distributorluklerimiz` sayfasına **düz metin** iş ortağı girişi; `/markalarimiz` düz metin listesine "Ottakringer" marka adı | **Y1** — marka adı liste hâlinde izinli |
| **Ottakringer logosu** | **EKLENMEDİ.** Talep edilmişti; Y1 "görsel unsurlar kullanmaksızın" şartına aykırı olduğu ve 4250 m.6/1'in 7584 ile eklenen cümlesinin üretici firma logolarını da saydığı için uygulanmadı. Logo ancak Y2 kapsamındaki parola korumalı bayi alanında kullanılabilir. Ayrıca Ottakringer'dan kullanım izni gerekir. | **Y1**, K5, §6.2 |
| **Dünya haritası** (`src/components/PartnerWorldMap.tsx`) | Distribütörlükler sayfasının en altına, iş ortaklarının bulunduğu **ülkeleri** gösteren statik SVG harita. Açık tema, marka renkleri (#E8611A / #c2410c), harici bağımlılık ve animasyon yok. Yalnızca ülke adları: Güney Kore, Avusturya, Ukrayna, Moldova, Türkiye (merkez). | Marka/ürün/logo unsuru içermediğinden yasak kapsamı dışında; coğrafi kapsam kurumsal bilgilendirmedir |

## 4. Kaldırılmayanlar ve gerekçesi

| Öğe | Karar | Gerekçe |
|-----|-------|---------|
| **Marka adları** (Scotch Blue, Hlibny Dar, Marengo, Suvorov, COOL, Cümbüş, İsabey) | Düz metin liste olarak **korundu** | **Y1** açık dayanak: toptan satıcılar kurumsal sitenin ürünler bölümünde marka adlarına *"reklam ve ürün tanıtımı yapılmaksızın ve görsel unsurlar kullanmaksızın liste halinde"* yer verebilir. Doluca'nın canlı uygulaması da bu modeldedir. |
| **LEMARS kurumsal kimliği** (logo, marka aracı görseli, unvan) | **Korundu** | LEMARS bir *alkollü içki markası* değil, şirket unvanıdır. K5 firma isimlerini de kapsar ancak **fiziksel mekânları** sayar; kurumsal sitede şirketin kendi kimliği gerekçesiz topluca silinmemiştir. |
| **Ürün kategorileri** (Bira, Şarap, Rakı, Viski, Votka, Cin, Tekila, Likör) | **Korundu** (nötr not eklendi) | Marka değil, faaliyet alanını tanımlayan jenerik kategori adları. Diageo Türkiye'nin canlı uygulamasıyla da örtüşüyor. |
| **18+ yaş kapısı** | **Korundu** | Gerekçesiz kaldırılmadı. **Ancak uygunluk garantisi olarak sunulmuyor**: mevzuatta internet siteleri için yaş doğrulama zorunluluğu tespit edilemedi (§1.4) ve metinlere "yaş beyanı tek başına muafiyet sağlamaz" ifadesi eklendi. |
| **Telefon / e-posta / WhatsApp / adres** | **Korundu** | Kurumsal iletişim kanalı. Ancak *işlevi* nötrleştirildi (marka/teklif/fiyat ön doldurmaları kaldırıldı) — "yalnız adını değiştirip satış işlevini koruma" tuzağına düşülmedi. |
| **`/hero-warehouse.jpg`, `/logistics.jpg`, `/istanbul.jpg`, `/customer-handshake.jpg`, `/delivery-truck.jpg`** | **Korundu** | Görsel olarak tek tek açılıp incelendi: market rafı (alkolsüz), depo, Galata Kulesi, kasa/tezgâh sahneleri. Alkollü ürün, ambalaj veya tüketim unsuru **yok**. |
| **`/og/lemars-og.png`** | **Korundu** | Açılıp incelendi: yalnız LEMARS logosu + "B2B Satış · Tedarik · Dağıtım" tipografisi. Ürün görseli yok. |

---

## 5. Test sonuçları

| Test | Sonuç |
|------|-------|
| `tsc --noEmit` (Node 20.20.2) | *(bkz. çalıştırma çıktısı — §5.1)* |
| `next build` | *(bkz. §5.1)* |
| TR/EN i18n anahtar eşitliği | ✅ 322 = 322, tek yönlü fark yok |
| Kalan `markalarimiz/<slug>` bağlantısı | ✅ Kodda yok (yalnız `next.config.js` yönlendirmeleri) |
| Kalan "TAPDK" kullanıcı metni | ✅ Yok (yalnız iç bileşen adı + açıklayıcı yorumlar) |
| Riskli kelime taraması (tadım, aroma, damak, içim, kokteyl, shot, eşlik eder, premium, promosyon, fiyat bilgisi, teklif al…) | ✅ Yalnızca **mevzuat notlarının kendisinde** ve kod yorumlarında geçiyor |

**Yapılmayan testler (dürüstlük notu):**
- Gerçek kişilere **hiçbir** e-posta/WhatsApp mesajı gönderilmedi. İletişim formu **uçtan uca test
  edilmedi** (Resend API anahtarı gerektirir); yalnızca konu beyaz listesi mantığı statik olarak
  doğrulandı.
- Canlı ortamda hiçbir değişiklik yapılmadı; deploy tetiklenmedi.

---

## 6. Kalan hukuki belirsizlikler ve sorulacak somut sorular

### 6.1 Yönetmelik henüz 7584'e uyarlanmamıştır (**en kritik takip noktası**)
7584 sayılı Kanun 20/6/2026'da yürürlüğe girdi; Yönetmeliğin tespit edilen son değişikliği ise
**20/9/2023-32315**'tir. Yani Yönetmelik m.11/4 hâlâ halka açık kurumsal sitede marka adı listesine
izin verirken, Kanunun yeni 5. cümlesi daha geniş bir yasak getirmiştir.
→ **Soru:** *Yönetmeliğin 7584'e uyarlanması için bir taslak var mı; kurumsal internet sitelerinin
ürünler bölümüne ilişkin m.11/4 hükmü korunacak mı?* (TADAB'a yazılı başvuru)
→ **Aksiyon:** Resmî Gazete, bu Yönetmelik için düzenli izlenmelidir.

### 6.2 Marka LOGOSU ve web sitesi
- Y1 (Yönetmelik m.11/4) → halka açık kurumsal sitede **görsel unsur kullanılamaz** → logo yasak.
  **Bu net.**
- K5 (4250 m.6/1 yeni 5. cümle) → yasak yerler **"iş yerlerinin içinde, dışında, vitrinlerinde,
  satış ünitelerinde ve hiçbir etkinlik alanında"** olarak sayılmıştır; **internet sitesi
  sayılmamıştır.**
- K4 (yeni 4. cümle) → *"her tür mecrada yapılacak yayın ve paylaşımlara … destek olamazlar"* —
  fiil **"destek olma"** (sponsorluk). Bir firmanın **kendi** kurumsal sitesinde kendi markasını
  göstermesinin bu cümle kapsamında sayılıp sayılmayacağı **lafzen açık değildir.**
→ **Soru:** *Bir toptan satıcının kendi kurumsal internet sitesinde dağıtımını yaptığı alkollü içki
markalarının LOGOSUNU göstermesi, 4250 m.6/1'in 7584 ile değişik 4. ve ek 5. cümleleri kapsamında
mıdır?* **(Uygulanan çözüm muhafazakârdır: logolar kaldırılmıştır.)**

### 6.3 "Görsel unsur" yasağının sınırı
Y1 "görsel unsur kullanmaksızın" der ama tanımlamaz. Marka adının **özel tipografiyle** yazılması,
kategori ikonu, ya da kurumsal fotoğraf (depo, araç, ekip) bu kapsamda mıdır?
→ **Soru:** *m.11/4'teki "görsel unsur" yalnızca ürün/ambalaj/logo görsellerini mi kapsar, yoksa
marka adının stilize yazımı da dâhil midir?* (Uygulamada marka adları **düz gövde metniyle**
yazılmıştır.)

### 6.4 "Kurumsal internet sitesinin ürünler bölümü" kapsamı
Yönetmelik m.4'te tanım yoktur. Marka adlarının **distribütörlükler** sayfasında da geçmesi
"ürünler bölümü" sayılır mı, yoksa ayrı bir tanıtım mı sayılır?
→ **Soru:** *Marka adları yalnızca tek bir "ürünler/markalar" sayfasında mı yer alabilir; başka
kurumsal sayfalarda (ör. distribütörlükler) anılması ihlal midir?*
**(Uygulanan çözüm: her iki sayfada da düz metin, aynı mevzuat notuyla.)**

### 6.5 Şirketin doğrulaması gereken iç kontrol noktaları — **kod ile çözülemez**
1. **Satış belgesi ve sicil numarası.** Site, "T.C. Tarım ve Orman Bakanlığından alınan toptan
   alkollü içki satış belgesi kapsamında" faaliyet gösterildiğini beyan ediyor (mevcut beyanın
   düzeltilmiş hâli — **tarafımızca yeni bir iddia üretilmemiştir**).
   → **Teyit edilmeli:** Belge geçerli mi? Belge/sicil numarası nedir? İsteniyorsa footer'a
   eklenebilir (Y2 B2B alanı için zaten **zorunlu**).
2. **Y5 — ortam bildirimi.** İletişim formu / WhatsApp / telefon üzerinden **fiilen sipariş
   alınıyorsa**, "satışın gerçekleştirileceği ortam bilgileri" Kuruma yazılı bildirilmiş ve satış
   belgesine işlenmiş olmalıdır. Belgede yazmayan ortamdan satış yapılamaz.
   → **Soru:** *lemarsgida.com ve/veya şirket WhatsApp hattı, satış belgesinde kayıtlı satış ortamı
   olarak yer alıyor mu?* Yer almıyorsa ya kayıt yaptırılmalı ya da bu kanallardan sipariş
   alınmadığı operasyonel olarak da sağlanmalıdır.
3. **"20+ yıl", "1800+ satış noktası", "400+ ürün kalemi"** iddiaları korunmuştur; bunlar
   doğrulanmamıştır ve 6502 s. Kanun (ticari reklam/haksız ticari uygulama) bakımından
   ispatlanabilir olmalıdır.

### 6.6 Toptan satıcının uyum süresi var mı? (**yeni tespit**)
4250 Geçici m.2'nin bir yıllık uyum süresi **yalnızca "Perakende ya da açık alkollü içki satışı
yapılan iş yerleri"** için tanınmıştır. **LEMARS bir toptan satıcıdır**; deposu ve idari ofisi bu iki
kategoriden birine girmiyorsa, m.6/1'in beşinci cümlesindeki marka/logo bulundurma yasağı bu iş
yerleri bakımından **20/6/2026'dan itibaren geçiş süresi olmaksızın** uygulanıyor olabilir.
→ **Soru:** *Geçici m.2'deki bir yıllık süre yalnızca perakende ve açık satış işyerleri için midir;
toptan satış belgesi sahibi bir dağıtıcının deposu ve idari ofisi bakımından m.6/1'in beşinci cümlesi
geçiş süresi olmaksızın mı uygulanır?*
*(Bu bir **fiziksel işyeri** meselesidir, web sitesi değil; bu çalışmanın kapsamı dışındadır ancak
şirketin bilmesi gerekir.)*

### 6.7 Araç giydirmesi — fiziksel filo (**yeni tespit, kod ile çözülemez**)
**Y12 (Yönetmelik m.20/11):** sektördeki firmaların araçlarında alkollü içki markası/logosu
kullanılamaz; **ticaret unvanı ancak aracın bir yan yüzey alanının %10'unu aşmayacak oranda** yer
alabilir. Ana sayfadaki hero görselinde LEMARS ticaret unvanı, aracın yan yüzeyinin **%10'unu belirgin
biçimde aşan** bir alanı kaplamaktadır.
- Görsel **AI üretimidir**; gerçek bir aracın fotoğrafı olmayabilir. Ancak sitede şirketin filosunu
  temsilen yayımlanmaktadır.
- **Asıl risk fiziksel araçlardadır.** Şirketin gerçek araç giydirmelerinin m.20/11'e uygunluğu
  denetlenmelidir.
→ **Karar gerekiyor:** Gerçek filo uyumlu değilse hero görseli de değiştirilmelidir — uyumsuz bir
uygulamayı görsel olarak yayımlamak denetimde aleyhe delil oluşturabilir. Uyumluysa görsel kalabilir.
**Bu çalışmada görsel değiştirilmemiş, yalnızca bira kasası bölgesi kırpılarak çıkarılmıştır.**

### 6.8 Yaptırım pratiği doğrulanamadı
Kurumsal web sitelerine ilişkin yargı kararı veya Reklam Kurulu kararı bulunamadı (§1.4). Dolayısıyla
"bu içerik kesin olarak cezalandırılır/cezalandırılmaz" denemez. Bilinen risk büyüklüğü:
**103.207 – 4.130.222 TL** idari para cezası (4250 m.7/1-a, 2026 cetveli) **ve** tüketiciye satış
tespitinde **5651 uyarınca erişim engeli** (Y11).

---

## 7. Bu kapsamın dışında bırakılanlar (ayrı öneri)

**Parola korumalı B2B bayi alanı kurulmadı** — talimat gereği. Kurulmak istenirse Y2 uyarınca
**zorunlu** şartlar:
1. Erişim, **arz zinciri içindeki satış belgesi sahibi** kullanıcılara verilecek **kullanıcı adı +
   parola** ile sağlanmalı (yaş kapısı yeterli değildir).
2. Sayfada **satış belgesinde belirtilen fiziki işyeri adresi** ve **Kurum sicil numarası** yer
   almalıdır.
3. İçerik **teknik bilgi** ile sınırlı olmalı, **"herhangi bir reklam unsuru içermemelidir"**.
4. O alandan sipariş alınacaksa ayrıca Y5 (ortam bildirimi) yerine getirilmelidir.
5. Kullanıcı doğrulaması gerçek olmalıdır — belge numarası beyanı **doğrulanmadan** erişim
   verilmesi, alanı fiilen herkese açık hâle getirir.

**Ayrıca raporlanan, bu iş kapsamı dışı teknik bulgu:** `src/app/api/contact/route.ts` içinde form
alanları (`name`, `company`, `email`, `phone`, `message`) bildirim e-postasının HTML gövdesine
kaçışsız gömülüyor. Alkol mevzuatıyla ilgisi yoktur; ayrı bir düzeltme olarak ele alınmalıdır.

---

## 8. Yayın ve geri alma adımları

### Önizleme (yerel)
```bash
cd "LeMars Proje/lemars-website" && export PATH="$HOME/.nvm/versions/node/v20.20.2/bin:$PATH" && npm run dev
```
> Not: Depoda kurulu Node 18.15.0, Next 14 için yetersizdir (>= 18.17.0 gerekir); yukarıdaki
> `PATH` ile Node 20.20.2 kullanılır.

### Yayın (ONAY GEREKTİRİR — bu çalışma kapsamında YAPILMAMIŞTIR)
1. `compliance/alkol-mevzuat-uyum` dalını gözden geçirin.
2. Onaylanırsa `origin/main`'e merge/push → Vercel otomatik olarak lemarsgida.com'a deploy eder.
3. **Yayın sonrası kontrol listesi:**
   - [ ] `https://www.lemarsgida.com/tr/markalarimiz/scotch-blue` → **301** → `/tr/markalarimiz`
   - [ ] `https://www.lemarsgida.com/drinks-hero.jpg` → **404**
   - [ ] `https://www.lemarsgida.com/drinks-illustration.svg` → **404**
   - [ ] `https://www.lemarsgida.com/brands/scotch-blue.png` (ve diğer 6 logo) → **404**
   - [ ] `sitemap.xml` yalnızca 9 yolu × 2 dil içeriyor
   - [ ] Vercel CDN önbelleği: eski dağıtımlar (Preview/Production deployment URL'leri) hâlâ eski
         içeriği servis edebilir → gerekiyorsa eski deployment'ları silin/koruyun
   - [ ] **Arama motoru kopyaları anında kaybolmaz.** Google Search Console → "Kaldırmalar" ile
         eski marka URL'leri ve görselleri için geçici kaldırma talebi girin; kalıcı düşüş
         yeniden taramaya bağlıdır (haftalar sürebilir). Bing Webmaster Tools için de aynısı.
   - [ ] Sosyal medya ve AI motorlarındaki eski kopyalar (ChatGPT/Perplexity önbellekleri)
         kontrolümüz dışındadır; `llms.txt` güncellendi ancak anında etki iddia edilemez.
   - [ ] Instagram/LinkedIn hesaplarındaki mevcut paylaşımlar **bu incelemenin kapsamı dışındadır**;
         K4 (her tür mecrada yayın/paylaşım) bakımından ayrıca gözden geçirilmelidir.

### Geri alma
```bash
# Tek commit hâlinde ise:
git revert <commit-sha>
# veya dalı yayımlamadan tamamen bırakmak için:
git checkout site-improvements && git branch -D compliance/alkol-mevzuat-uyum
```
Silinen görseller ve marka detay sayfası içeriği `bfee389` ve öncesindeki commit'lerde tam olarak
korunmaktadır:
```bash
git show bfee389:"src/app/[locale]/markalarimiz/[brand]/page.tsx"
git checkout bfee389 -- public/brands public/drinks-hero.jpg public/drinks-illustration.svg
```
