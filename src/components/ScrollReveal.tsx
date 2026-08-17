"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  const offsets = {
    up: { y: 32, x: 0 },
    left: { y: 0, x: -32 },
    right: { y: 0, x: 32 },
  };

  // "Reduced motion" tercihinde (ve mobilde daha stabil olması için) yalnızca
  // opacity animasyonu — yatay kayma yok, böylece mobilde yatay taşma/titreme olmaz.
  const initial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...offsets[direction] };
  const inView = reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={inView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
