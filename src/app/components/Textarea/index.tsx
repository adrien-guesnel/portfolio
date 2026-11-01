import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

import Field, { type FieldProps, fieldClass } from "@/src/app/components/Field";

type TextareaProps = FieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "required">;

export default function Textarea({
  label,
  name,
  isRequired,
  optionalLabel,
  error,
  className,
  ...textareaProps
}: TextareaProps) {
  return (
    <Field
      label={label}
      name={name}
      isRequired={isRequired}
      optionalLabel={optionalLabel}
      error={error}
    >
      {(control) => (
        <textarea className={clsx(fieldClass, className)} {...control} {...textareaProps} />
      )}
    </Field>
  );
}
