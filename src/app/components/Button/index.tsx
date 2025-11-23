import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Button({
  loading = false,
  icon,
  size = "medium",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(`button body-${size}`, className)} disabled={loading} {...props}>
      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : icon}
      {props.children}
    </button>
  );
}
