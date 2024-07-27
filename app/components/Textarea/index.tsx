"use client"

import React, { TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  isRequired?: boolean
  value?: string
  placeholder?: string
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
        className="border body-medium border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-5"
        name={name}
        id={name}
        defaultValue={value}
        placeholder={placeholder}
        required={isRequired}
        {...textareaProps}
      />
    </div>
  )
}
