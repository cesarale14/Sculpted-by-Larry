import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-block px-8 py-3 rounded-lg font-body font-medium text-base transition-all duration-200 text-center";

  const style: React.CSSProperties =
    variant === "primary"
      ? { background: "var(--accent)", color: "var(--accent-text)" }
      : {
          border: "2px solid var(--accent)",
          color: "var(--accent)",
          background: "transparent",
        };

  const classes = `${base} hover:brightness-110 ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} style={style} {...props}>
      {children}
    </button>
  );
}
