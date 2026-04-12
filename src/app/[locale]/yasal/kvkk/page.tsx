import { getDictionary, Locale } from "@/i18n/config";

export default async function KVKK({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale as Locale);
  const legal = dict.legal as Record<string, unknown>;
  const t = legal.privacy as Record<string, unknown>;

  const sectionsWithList = [
    { key: "section2", data: t.section2 as { title: string; content: string; list?: string[] } },
    { key: "section3", data: t.section3 as { title: string; content: string; list?: string[] } },
    { key: "section6", data: t.section6 as { title: string; content: string; list?: string[] } },
  ];

  const plainSections = [
    t.section1 as { title: string; content: string },
    t.section4 as { title: string; content: string },
    t.section5 as { title: string; content: string },
    t.section7 as { title: string; content: string },
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
            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{plainSections[0].title}</h2>
              <p>{plainSections[0].content}</p>
            </div>

            {/* Section 2 - with list */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{sectionsWithList[0].data.title}</h2>
              <p>{sectionsWithList[0].data.content}</p>
              {sectionsWithList[0].data.list && (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {sectionsWithList[0].data.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Section 3 - with list */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{sectionsWithList[1].data.title}</h2>
              <p>{sectionsWithList[1].data.content}</p>
              {sectionsWithList[1].data.list && (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {sectionsWithList[1].data.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{plainSections[1].title}</h2>
              <p>{plainSections[1].content}</p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{plainSections[2].title}</h2>
              <p>{plainSections[2].content}</p>
            </div>

            {/* Section 6 - with list */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{sectionsWithList[2].data.title}</h2>
              <p>{sectionsWithList[2].data.content}</p>
              {sectionsWithList[2].data.list && (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {sectionsWithList[2].data.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{plainSections[3].title}</h2>
              <p>
                {plainSections[3].content}{" "}
                <a href="mailto:info@lemars.com" className="text-primary-700 font-semibold hover:underline">
                  info@lemars.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
