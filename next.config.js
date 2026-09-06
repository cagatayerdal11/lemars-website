/** @type {import('next').NextConfig} */

// Kaldırılan marka detay sayfaları. İçerikleri (tadım/aroma anlatımı, ürün ve ambalaj
// görselleri, marka logoları, "fiyat bilgisi alın" çağrısı) Satış ve Sunum Yönetmeliği
// m.11/4 1. cümlesi ("reklam ve ürün tanıtımı yapılmaksızın ve görsel unsurlar
// kullanmaksızın liste halinde") ile 4250 s.K. m.6/1 kapsamında yayımdan kaldırılmıştır.
//
// /markalarimiz sayfası da kaldırılmıştır: distribütörlükler sayfasıyla içerik olarak
// örtüştüğü için tek sayfada birleştirilmiştir. Bu nedenle hem marka detay sayfaları
// hem de /markalarimiz kalıcı olarak /distributorluklerimiz sayfasına yönlendirilir —
// içeriğin devredildiği sayfa burasıdır. Eski içerik git geçmişinde korunur.
//
// Kaldırılan statik dosyalar (public/drinks-hero.jpg, public/drinks-illustration.svg,
// public/brands/*.png) dizinden silindiği için doğrudan URL ile istendiğinde 404 döner;
// ayrıca bir yönlendirme kuralına gerek yoktur. CDN/eski dağıtım önbelleği için yayın
// sonrası kontrol listesine bakınız.
const REMOVED_BRAND_SLUGS = [
  "scotch-blue",
  "hlibny-dar",
  "marengo",
  "suvorov",
  "cool",
  "cumbus",
  "isabey",
];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      ...["tr", "en"].flatMap((locale) =>
        REMOVED_BRAND_SLUGS.map((slug) => ({
          source: `/${locale}/markalarimiz/${slug}`,
          destination: `/${locale}/distributorluklerimiz`,
          permanent: true,
        }))
      ),
      // Kaldırılan marka listesi sayfası
      ...["tr", "en"].map((locale) => ({
        source: `/${locale}/markalarimiz`,
        destination: `/${locale}/distributorluklerimiz`,
        permanent: true,
      })),
      { source: "/markalarimiz", destination: "/tr/distributorluklerimiz", permanent: true },
      // Locale öneki olmayan eski bağlantılar
      ...REMOVED_BRAND_SLUGS.map((slug) => ({
        source: `/markalarimiz/${slug}`,
        destination: "/tr/distributorluklerimiz",
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;
