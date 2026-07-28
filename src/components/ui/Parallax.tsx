"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle transform-only parallax wrapper. Translates its child vertically by
 * up to ±`amount` px based on the element's position relative to the viewport
 * center. `baseScale` slightly oversizes the child so an overflow-hidden
 * parent never shows gaps at the travel extremes.
 *
 * Disabled below 861px and under prefers-reduced-motion (checked live, not
 * just at mount). rAF-throttled scroll handler; writes transform directly —
 * no React re-renders, no layout properties touched.
 */
export function Parallax({
  children,
  amount = 20,
  baseScale = 1,
  className,
  style,
}: {
  children: React.ReactNode;
  amount?: number;
  baseScale?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia(
      "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
    );

    let raf = 0;
    const tick = () => {
      raf = 0;
      if (!mq.matches) {
        el.style.transform = "";
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2 - vh / 2;
      const range = vh / 2 + r.height / 2;
      const t = Math.max(-1, Math.min(1, center / range));
      const scale = baseScale === 1 ? "" : ` scale(${baseScale})`;
      el.style.transform = `translate3d(0, ${(-t * amount).toFixed(1)}px, 0)${scale}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount, baseScale]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
