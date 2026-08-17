"use client";

import { useState } from "react";
import Image from "next/image";

interface DistributorCardProps {
  name: string;
  logo: string;
  logoBg: string;
  brands: string;
  description: string;
}

export default function DistributorCard({
  name,
  logo,
  logoBg,
  brands,
  description,
}: DistributorCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`aspect-[3/2] ${logoBg || "bg-gray-50"} flex items-center justify-center p-8`}>
        <Image
          src={logo}
          alt={name}
          width={220}
          height={140}
          className="object-contain max-h-full"
        />
      </div>
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{name}</h3>
            <p className="text-xs text-gray-400">{brands}</p>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
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
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
