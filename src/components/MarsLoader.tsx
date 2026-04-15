"use client";

import { motion } from "framer-motion";

interface MarsLoaderProps {
  size?: number;
  text?: string;
}

export default function MarsLoader({ size = 48, text }: MarsLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {/* Mars gezegen */}
        <motion.circle
          cx="24"
          cy="24"
          r="10"
          fill="#E97316"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Halka */}
        <ellipse
          cx="24"
          cy="24"
          rx="20"
          ry="6"
          fill="none"
          stroke="#E97316"
          strokeWidth="2.5"
          opacity="0.6"
        />
      </motion.svg>
      {text && (
        <p className="text-sm text-gray-500 animate-pulse">{text}</p>
      )}
    </div>
  );
}
