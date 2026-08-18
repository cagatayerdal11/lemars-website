"use client";

import { useEffect, useRef } from "react";

/**
 * LEMARS gezegen (MARS) özel imleci.
 * - Yalnızca masaüstü / fine-pointer cihazlarda (mobil/dokunmatikte native davranış).
 * - prefers-reduced-motion açıksa devre dışı (native imleç).
 * - Form alanlarında (input/textarea) native caret korunur.
 */
export default function MarsCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // native imleç
    }

    document.body.classList.add("mars-cursor-on");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onDown = () => el.classList.add("mars-cursor--down");
    const onUp = () => el.classList.remove("mars-cursor--down");
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest?.(
        "a,button,[role='button'],label,select,summary"
      );
      el.classList.toggle("mars-cursor--hover", interactive);
    };

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, true);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("mars-cursor-on");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver, true);
    };
  }, []);

  return (
    <div ref={ref} className="mars-cursor" aria-hidden="true">
      <svg viewBox="0 0 40 40" width="34" height="34">
        <circle cx="20" cy="20" r="9" fill="#ea580c" />
        <circle cx="16.5" cy="16.5" r="3" fill="#fdba74" opacity="0.9" />
        <ellipse
          cx="20"
          cy="20"
          rx="17"
          ry="4.6"
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          transform="rotate(-18 20 20)"
        />
      </svg>
    </div>
  );
}
