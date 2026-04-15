"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface AnnouncementBarProps {
  onDismiss: () => void;
}

export function AnnouncementBar({ onDismiss }: AnnouncementBarProps) {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-gold text-navy flex items-center justify-center px-12 shadow-sm">
      <p className="font-body text-xs sm:text-sm font-medium text-center">
        Free 5-Day Sculpt Plan —{" "}
        <Link
          href="/free-plan"
          className="underline underline-offset-2 hover:no-underline"
        >
          Download Now &rarr;
        </Link>
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-navy/10 rounded transition-colors"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
