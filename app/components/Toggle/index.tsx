import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useState } from "react"

export default function Toggle({
  value = false,
  onChange,
  iconLeft,
  iconRight,
}: {
  value: boolean
  onChange: (value: boolean) => void
  iconLeft?: IconProp
  iconRight?: IconProp
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {iconLeft ? (
        <FontAwesomeIcon
          icon={iconLeft}
          className={clsx(
            value ? "text-gray-400 dark:text-gray-600" : "text-primary",
          )}
        />
      ) : null}

      <div className="relative inline-block h-5 w-11">
        <input
          checked={value}
          id="switch-component-1"
          type="checkbox"
          className="peer h-5 w-11 cursor-pointer appearance-none rounded-full bg-slate-100 transition-colors duration-300 checked:bg-primary dark:bg-slate-800"
          onChange={(e) => {
            onChange(e.target.checked)
          }}
        />
        <label
          htmlFor="switch-component-1"
          className="absolute left-0 top-0 h-5 w-5 cursor-pointer rounded-full border border-slate-300 bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 dark:border-slate-500 dark:bg-black dark:peer-checked:border-slate-500"
        ></label>
      </div>
      {iconRight ? (
        <FontAwesomeIcon
          icon={iconRight}
          className={clsx(
            value ? "text-primary" : "text-gray-400 dark:text-gray-600",
          )}
        />
      ) : null}
    </div>
  )
}
