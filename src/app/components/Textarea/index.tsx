"use client";

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
  ...textareaProps
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-5 px-6 py-4">
      <label className="body-medium" htmlFor={name}>
        {label} {isRequired ? <span className="text-primary">*</span> : null}
      </label>
      <textarea
        className="body-medium rounded-2xl border border-gray-300 px-4 py-5 text-black dark:border-gray-700"
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
