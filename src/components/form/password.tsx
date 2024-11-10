"use client";
import { cn } from "rizzui";
import React from "react";
import { Password as RizzPassword } from "rizzui";
import type { PasswordProps } from "rizzui";

interface PasswordProp extends PasswordProps {
  placeholder: string;
  error?: string;
}

const Password = React.forwardRef<HTMLInputElement, PasswordProp>(
  ({ placeholder, className, error = "", inputClassName, ...props }, ref) => (
    <div className="flex flex-col my-1">
      <RizzPassword
        ref={ref}
        placeholder={placeholder}
        className={cn(className, "")}
        inputClassName={cn(
          `px-5 ring-0 border-[0.4px] border-primary bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full placeholder:text-gray-400`,
          inputClassName
        )}
        aria-label={placeholder}
        {...props}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  )
);

export default Password;
