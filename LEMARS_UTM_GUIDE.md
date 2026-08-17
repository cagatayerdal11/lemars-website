# LEMARS — UTM Etiketleme Standardı

Website **dışındaki** linklere (sosyal medya bio'ları, e-posta imzası, reklamlar)
UTM etiketi ekleyerek trafiğin nereden geldiğini GA4'te net görebiliriz.

> Mevcut linkleri otomatik değiştirmeyin. Bu doküman yalnızca standardı tanımlar;
> yeni link paylaşırken bu formatı kullanın.

## Neden?

- **GA4 Traffic acquisition** raporunda `utm_source` / `utm_medium` / `utm_campaign`
  olarak ayrışır → "Instagram bio'sundan kaç kişi geldi?" sorusunu yanıtlar.
- Bu, website içindeki `social_click` event'inden **farklıdır**:
  - `social_click` = siteden Instagram/LinkedIn'e **çıkan** kullanıcı.
  - UTM = sosyal medyadan siteye **gelen** kullanıcı.

## Standart parametreler

| Parametre | Anlamı | Örnek değerler |
|-----------|--------|----------------|
| `utm_source` | Platform | `instagram`, `linkedin`, `whatsapp`, `newsletter` |
| `utm_medium` | Kanal türü | `social`, `email`, `qr`, `bio` |
| `utm_campaign` | Kampanya/konum | `profile`, `company_profile`, `agustos_kampanya` |

Küçük harf kullanın, boşluk yerine `_` kullanın.

## Hazır linkler

**Instagram bio:**
```
https://www.lemarsgida.com/tr?utm_source=instagram&utm_medium=social&utm_campaign=profile
```

**LinkedIn şirket sayfası:**
```
https://www.lemarsgida.com/tr?utm_source=linkedin&utm_medium=social&utm_campaign=company_profile
```

**WhatsApp durum / paylaşım:**
```
https://www.lemarsgida.com/tr?utm_source=whatsapp&utm_medium=social&utm_campaign=status
```

**E-posta imzası:**
```
https://www.lemarsgida.com/tr?utm_source=newsletter&utm_medium=email&utm_campaign=signature
```

## Dashboard'da nerede görünür?

GA4 → **Reports → Acquisition → Traffic acquisition**. Dashboard'daki
"Trafik Kaynakları" bölümü de channel grouping üzerinden bu trafiği
"Organic Social" / "Referral" gibi kategorilerde toplar.
