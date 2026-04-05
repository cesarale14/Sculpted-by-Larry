"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden backdrop-blur-sm overflow-hidden"
          style={{
            background:
              theme === "dark"
                ? "rgba(15, 21, 37, 0.95)"
                : "rgba(248, 246, 241, 0.95)",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <ul className="flex flex-col items-center gap-6 py-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-lg font-body"
                  style={
                    link.label === "Book a Call"
                      ? {
                          background: "var(--accent)",
                          color: "var(--accent-text)",
                          padding: "0.5rem 1.5rem",
                          borderRadius: "0.5rem",
                          display: "inline-block",
                        }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
