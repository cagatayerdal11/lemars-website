import Link from "next/link";
import Image from "next/image";
import { getDictionary, Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import WineAccordion from "@/components/WineAccordion";

interface ProductVariety {
  name: string;
  type: { tr: string; en: string };
  grapes: { tr: string; en: string };
  abv: string;
  descTr: string;
  descEn: string;
  color: string;
}

interface BrandInfo {
  name: string;
  origin: { tr: string; en: string };
  category: { tr: string; en: string };
  logo: string;
  logoBg?: string;
  imageFit?: "contain" | "cover";
  descTr: string;
  descEn: string;
  varieties?: ProductVariety[];
  alcoholNoteTr?: string;
  alcoholNoteEn?: string;
  varietiesTitleTr?: string;
  varietiesTitleEn?: string;
}

const brandData: Record<string, BrandInfo> = {
  "scotch-blue": {
    name: "Scotch Blue",
    origin: { tr: "Güney Kore", en: "South Korea" },
    category: { tr: "Harman Viski", en: "Blended Whisky" },
    logo: "/brands/scotch-blue.png",
    descTr: "Scotch Blue, Lotte Chilsung Beverage tarafından 1997'de Güney Kore pazarına yönelik olarak piyasaya sürülen bir harman viski markasıdır. İskoç viski geleneğini Kore damak zevkine uyarlayan markanın kokusu mumlu ve tereyağlıdır; damakta üzüm suyu tatlılığı, bisküvi ve kuru üzüm notaları ile hafif limon kabuğu zesti hissedilir. Genel karakteri tatlı, yumuşak ve kolay içimlidir. Standart Scotch Blue harmanı %40 alkol ile şişelenir.",
    descEn: "Scotch Blue is a blended whisky brand launched in 1997 by Lotte Chilsung Beverage for the South Korean market. Adapting the Scotch whisky tradition to the Korean palate, the brand's nose is waxy and buttery; the palate features grape juice sweetness, biscuit and raisin notes with a hint of lemon zest. Its overall character is sweet, smooth, and easy-drinking. The standard blend is bottled at 40% ABV.",
  },
  "hlibny-dar": {
    name: "Hlibny Dar",
    origin: { tr: "Ukrayna", en: "Ukraine" },
    category: { tr: "Votka", en: "Vodka" },
    logo: "/brands/hlibny-dar.png",
    descTr: "Hlibny Dar, Bayadera Group'un Ukrayna menşeli votka markasıdır. İsmi \"ekmeğin hediyesi\" anlamına gelen Hlibny Dar, yüksek kaliteli yerel tahıllar ve kaynak suyu kullanılarak çok kez damıtılır. Burunda temiz, ferah ve hafif tahıl tatlılığı ile karakterizedir; damakta kıtır bir başlangıcın ardından hafif tatlılık ve tahılın toprak tonları belirir; bitişi temiz ve yumuşaktır. %40 alkol (80 proof) ile şişelenen marka, dünyanın en çok satan beş votka markası arasında yer almaktadır.",
    descEn: "Hlibny Dar is Bayadera Group's Ukrainian vodka brand. With a name meaning \"gift of bread,\" Hlibny Dar is multi-distilled using high-quality local grains and spring water. The nose is clean, fresh, with light grain sweetness; the palate opens with a crisp start followed by mild sweetness and earthy grain tones; the finish is clean and smooth. Bottled at 40% ABV (80 proof), the brand ranks among the world's five best-selling vodka brands.",
  },
  marengo: {
    name: "Marengo",
    origin: { tr: "İtalya", en: "Italy" },
    category: { tr: "Köpüklü Şarap & Vermut", en: "Sparkling Wine & Vermouth" },
    logo: "/brands/marengo.png",
    descTr: "Marengo, Bayadera Group bünyesinde köpüklü şarap ve vermut kategorilerinde konumlanan bir markadır. \"Luxurious, temperamental and open-minded\" sloganıyla tanıtılan marka, klasik yöntemlerle üretilen köpüklü şarapları ve bitki özleriyle tatlandırılmış vermutlarıyla şık bir içim deneyimi sunar.",
    descEn: "Marengo is a brand within the Bayadera Group, positioned in the sparkling wine and vermouth categories. Presented with the slogan \"Luxurious, temperamental and open-minded,\" the brand offers an elegant drinking experience with its classically produced sparkling wines and vermouth flavored with botanical extracts.",
    varietiesTitleTr: "Ürün Çeşitleri",
    varietiesTitleEn: "Product Varieties",
    varieties: [
      {
        name: "Marengo Sparkling Brut",
        type: { tr: "Köpüklü Şarap", en: "Sparkling Wine" },
        grapes: { tr: "Muscat dâhil beyaz üzüm çeşitleri", en: "White grape varieties including Muscat" },
        abv: "%13,5 / 13.5%",
        descTr: "Ukrayna'da üretilen bu beyaz köpüklü şarap, Muscat dâhil çeşitli beyaz üzümlerden hazırlanır. Altın rengi ve ince köpüklü yapısıyla dikkat çeken şarabın tadı hafif ve ferahlatıcı olup aromasında zarif çiçek çağrışımları bulunur.",
        descEn: "This white sparkling wine is crafted from various white grapes including Muscat. Distinguished by its golden color and fine bubbles, the wine has a light and refreshing taste with elegant floral undertones in its aroma.",
        color: "white",
      },
      {
        name: "Marengo Bianco Vermouth",
        type: { tr: "Vermut", en: "Vermouth" },
        grapes: { tr: "Beyaz şarap tabanı, adaçayı, lavanta", en: "White wine base, sage, lavender" },
        abv: "%16 / 16%",
        descTr: "Beyaz şarap tabanı üzerine hazırlanan bu vermut, adaçayı ve lavanta gibi kokulu otlar, çiçekler ve baharat karışımıyla tatlandırılır. Aroması dolgun ve çok katmanlı; burunda adaçayı, lavanta ve baharat notaları; damakta yumuşak tatlılık ve pelin otu acılığı hissedilir. Servis sıcaklığı 16–18 °C, şeker oranı %16'dır.",
        descEn: "This vermouth is prepared on a white wine base, flavored with aromatic herbs such as sage and lavender, along with flowers and spice blends. Its aroma is rich and multi-layered; sage, lavender, and spice notes on the nose; soft sweetness and wormwood bitterness on the palate. Serving temperature is 16–18°C, with a sugar content of 16%.",
        color: "white",
      },
    ],
  },
  suvorov: {
    name: "Suvorov",
    origin: { tr: "Moldova", en: "Moldova" },
    category: { tr: "Divin & Şarap", en: "Divin & Wine" },
    logo: "/brands/suvorov.png",
    logoBg: "bg-gray-900",
    descTr: "Suvorov, Tiraspol Şarap ve İçki Fabrikası (KVINT) tarafından üretilen Moldova menşeli bir divin markasıdır. İlk kez 1992'de Tiraspol'un 200. yıl dönümünü anmak için üretilen markanın amiral gemisi Suvorov XO, en az 40 yıl meşe fıçılarda olgunlaştırılmış şarap ruhlarından yapılır. Tadı kuru meyve, vanilya, meşe ve hafif baharat notalarıyla zengin, uyumlu ve derindir; içimi yumuşak ve zariftir. Alkol oranı yaklaşık %40'tır.",
    descEn: "Suvorov is a Moldovan divin brand produced by the Tiraspol Wine and Spirits Factory (KVINT). First created in 1992 to commemorate the 200th anniversary of Tiraspol, its flagship Suvorov XO is made from wine spirits aged for at least 40 years in oak barrels. The palate is rich, harmonious, and deep with notes of dried fruit, vanilla, oak, and subtle spice; the mouthfeel is smooth and elegant. ABV is approximately 40%.",
  },
  cool: {
    name: "COOL",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Likör", en: "Liqueur" },
    logo: "/brands/cool.png",
    descTr: "COOL, Brysis tarafından üretilen aromalı likör serisidir. %15 alkol oranına sahip 35 cl'lik şişelerde sunulan marka, Çilek, Yeşil Elma ve Espresso Karamel gibi farklı tat seçenekleriyle bar, restoran ve perakende satış noktalarında tüketicilere ulaşmaktadır. Meyvemsi ve tatlı karakteriyle öne çıkan COOL, kokteyl bazı olarak veya soğuk shot olarak tüketilmektedir.",
    descEn: "COOL is a flavored liqueur series produced by Brysis. Offered in 35 cl bottles at 15% ABV, the brand reaches consumers at bars, restaurants, and retail outlets with various flavor options including Strawberry, Green Apple, and Espresso Caramel. Standing out with its fruity and sweet character, COOL is consumed as a cocktail base or as a cold shot.",
  },
  cumbus: {
    name: "Cümbüş",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Şarap", en: "Wine" },
    logo: "/brands/aykut-ozkan.png",
    descTr: "Cümbüş, Aykut Özkan Şarapçılık portföyünde Çal/Denizli terroirine dayanan yerel bir şarap markasıdır. Çalkarası, Boğazkere ve Sultaniye gibi yerel üzüm çeşitlerinden üretilen kırmızı, beyaz ve roze şaraplardan oluşan seri, Çal bölgesinin benzersiz terroir özelliklerini yansıtır.",
    descEn: "Cümbüş is a local wine brand within the Aykut Özkan Winery portfolio, based on the Çal/Denizli terroir. The series consists of red, white, and rosé wines produced from local grape varieties such as Çalkarası, Boğazkere, and Sultaniye, reflecting the unique terroir characteristics of the Çal region.",
    varietiesTitleTr: "Şarap Çeşitleri",
    varietiesTitleEn: "Wine Varieties",
    varieties: [
      {
        name: "Çalkarası – Boğazkere",
        type: { tr: "Kırmızı Şarap", en: "Red Wine" },
        grapes: { tr: "Çalkarası, Boğazkere", en: "Çalkarası, Boğazkere" },
        abv: "%13 / 13%",
        descTr: "Sek kırmızı şarap. Burunda kırmızı meyve aromaları; damakta hafif tanenli, taze ve kolay içimli. Çal yöresinin otokton Çalkarası üzümü ile Anadolu'nun güçlü Boğazkere üzümünün dengeli birlikteliği.",
        descEn: "Dry red wine. Red fruit aromas on the nose; light tannins on the palate, fresh and easy-drinking. A balanced union of the indigenous Çalkarası grape from the Çal region with Anatolia's powerful Boğazkere grape.",
        color: "red",
      },
      {
        name: "Sultaniye",
        type: { tr: "Beyaz Şarap", en: "White Wine" },
        grapes: { tr: "Sultaniye", en: "Sultaniye" },
        abv: "%13 / 13%",
        descTr: "Sek beyaz şarap. Burunda güçlü meyvemsi ve çiçeksi kokular; damakta asidik, taze ve rahat içimli. Sultaniye üzümünün karakteristik aromasını yansıtan, yaz aylarında soğuk servis edilmesi önerilen bir beyaz şarap.",
        descEn: "Dry white wine. Strong fruity and floral aromas on the nose; acidic, fresh, and easy-drinking on the palate. A white wine reflecting the characteristic aroma of the Sultaniye grape, recommended to be served cold during summer months.",
        color: "white",
      },
      {
        name: "Çalkarası Roze",
        type: { tr: "Roze Şarap", en: "Rosé Wine" },
        grapes: { tr: "Çalkarası", en: "Çalkarası" },
        abv: "%13 / 13%",
        descTr: "Sek roze şarap. Burunda meyvemsi; damakta hafif asitli ve kolay içimli. Çal yöresinin otokton Çalkarası üzümünden üretilen, hafif ve ferahlatıcı bir roze.",
        descEn: "Dry rosé wine. Fruity on the nose; light acidity and easy-drinking on the palate. A light and refreshing rosé produced from the indigenous Çalkarası grape of the Çal region.",
        color: "rose",
      },
    ],
  },
  isabey: {
    name: "İsabey",
    origin: { tr: "Türkiye", en: "Turkey" },
    category: { tr: "Şarap", en: "Wine" },
    logo: "/brands/aykut-ozkan.png",
    descTr: "İsabey, Aykut Özkan Şarapçılık bünyesinde üretilen, Anadolu'nun zengin terroir mirasını çağdaş şarap yapım teknikleriyle buluşturan bir şarap markasıdır. Çal/Denizli bölgesinin otokton üzüm çeşitlerini uluslararası çeşitlerle harmanlayan İsabey, kırmızı, beyaz, roze ve meyve şaraplarından oluşan geniş bir portföye sahiptir. Her şişede Anadolu topraklarının karakterini yansıtan marka, kalite ve erişilebilirliği bir arada sunmayı hedefler.",
    descEn: "İsabey is a wine brand produced under the Aykut Özkan Winery, combining Anatolia's rich terroir heritage with contemporary winemaking techniques. Blending indigenous grape varieties from the Çal/Denizli region with international varieties, İsabey features a broad portfolio spanning red, white, rosé, and fruit wines. Reflecting the character of Anatolian soils in every bottle, the brand aims to offer both quality and accessibility.",
    varietiesTitleTr: "Şarap Çeşitleri",
    varietiesTitleEn: "Wine Varieties",
    varieties: [
      {
        name: "İsabey Reserve",
        type: { tr: "Kırmızı Şarap", en: "Red Wine" },
        grapes: { tr: "Cabernet Sauvignon", en: "Cabernet Sauvignon" },
        abv: "%13,5 – 15,5",
        descTr: "İsabey Reserve, %100 Cabernet Sauvignon üzümünden üretilen, meşe fıçılarda olgunlaştırılmış premium bir kırmızı şaraptır. Koyu kiraz kırmızısı renginde olan şarap, burunda siyah meyve (böğürtlen, karadut), baharat, vanilya ve hafif meşe notaları sunar. Damakta tam gövdeli, yapısal taninleri ve uzun bir bitişi olan bu şarap, kırmızı et yemekleri ve olgun peynirlere mükemmel eşlik eder.",
        descEn: "İsabey Reserve is a premium red wine crafted from 100% Cabernet Sauvignon grapes, aged in oak barrels. With a deep cherry-red color, it presents aromas of dark fruit (blackberry, mulberry), spice, vanilla, and subtle oak notes on the nose. Full-bodied on the palate with structural tannins and a long finish, this wine pairs excellently with red meat dishes and aged cheeses.",
        color: "red",
      },
      {
        name: "İsabey Boğazkere & Merlot",
        type: { tr: "Kırmızı Şarap", en: "Red Wine" },
        grapes: { tr: "Boğazkere, Merlot", en: "Boğazkere, Merlot" },
        abv: "%13 – 14,5",
        descTr: "Anadolu'nun güçlü Boğazkere üzümü ile Merlot'nun yumuşak meyvemsiliğini bir araya getiren bu harman, yapısal derinlik ve içilebilirliği dengeler. Koyu yakut renginde; burunda olgun kırmızı meyve, kurutulmuş erik ve karabiber notaları hissedilir. Damakta orta-tam gövdeli, dengeli tanin yapısı ve sıcak bir bitişle karakterize edilir.",
        descEn: "This blend combines the powerful Anatolian Boğazkere grape with the soft fruitiness of Merlot, balancing structural depth and drinkability. Deep ruby in color, it offers aromas of ripe red fruit, dried plum, and black pepper on the nose. Medium to full-bodied on the palate, it is characterized by balanced tannins and a warm finish.",
        color: "red",
      },
      {
        name: "İsabey Narince & Sauvignon Blanc",
        type: { tr: "Beyaz Şarap", en: "White Wine" },
        grapes: { tr: "Narince, Sauvignon Blanc", en: "Narince, Sauvignon Blanc" },
        abv: "%13,5",
        descTr: "Anadolu'nun zarif Narince üzümü ile Sauvignon Blanc'ın aromatik canlılığını buluşturan ferahlatıcı bir beyaz şarap. Açık sarı-yeşil renginde; burunda limon, greyfurt, yeşil elma ve taze ot notaları baskındır. Damakta canlı asidite, mineral dokunuşlar ve temiz bir bitiş sunar. Deniz mahsulleri ve hafif mezeler ile ideal uyum sağlar.",
        descEn: "A refreshing white wine that brings together the elegant Anatolian Narince grape with the aromatic vibrancy of Sauvignon Blanc. Pale yellow-green in color, it presents dominant notes of lemon, grapefruit, green apple, and fresh herbs on the nose. On the palate, it offers lively acidity, mineral touches, and a clean finish. Pairs ideally with seafood and light appetizers.",
        color: "white",
      },
      {
        name: "İsabey Emir & Chardonnay",
        type: { tr: "Beyaz Şarap", en: "White Wine" },
        grapes: { tr: "Emir, Chardonnay", en: "Emir, Chardonnay" },
        abv: "%13 – 14,5",
        descTr: "Kapadokya'nın yerlisi Emir üzümü ile Chardonnay'in dolgunluğunu harmanlayan bu beyaz şarap, tazelik ve meyvemsilik dengesini mükemmel yakalar. Altın sarısı renginde; burunda şeftali, kayısı, beyaz çiçek ve hafif tereyağımsı notalar sunar. Damakta orta gövdeli, kremsi bir doku ve uzun bir bitiş ile karakterize edilir.",
        descEn: "This white wine blends the native Cappadocian Emir grape with the richness of Chardonnay, perfectly capturing a balance of freshness and fruitiness. Golden yellow in color, it offers aromas of peach, apricot, white flowers, and subtle buttery notes on the nose. On the palate, it is characterized by a medium body, creamy texture, and a long finish.",
        color: "white",
      },
      {
        name: "İsabey Shiraz & Çal Karası",
        type: { tr: "Roze Şarap", en: "Rosé Wine" },
        grapes: { tr: "Shiraz, Çal Karası", en: "Shiraz, Çal Karası" },
        abv: "%13 – 14",
        descTr: "Shiraz'ın yapısal gücü ile Denizli Çal yöresinin otokton Çal Karası üzümünün zarif meyvemsiliğini bir araya getiren bu roze şarap, canlı pembe renginde dikkat çeker. Burunda çilek, ahududu ve nar çiçeği notaları sunar. Damakta orta-yüksek asidite, taze meyve aromaları ve ferahlatıcı bir bitişle öne çıkar. Yazlık salatalar ve hafif Akdeniz mutfağı ile mükemmel uyum sağlar.",
        descEn: "This rosé wine brings together the structural strength of Shiraz with the elegant fruitiness of the indigenous Çal Karası grape from the Çal region of Denizli. It catches the eye with its vibrant pink color. On the nose, it presents notes of strawberry, raspberry, and pomegranate blossom. The palate features medium-high acidity, fresh fruit flavors, and a refreshing finish. Pairs perfectly with summer salads and light Mediterranean cuisine.",
        color: "rose",
      },
      {
        name: "İsabey Meyve Şarapları",
        type: { tr: "Meyve Şarabı", en: "Fruit Wine" },
        grapes: { tr: "Vişne, Böğürtlen, Karadut, Nar, Çilek", en: "Sour Cherry, Blackberry, Mulberry, Pomegranate, Strawberry" },
        abv: "%10",
        descTr: "İsabey Meyve Şarapları serisi, doğal meyve özlerinden üretilen düşük alkollü (%10 ABV) alternatif bir şarap deneyimi sunar. Vişne, Böğürtlen, Karadut, Nar ve Çilek gibi çeşitlerden oluşan seri, yoğun meyve aromaları ve tatlımsı karakteriyle dikkat çeker. Her biri kendi meyve karakterini ön plana çıkaran bu şaraplar, soğuk servis edildiğinde aperatif olarak veya tatlılarla birlikte keyifle tüketilebilir.",
        descEn: "The İsabey Fruit Wines series offers a low-alcohol (10% ABV) alternative wine experience produced from natural fruit extracts. The series, featuring varieties such as Sour Cherry, Blackberry, Mulberry, Pomegranate, and Strawberry, stands out with its intense fruit aromas and semi-sweet character. Each wine highlights its own fruit character and can be enjoyed served cold as an aperitif or paired with desserts.",
        color: "fruit",
      },
    ],
    alcoholNoteTr: "Alkol düzeyi hakkında genel not: İsabey kırmızı şarapları %13 – 15,5 ABV, beyaz şarapları %13 – 14,5 ABV, roze şarabı %13 – 14 ABV aralığında konumlanır. İsabey Meyve Şarapları ise düşük alkollüdür (%10 ABV). Kesin alkol değerleri hasat yılına ve üretim şartlarına göre değişiklik gösterebilir.",
    alcoholNoteEn: "General note on alcohol levels: İsabey red wines are positioned in the 13–15.5% ABV range, white wines at 13–14.5% ABV, and rosé wine at 13–14% ABV. İsabey Fruit Wines are low-alcohol (10% ABV). Exact alcohol values may vary depending on the vintage year and production conditions.",
  },
};

const validBrands = Object.keys(brandData);

export function generateStaticParams() {
  const locales = ["tr", "en"];
  return locales.flatMap((locale) =>
    validBrands.map((brand) => ({ locale, brand }))
  );
}

export default async function BrandPage({
  params,
}: {
  params: { locale: string; brand: string };
}) {
  const { locale, brand } = params;

  if (!validBrands.includes(brand)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const t = dict.brandPage as Record<string, string>;
  const info = brandData[brand];
  const lang = locale === "en" ? "en" : "tr";
  const desc = lang === "en" ? info.descEn : info.descTr;
  const origin = info.origin[lang];
  const category = info.category[lang];
  const varietiesTitle = lang === "en"
    ? (info.varietiesTitleEn || "Product Varieties")
    : (info.varietiesTitleTr || "Ürün Çeşitleri");

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href={`/${locale}/markalarimiz`}
            className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-primary-400 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {t.backLink}
          </Link>
          <p className="text-primary-500 text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {category}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {info.name}
          </h1>
          <div className="flex items-center gap-2 mt-6">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
            </svg>
            <span className="text-gray-400 text-sm font-semibold tracking-wider uppercase">{origin}</span>
          </div>
        </div>
      </section>

      {/* Brand Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Brand Logo */}
            <div className={`relative aspect-[4/3] ${info.logoBg || "bg-transparent"} border border-gray-100 rounded-lg overflow-hidden ${info.imageFit === "cover" ? "" : "flex items-center justify-center p-10"}`}>
              {info.imageFit === "cover" ? (
                <Image
                  src={info.logo}
                  alt={info.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <Image
                  src={info.logo}
                  alt={info.name}
                  width={400}
                  height={300}
                  className="object-contain max-h-full"
                  priority
                />
              )}
            </div>

            {/* Brand info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                  {origin}
                </span>
                <span className="inline-flex px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                  {category}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {info.name}
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wine / Product Varieties Accordion */}
      {info.varieties && info.varieties.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <WineAccordion
              title={varietiesTitle}
              varieties={info.varieties.map((v) => ({
                name: v.name,
                type: v.type[lang],
                grapes: v.grapes[lang],
                abv: v.abv,
                description: lang === "en" ? v.descEn : v.descTr,
                color: v.color,
              }))}
              alcoholNote={
                lang === "en"
                  ? (info.alcoholNoteEn || "")
                  : (info.alcoholNoteTr || "")
              }
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-400 mb-10">
            {t.ctaDesc}
          </p>
          <Link href={`/${locale}/iletisim`} className="btn-white">
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
