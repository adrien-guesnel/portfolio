import clsx from "clsx";
import type { HTMLAttributes, HTMLInputTypeAttribute } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isRequired?: boolean;
  value?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
}

export default function Input({
  label,
  isRequired = false,
  name,
  value,
  placeholder,
  type,
  className,
  ...inputProps
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold tracking-wider text-gray" htmlFor={name}>
        {label} {isRequired ? <span className="text-primary">*</span> : null}
      </label>
      <input
        className={clsx(
          "body-medium w-full rounded-full border border-base-300 glass-input px-4 py-4 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/30",
          className,
        )}
        name={name}
        id={name}
        defaultValue={value}
        placeholder={placeholder}
        type={type}
        required={isRequired}
        {...inputProps}
      />
    </div>
  );
}
