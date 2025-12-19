import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
}

export function Button({
  loading = false,
  icon,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx("btn", className, loading && "loading")}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {!loading && icon}
      {children}
    </button>
  );
}
