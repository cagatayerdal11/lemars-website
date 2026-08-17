"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface StatRingProps {
  target: number;
  suffix?: string;
  label: string;
  /** Halkanın dekoratif doluluk oranı (0..1). */
  pct?: number;
}

const R = 34;
const CIRC = 2 * Math.PI * R;

export default function StatRing({
  target,
  suffix = "",
  label,
  pct = 0.7,
}: StatRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [fill, setFill] = useState(0); // 0..1 halka doluluğu

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(target);
      setFill(pct);
      return;
    }
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * target));
      setFill(e * pct);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, pct, reduce]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={R} fill="none" stroke="#f3f4f6" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke="#E8611A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - fill)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-bold text-primary-700 tabular-nums">
          {count.toLocaleString("tr-TR")}
          {suffix}
        </div>
      </div>
      <div className="text-[11px] sm:text-xs text-gray-500 tracking-wider uppercase text-center">
        {label}
      </div>
    </div>
  );
}
