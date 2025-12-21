"use client";

import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  isRequired?: boolean;
  value?: string;
  placeholder?: string;
}

export default function Textarea({
  label,
  isRequired = false,
  name,
  value,
  placeholder,
  className,
  ...textareaProps
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold tracking-wider text-base-content/60" htmlFor={name}>
        {label} {isRequired ? <span className="text-primary">*</span> : null}
      </label>
      <textarea
        className={clsx(
          "body-medium w-full rounded-2xl border border-base-300 glass-input px-4 py-4 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/30",
          className,
        )}
        name={name}
        id={name}
        defaultValue={value}
        placeholder={placeholder}
        required={isRequired}
        {...textareaProps}
      />
    </div>
  );
}
