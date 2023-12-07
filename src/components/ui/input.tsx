import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import clsx from "clsx"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>
  id: string
  errors: FieldErrors
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ register, id, required, errors, className, disabled, type, ...props }, ref) => {
    return (
      <input
        type={type}
        {...register(id, { required })}
        className={clsx(
          "flex h-10 w-full rounded-sm border  bg-white px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50  ",
          className,
          errors[id] && 'focus:ring-rose-500',
          disabled && 'opacity-50, cursor-not-allowed'
        )}

        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
