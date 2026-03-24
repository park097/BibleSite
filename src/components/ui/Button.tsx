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
  "inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium tracking-[0.08em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "border-primary bg-primary text-ink hover:bg-primary",
  secondary: "border-[#d8c3a0] bg-secondary text-ink hover:bg-secondary",
  ghost: "border-[#cfc1b0] bg-transparent text-ink hover:bg-transparent"
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
