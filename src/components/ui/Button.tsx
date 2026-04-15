"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "dark";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-navy hover:bg-gold-hover shadow-sm hover:shadow-md",
  secondary:
    "bg-transparent border border-gold text-gold hover:bg-gold hover:text-navy",
  ghost:
    "bg-transparent text-gold hover:underline underline-offset-4 px-0 py-0",
  dark:
    "bg-navy text-white hover:bg-navy-light",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-body font-medium text-[15px] tracking-wide rounded-lg px-8 py-3.5 transition-all duration-200 text-center select-none";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15, ease: "easeOut" as const },
  };

  if ("href" in props && props.href !== undefined) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link href={props.href} className={classes}>
          {children}
        </Link>
      </motion.span>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <motion.span {...motionProps} className="inline-block">
      <button className={classes} {...buttonProps}>
        {children}
      </button>
    </motion.span>
  );
}
