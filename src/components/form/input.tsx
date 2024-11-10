"use client";
import { cn } from "rizzui";
import React from "react";
import { Input as RizzInput } from "rizzui";
import type { InputProps } from "rizzui";

interface InputProp extends InputProps {
  error?: string;
  label?: string;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProp>(
  (
    { error, label, inputClassName, className, type, placeholder, ...props },
    ref
  ) => (
    <div className="flex flex-col my-1">
      <RizzInput
        label={label}
        type={type}
        placeholder={placeholder}
        className={cn(className, "")}
        inputClassName={cn(
          "px-5 ring-0 bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full border-[0.4px] border-primary placeholder:text-gray-400",
          inputClassName
        )}
        aria-label={placeholder}
        ref={ref}
        {...props}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  )
);

export default Input;
