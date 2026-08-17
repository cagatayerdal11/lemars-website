# LEMARS Gida Icecek — Brand Visual Guide

> Bu dosya, LEMARS markasinin gorsel kimligini tanimlayan tek kaynak dokumanidir.
> Instagram postlari, sosyal medya icerikleri, baskili materyaller ve dijital
> tasarimlar uretirken bu kurallara uyulmalidir.

---

## 1. MARKA KIMLIK OZETI

| Alan | Deger |
|------|-------|
| Marka Adi | **LEMARS** (tamamI buyuk harf, asla "LeMars" veya "Lemars" yazilmaz) |
| Tam Unvan | LEMARS Gida Icecek Sanayi ve Ticaret Ltd. Sti. |
| Alt Baslik | GIDA ICECEK (logo altinda, saga yasli, letter-spacing: 0.15em) |
| Sektoru | Toptan Alkollu Icecek Dagitim — Istanbul Avrupa Yakasi |
| Slogan | Guvenilir Tedarik, Guclu Ortaklik. |
| Web Sitesi | www.lemarsgida.com |

---

## 2. LOGO

### Varyantlar

| Varyant | Dosya | Kullanim |
|---------|-------|----------|
| Turuncu (ana) | `logo-transparent.png` | Beyaz / acik zemin uzerinde |
| Beyaz | `logo-white.png` | Koyu zemin uzerinde (hero, CTA alanlari) |
| SVG | `logo.svg` | Vektorel / basili materyaller |

### Logo Yapisi

```
┌─────────────────────────────┐
│         LEMARS              │  ← Ana yazi (logo PNG)
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━│  ← Turuncu ayirici cizgi (#E8611A)
│                 GIDA ICECEK │  ← Alt metin, saga yasli, bold 800
└─────────────────────────────┘
```

### Logo Kurallari
- Logo en boy orani: genislik x 0.335 = yukseklik
- Turuncu ayirici cizgi her zaman logonun tam altinda, soldan saga %100 genislikte
- "GIDA ICECEK" her zaman saga yasli, font-weight 800, letter-spacing 0.15em
- Logo etrafinda minimum bosluk (safe area): logo genisliginin %15'i kadar
- Logo ASLA egik, deformeli veya kismen kesilmis kullanilmaz

---

## 3. RENK PALETI

### Ana Renk — Primary Orange

| Token | HEX | RGB | Kullanim |
|-------|-----|-----|----------|
| primary-50 | `#FFF7ED` | 255, 247, 237 | Cok acik arka plan vurgusu |
| primary-100 | `#FFEDD5` | 255, 237, 213 | Hover arka plani |
| primary-200 | `#FED7AA` | 254, 215, 170 | Kenarluk (border) hover |
| primary-300 | `#FDBA74` | 253, 186, 116 | Ikincil vurgular |
| primary-400 | `#FB923C` | 251, 146, 60 | Animasyon / goz alici ogeleri |
| **primary-500** | **`#F97316`** | 249, 115, 22 | **Vurgu metinleri, hero aksan** |
| **primary-600** | **`#EA580C`** | 234, 88, 12 | **Numaralama, etiketler** |
| **primary-700** | **`#E8611A`** | 232, 97, 26 | **ANA MARKA RENGI — butonlar, eyebrow, logo cizgi** |
| primary-800 | `#C2410C` | 194, 65, 12 | Buton hover |
| primary-900 | `#9A3412` | 154, 52, 18 | Koyu vurgular, cizgiler |

