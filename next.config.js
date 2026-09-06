/** @type {import('next').NextConfig} */

// Kaldırılan marka detay sayfaları. İçerikleri (tadım/aroma anlatımı, ürün ve ambalaj
// görselleri, marka logoları, "fiyat bilgisi alın" çağrısı) Satış ve Sunum Yönetmeliği
// m.11/4 1. cümlesi ("reklam ve ürün tanıtımı yapılmaksızın ve görsel unsurlar
// kullanmaksızın liste halinde") ile 4250 s.K. m.6/1 kapsamında yayımdan kaldırılmıştır.
//
// Marka ADLARI üst sayfada (/markalarimiz) düz metin liste olarak yayımlanmaya devam
// ettiği için kalıcı yönlendirme ana sayfaya değil, İÇERİĞİN DEVREDİLDİĞİ ÜST SAYFAYA
// yapılır. Eski içerik git geçmişinde korunur (bfee389 ve öncesi).
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
          destination: `/${locale}/markalarimiz`,
          permanent: true,
        }))
      ),
      // Locale öneki olmayan eski bağlantılar
      ...REMOVED_BRAND_SLUGS.map((slug) => ({
        source: `/markalarimiz/${slug}`,
        destination: "/tr/markalarimiz",
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;
