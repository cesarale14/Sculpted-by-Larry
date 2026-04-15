"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  featured?: boolean;
}

export function Card({
  children,
  className = "",
  variant = "dark",
  featured = false,
}: CardProps) {
  const base =
    variant === "dark"
      ? "bg-navy-light border border-navy-lighter"
      : "bg-white border border-gray-100 shadow-sm";

  const featuredClasses = featured
    ? "border-gold md:scale-[1.02]"
    : "";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative rounded-2xl p-8 transition-all ${base} ${featuredClasses} ${className}`}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold rounded-t-2xl" />
      )}
      {children}
    </motion.div>
  );
}
