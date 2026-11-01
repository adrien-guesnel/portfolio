import type { ReactNode } from "react";

export const fieldClass =
  "min-h-12 w-full rounded-[10px] border border-field bg-base-100 px-3.5 py-3 text-base text-fg placeholder:text-faint focus-visible:border-link";

export interface FieldControlProps {
  id: string;
  name: string;
  required: boolean;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
}

export interface FieldProps {
  label: string;
  name: string;
  isRequired?: boolean;
  optionalLabel?: string;
  error?: string;
}

export default function Field({
  label,
  name,
  isRequired = false,
  optionalLabel,
  error,
  children,
}: FieldProps & { children: (control: FieldControlProps) => ReactNode }) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-fg" htmlFor={name}>
        {label}
        {!isRequired && optionalLabel ? (
          <span className="font-normal text-muted"> {optionalLabel}</span>
        ) : null}
      </label>
      {children({
        id: name,
        name,
        required: isRequired,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": isRequired ? errorId : undefined,
      })}
      {isRequired ? (
        <p id={errorId} className="text-sm text-error-fg" hidden={!error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
