"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Subtle radial + grid texture */}
      <div aria-hidden className="absolute inset-0 opacity-[0.07] pointer-events-none hero-texture-radial" />
      <div aria-hidden className="absolute inset-0 opacity-[0.05] pointer-events-none hero-texture-grid" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24"
      >
        <motion.p
          variants={item}
          className="font-body text-[13px] font-medium uppercase tracking-[0.2em] text-gold mb-8"
        >
          ISSA Certified Personal Trainer &mdash; Tampa, FL
        </motion.p>

        <motion.h1
          variants={item}
          className="font-heading font-bold uppercase tracking-wide leading-[0.95]"
        >
          <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-[72px] text-white">
            Your Body.
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-[72px] text-gold mt-2">
            Engineered.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 font-body text-lg text-gray-300 max-w-xl mx-auto leading-relaxed"
        >
          Premium personal training and online coaching designed to sculpt the
          strongest version of you.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/book"
            className="inline-flex items-center justify-center font-body text-[15px] font-medium bg-gold text-navy rounded-lg px-8 py-3.5 hover:bg-gold-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a Free Call
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center font-body text-[15px] font-medium bg-transparent border border-gold text-gold rounded-lg px-8 py-3.5 hover:bg-gold hover:text-navy transition-all duration-200"
          >
            View Programs
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
