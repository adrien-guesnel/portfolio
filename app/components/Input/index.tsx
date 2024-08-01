"use client"

import ContactImg from "@public/img/contact.png"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { HTMLAttributes, HTMLInputTypeAttribute } from "react"

import { HIRE_ME_URL } from "@/app/lib/constants"

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  isRequired?: boolean
  value?: string
  placeholder?: string
  type: HTMLInputTypeAttribute
}

export default function Input({
  label,
  isRequired = false,
  name,
  value,
  placeholder,
  type,
  ...inputProps
}: InputProps) {
  return (
    <div className="flex flex-col gap-5 px-6 py-4">
      <label className="body-medium" htmlFor={name}>
        {label} {isRequired ? <span className="text-primary">*</span> : null}
      </label>
      <input
        className="body-medium rounded-2xl border border-gray-300 px-4 py-5 text-black dark:border-gray-700"
        name={name}
        id={name}
        defaultValue={value}
        placeholder={placeholder}
        type={type}
        required={isRequired}
        {...inputProps}
      />
    </div>
  )
}