**primary-700 (#E8611A)** = LEMARS turuncu. Bu, markanin birincil rengidir ve tum
tasarimlarda dominant aksant olarak kullanilir.

### Notr Renkler — Gray Scale

| Token | HEX | Kullanim |
|-------|-----|----------|
| white | `#FFFFFF` | Kart arka plani, buton metni |
| gray-50 | `#F9FAFB` | Alternatif section arka plani |
| gray-100 | `#F3F4F6` | Hafif arka plan, kenarlukler |
| gray-200 | `#E5E7EB` | Ayirici cizgiler, grid gap |
| gray-400 | `#9CA3AF` | Aciklama metni (koyu zemin uzerinde) |
| gray-500 | `#6B7280` | Body metin, aciklama |
| gray-700 | `#374151` | Baslik alt seviye |
| gray-800 | `#1F2937` | Govde metni varsayilani |
| **gray-900** | **`#111827`** | **Basliklar, hero arka plani** |

### Koyu Arka Plan

| Token | HEX | Kullanim |
|-------|-----|----------|
| dark-800 | `#1A1A2E` | Alternatif karanlik arka plan |
| dark-900 | `#0F0F1A` | En koyu arka plan |

### Renk Kullanim Kurallari

1. **Hero & CTA bolumleri**: `bg-gray-900` (koyu) + beyaz metin + turuncu aksan
2. **Icerik bolumleri**: `bg-white` ve `bg-gray-50` arasinda alternatif
3. **Turuncu ASLA arka plan olarak kullanilmaz** (butonlar haric). Sadece metin,
   cizgi, ikon veya kenarluk olarak
4. **Koyu zemin uzerinde**: beyaz metin + `text-primary-500` aksanlar
5. **Acik zemin uzerinde**: `text-gray-900` baslik + `text-primary-700` aksanlar

---

## 4. TIPOGRAFI

### Font Ailesi

```
Font:        Poppins
Fallback:    system-ui, -apple-system, sans-serif
Kaynak:      Google Fonts
Agirliklar:  300 (Light), 400 (Regular), 500 (Medium),
             600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)
```

### Tipografi Hiyerarsisi

| Ogeler | Boyut | Agirlik | Renk | Ek Notlar |
|--------|-------|---------|------|-----------|
| **H1 (Sayfa Basliklari)** | 48px / 60px (text-5xl / text-6xl) | 700 (Bold) | `#FFFFFF` koyu zeminde, `#111827` acik zeminde | `leading-tight` |
| **H2 (Bolum Basliklari)** | 36px / 48px (text-4xl / text-5xl) | 700 (Bold) | `#111827` | `leading-tight` |
| **H3 (Kart Basliklari)** | 20px (text-xl) | 700 (Bold) | `#111827` | — |
| **Eyebrow (Ust Etiket)** | 12px (text-xs) | 600 (SemiBold) | `#E8611A` | `tracking-[0.3em] uppercase` |
| **Body (Govde)** | 14px (text-sm) | 400 (Regular) | `#6B7280` | `leading-relaxed` |
| **Body Large** | 18px (text-lg) | 400 (Regular) | `#9CA3AF` | Koyu zemin uzerinde |
| **Caption / Kucuk Metin** | 10px (text-[10px]) | 500 (Medium) | `#6B7280` | `uppercase tracking-wider` |
| **Numaralama (01, 02...)** | 12px (text-xs) | 700 (Bold) | `#EA580C` | `tracking-widest` |
| **Istatistik Numarasi** | 30px (text-3xl) | 700 (Bold) | `#E8611A` | — |

### Tipografi Kurallari

1. **LEMARS** kelimesi her zaman tum harfleri buyuk yazilir
2. Eyebrow metni: tum harfler buyuk, genis letter-spacing (0.3em), primary-700
3. Body metinde asla bold kullanilmaz — vurgu gerekirse turuncu renk kullanilir
4. Basliklarda `leading-tight` (1.1–1.25), body'de `leading-relaxed` (1.625)
5. Instagram postlarinda Poppins disinda font kullanilmaz

---

## 5. BUTON & CTA STILLERI

### Birincil Buton (Primary)

```
Arka plan:    #E8611A (primary-700)
Metin:        #FFFFFF
Hover:        #C2410C (primary-800)
Padding:      14px 28px (py-3.5 px-7)
Border:       yok
Radius:       6px (rounded-md)
Font:         14px, SemiBold, uppercase letter-spacing: wider
```

### Cerceveli Buton (Outline)

```
Arka plan:    transparent
Kenarluk:     1px solid #E8611A
Metin:        #E8611A
Hover:        arka plan #E8611A, metin beyaz
Padding:      14px 28px
Radius:       6px
```

### Beyaz Buton (CTA bolumleri icin)

```
Arka plan:    #FFFFFF
Metin:        #111827 (gray-900)
Hover:        #F3F4F6 (gray-100)
Padding:      14px 28px
Radius:       6px
Font:         14px, SemiBold
```

---

## 6. GORSEL DESEN & LAYOUT

### Bolum Yapisi (Section Pattern)

```
┌─────────────────────────────────────────────┐
│  bg-gray-900 (koyu)                         │
│  ┌───────────────────────────┐              │
│  │ EYEBROW — turuncu, buyuk  │              │
│  │ H1 BASLIK — beyaz, bold   │              │
│  │ Aciklama — gray-400       │              │
│  └───────────────────────────┘              │
├─────────────────────────────────────────────┤
│  bg-white veya bg-gray-50 (acik)            │
│  ┌───────────────────────────┐              │
│  │ EYEBROW — primary-700     │              │
│  │ H2 BASLIK — gray-900      │              │
│  │ Body metin — gray-500     │              │
│  └───────────────────────────┘              │
├─────────────────────────────────────────────┤
│  bg-gray-900 (CTA)                          │
│  ┌───────────────────────────┐              │
│  │ H2 — beyaz                │              │
│  │ Aciklama — gray-400       │              │
│  │ [ BUTON ]                 │              │
│  └───────────────────────────┘              │
└─────────────────────────────────────────────┘
```

### Kart Stili

```
Arka plan:    #FFFFFF
Kenarluk:     1px solid #F3F4F6 (gray-100)
Radius:       8px (rounded-lg)
Golge:        yok (varsayilan), hover'da shadow-md
Hover border: #FED7AA (primary-200)
Padding:      40px / 48px (p-10 / p-12)
```

### Golge & Derinlik

- Kartlar: golgesiz, hover'da `shadow-md`
- Flow diagram nodelari: `feDropShadow` — dx:0 dy:3 stdDeviation:6 %8 siyah
- Merkez node: `feDropShadow` — dx:0 dy:6 stdDeviation:12 %18 turuncu

### Responsive Tasarim

- Max genislik: `1280px` (max-w-7xl)
- Padding: `24px` mobil, `32px` masaustu (px-6 lg:px-8)
- Grid kirilma: genellikle `md:` (768px) breakpoint'inde
- Bolum dikey bosluk: `96px` (py-24) standart

---

## 7. IKONOGRAFI & GORSEL DIL

### Ikon Stili
- Stroke-based (dolgusuz, sadece cizgi)
- Cizgi kalinligi: 2.5px
- Renk: `#6B7280` (gray-500)
- Boyut: 40x40 lokal koordinat

### Fotograf Kullanimi
- Overlay: `bg-gray-900/60` (koyu filtre, %60 opakluk)
- Numara overlaylari: turuncu numara + beyaz alt etiket
- object-fit: cover, aspect-ratio: 1:1 (kare)

### Animasyon
- Giris animasyonlari: fade-in + yukari kayma (scroll-reveal)
- Sureler: 300ms–500ms, ease-out
- Hover gecisleri: 300ms
- Flow diagram: 3–5s surekli dongu, `animateMotion` + `rotate="auto"`

---

## 8. INSTAGRAM POST REHBERI

### Post Boyutlari
| Format | Boyut | Oran |
|--------|-------|------|
| Feed karesi | 1080 x 1080 px | 1:1 |
| Feed dikey | 1080 x 1350 px | 4:5 |
| Story / Reels | 1080 x 1920 px | 9:16 |
| Carousel | 1080 x 1080 px (her kart) | 1:1 |

### Post Tasarim Sablonu

```
┌─────────────────────────────┐
│                             │
│  [LEMARS Logo - beyaz]      │  ← Sol ust veya orta ust
│                             │
│                             │
│   ANA GORSEL / ICERIK       │  ← Fotografin uzerine %40-60
│                             │     koyu overlay uygulanir
│                             │
│  BASLIK METNI               │  ← Poppins Bold, beyaz
│  (Poppins Bold, beyaz)      │
│                             │
│  Aciklama metni             │  ← Poppins Regular, %80 beyaz
│  (Poppins Regular)          │
│                             │
│  ━━━━━━━━━━━━━━━━━          │  ← Turuncu ayirici cizgi
│  www.lemarsgida.com         │  ← Poppins SemiBold, turuncu
│                             │
└─────────────────────────────┘

Arka plan: #111827 veya koyu fotograf + overlay
```

### Renk Semalari (Post Turleri)

| Post Turu | Arka Plan | Aksan | Metin |
|-----------|-----------|-------|-------|
| Kurumsal / Bilgilendirme | `#111827` koyu gri | `#E8611A` turuncu | Beyaz |
| Urun Tanitim | Fotograf + `#111827` %60 overlay | `#E8611A` | Beyaz |
| Istatistik / Rakam | `#111827` | `#F97316` (buyuk rakamlar) | Beyaz |
| Duyuru / Kampanya | `#E8611A` turuncu arka plan | `#FFFFFF` | Beyaz + Koyu |
| Minimal / Temiz | `#FFFFFF` beyaz | `#E8611A` | `#111827` koyu gri |

### Tipografi Hiyerarsisi (Instagram)

| Ogeler | Font | Boyut (1080px icinde) | Renk |
|--------|------|----------------------|------|
| Logo | Logo PNG | Genislik: 200–300px | — |
| Ana Baslik | Poppins Bold/ExtraBold | 64–80px | `#FFFFFF` |
| Alt Baslik | Poppins SemiBold | 36–48px | `#FFFFFF` %80 |
| Eyebrow | Poppins SemiBold | 20–24px | `#E8611A` |
| Govde | Poppins Regular | 28–32px | `#FFFFFF` %70 |
| Istatistik Numarasi | Poppins Black (900) | 120–160px | `#F97316` |
| CTA / Link | Poppins SemiBold | 24–28px | `#E8611A` |

### Yapilmamasi Gerekenler

- LEMARS kelimesini kucuk harfle yazma (LeMars, Lemars, lemars)
- Turuncu (#E8611A) disinda farkli aksan rengi kullanma
- Poppins disinda font kullanma
- Logonun uzerine metin bindirme
- Logosuz post yayinlama
- Fazla renk / gradient kullanma — marka minimal ve profesyoneldir
- Alkollu icecek tuketimini tesvik eden icerik olusturma (TAPDK uyumu)
- 18 yas uyarisiz tanitim materyali yayinlama

---

## 9. MARKA SES TONU

| Ozellik | Tanim |
|---------|-------|
| Profesyonel | Kurumsal, ciddi ama soguk degil |
| Guvenilir | Sayilarla desteklenen somut ifadeler (1800+ satis noktasi, 400+ urun, 20+ yil) |
| Minimal | Gereksiz sifat ve sosleme yok, dogrudan mesaj |
| B2B Odakli | Hedef kitle: isletme sahipleri, satin alma yoneticileri |
| Yasallara Uyumlu | Her icerik TAPDK yonetmeliklerine uygun, reklam / ozendirme yok |

### Ornek Cumleler

**Dogru:**
- "Istanbul Avrupa Yakasi'nda 1800+ satis noktasina hizmet veriyoruz."
- "TAPDK lisansli, guvenilir tedarik."
- "400+ urun cesidi ile isletmenize tek noktadan tedarik."

**Yanlis:**
- "En iyi ickileri bizde bulursunuz!" (ozendirme)
- "Hemen siparis verin!" (tuketiciye yonelik satis dili)
- "Super firsatlar!" (promosyon dili, TAPDK'ya aykiri)

---

## 10. DOSYA REFERANSLARI

| Dosya | Konum |
|-------|-------|
| Ana Logo (turuncu) | `/public/logo-transparent.png` |
| Beyaz Logo | `/public/logo-white.png` |
| SVG Logo | `/public/logo.svg` |
| Renk Tanimlari | `/tailwind.config.js` → theme.extend.colors |
| Font Tanimlari | `/src/app/globals.css` → Poppins import |
| Buton Stilleri | `/src/app/globals.css` → @layer components |
| Logo Komponenti | `/src/components/Logo.tsx` |

---

*Bu dokuman LEMARS Gida Icecek markasinin gorsel kimlik rehberidir. Tum
dijital ve basili icerikler bu kurallara uygun uretilmelidir.*
