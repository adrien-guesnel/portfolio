import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

import Field, { type FieldProps, fieldClass } from "@/src/app/components/Field";

type InputProps = FieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "required">;

export default function Input({
  label,
  name,
  isRequired,
  optionalLabel,
  error,
  className,
  ...inputProps
}: InputProps) {
  return (
    <Field
      label={label}
      name={name}
      isRequired={isRequired}
      optionalLabel={optionalLabel}
      error={error}
    >
      {(control) => <input className={clsx(fieldClass, className)} {...control} {...inputProps} />}
    </Field>
  );
}
