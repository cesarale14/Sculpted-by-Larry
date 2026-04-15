"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] md:hidden bg-navy-light/95 backdrop-blur-md flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-end h-16 px-6">
            <button
              className="p-2 text-white hover:text-gold transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-heading text-3xl uppercase tracking-wide text-white hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants}>
                <Link
                  href="/book"
                  onClick={onClose}
                  className="inline-flex items-center font-body text-sm font-medium bg-gold text-navy px-8 py-4 rounded-lg hover:bg-gold-hover transition-colors"
                >
                  Book a Call
                </Link>
              </motion.li>
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
