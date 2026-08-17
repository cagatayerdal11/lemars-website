/**
 * LEMARS — Yönetim yorumları (deterministik kurallar; AI/LLM YOK).
 * En fazla 3 kısa insight. Anlamlı bir sinyal yoksa tek nötr cümle;
 * karşılaştırma verisi hiç yoksa boş döner.
 */

export interface InsightInput {
  usersPercent: number | null;
  organicPercent: number | null;
  contactUsersPercent: number | null;
  contactRatePercent: number | null;
  googleClicksPercent: number | null;
  googleImpressionsPercent: number | null;
}

export function buildInsights(i: InsightInput): string[] {
  const out: string[] = [];

  // 1) İletişim aksiyonu alan kullanıcı belirgin arttı.
  if (i.contactUsersPercent !== null && i.contactUsersPercent > 20) {
    out.push(
      "Website üzerinden iletişim aksiyonu alan kullanıcı sayısı önceki döneme göre önemli ölçüde arttı."
    );
  }

  // 2) Trafik artmasına rağmen iletişim oranı geriledi → CTA incele.
  if (i.contactRatePercent !== null && i.contactRatePercent < -15) {
    out.push(
      "İletişim aksiyon oranı önceki döneme göre geriledi. CTA'lar ve iletişim akışı gözden geçirilebilir."
    );
  }

  // 3) Google kaynaklı görünürlük/trafik arttı.
  if (i.organicPercent !== null && i.organicPercent > 15) {
    out.push(
      "Organik (Google) arama trafiği önceki döneme göre belirgin şekilde arttı."
    );
  } else if (i.googleClicksPercent !== null && i.googleClicksPercent > 15) {
    out.push(
      "Google aramalarından gelen tıklamalar önceki döneme göre arttı."
    );
  }

  // 4) Gösterim artıyor ama tıklama aynı hızda değil → title/description.
  const imprUp = i.googleImpressionsPercent !== null && i.googleImpressionsPercent > 15;
  const clicksFlat =
    i.googleClicksPercent === null ||
    i.googleClicksPercent < 5 ||
    (i.googleImpressionsPercent !== null &&
      i.googleClicksPercent < i.googleImpressionsPercent / 2);
  if (out.length < 3 && imprUp && clicksFlat) {
    out.push(
      "Google görünürlüğü (gösterim) artıyor ancak tıklama oranı aynı hızda yükselmiyor. Arama sonuçlarındaki başlık/açıklama performansı takip edilebilir."
    );
  }

  // 5) Genel trafikte belirgin düşüş uyarısı (yer kaldıysa).
  if (out.length < 3 && i.usersPercent !== null && i.usersPercent < -20) {
    out.push(
      "Ziyaretçi sayısı önceki döneme göre belirgin şekilde azaldı. Trafik kaynakları incelenebilir."
    );
  }

  if (out.length > 0) return out.slice(0, 3);

  // Anlamlı sinyal yok ama karşılaştırma verisi VARSA nötr cümle.
  const hasComparison = [
    i.usersPercent,
    i.organicPercent,
    i.contactUsersPercent,
    i.contactRatePercent,
    i.googleClicksPercent,
    i.googleImpressionsPercent,
  ].some((v) => v !== null);

  return hasComparison ? ["Performans önceki dönemle benzer seviyede."] : [];
}
