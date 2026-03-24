import clsx from "clsx";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx("rounded-lg bg-card p-6 shadow-card ring-1 ring-primary/5", className)}>
      {children}
    </div>
  );
}
