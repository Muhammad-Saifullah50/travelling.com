import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
  id: string;
  errors: FieldErrors;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ register, id, required, placeholder, errors, disabled, type, }) => {
    return (
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        autoComplete={id}
        {...register(id, { required })}
        className={clsx("form-input w-full rounded-md block border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6",
          errors[id] ? "focus-visible:ring-rose-500" : '',
          disabled && "opacity-50 cursor-default"
        )}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
