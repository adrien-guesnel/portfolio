import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "neutral" | "ghost";
type ButtonSize = "md" | "sm";

export function buttonClass({
  variant = "primary",
  size = "md",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} = {}) {
  return clsx(
    "inline-flex items-center justify-center gap-2.5 text-center font-semibold",
    size === "md" && "min-h-13 rounded-xl px-5.5 text-base",
    size === "sm" && "min-h-11 whitespace-nowrap rounded-[10px] px-4.5 text-[15px]",
    variant === "primary" && "bg-primary text-primary-content hover:text-primary-content",
    variant === "neutral" && "bg-neutral text-neutral-content hover:text-neutral-content",
    variant === "ghost" && "border border-line-strong bg-surface text-fg hover:bg-hover",
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  loading = false,
  icon,
  variant,
  size,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        buttonClass({ variant, size }),
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {!loading && icon}
      {children}
    </button>
  );
}
