"use client";

import { useEffect, useState } from "react";

/** Sayfa üstünde ince turuncu okuma-ilerleme çubuğu. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary-600 origin-left"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
