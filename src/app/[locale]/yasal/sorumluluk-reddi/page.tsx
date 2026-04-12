import { getDictionary, Locale } from "@/i18n/config";

export default async function SorumlulukReddi({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const legal = dict.legal as Record<string, unknown>;
  const t = legal.disclaimer as Record<string, unknown>;

  const sections = [
    t.section1 as { title: string; content: string },
    t.section2 as { title: string; content: string },
    t.section3 as { title: string; content: string },
    t.section4 as { title: string; content: string },
    t.section5 as { title: string; content: string },
  ];

  return (
    <>
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">{t.title as string}</h1>
          <p className="text-gray-400 mt-4">{t.subtitle as string}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <p className="text-orange-800 text-sm font-medium text-center leading-relaxed">
                {t.warning as string}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
