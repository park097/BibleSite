import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "border-primary bg-primary text-white hover:bg-[#183b5d]",
  secondary: "border-accent bg-secondary text-primary hover:bg-[#efe7db]",
  ghost: "border-primary/30 bg-transparent text-primary hover:bg-primary hover:text-white"
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  onClick,
  disabled
}: ButtonProps) {
  const classes = clsx(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
