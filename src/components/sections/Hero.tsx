"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-body"
          style={{ color: "var(--accent)" }}
        >
          ISSA Certified Personal Trainer &mdash; Tampa, FL
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold uppercase tracking-wider leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Your Body.
          <br />
          <span style={{ color: "var(--accent)" }}>Engineered.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl max-w-xl mx-auto font-body"
          style={{ color: "var(--text-secondary)" }}
        >
          Premium personal training and online coaching designed to sculpt the
          strongest version of you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/book">Book a Free Call</Button>
          <Button href="/programs" variant="outline">
            View Programs
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
