"use client";

import { motion } from "framer-motion";

export function Card({
  children,
  className = "",
  gold = false,
}: {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl p-6 md:p-8 ${className}`}
      style={{
        background: "var(--bg-card)",
        border: gold
          ? "2px solid var(--accent)"
          : "1px solid var(--border-color)",
      }}
    >
      {children}
    </motion.div>
  );
}
