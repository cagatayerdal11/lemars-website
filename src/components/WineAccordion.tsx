"use client";

import { useState } from "react";

interface WineVarietyItem {
  name: string;
  type: string;
  grapes: string;
  abv: string;
  description: string;
  color: string;
}

export default function WineAccordion({
  title,
  varieties,
  alcoholNote,
}: {
  title: string;
  varieties: WineVarietyItem[];
  alcoholNote: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-50 text-red-700 border-red-200";
      case "white":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rose":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "fruit":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        {title}
      </h3>
      <div className="space-y-3">
        {varieties.map((variety, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 md:px-6 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${getColorClasses(variety.color)}`}
                >
                  {variety.type}
                </span>
                <span className="font-semibold text-gray-900 text-sm md:text-base">
                  {variety.name}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-3 ${openIndex === index ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 md:px-6 pb-5 border-t border-gray-100">
                <div className="flex flex-wrap gap-4 mt-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {variety.grapes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      ABV
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {variety.abv}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {variety.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alcoholNote && (
        <p className="mt-8 text-sm text-gray-400 italic leading-relaxed">
          {alcoholNote}
        </p>
      )}
    </div>
  );
}
