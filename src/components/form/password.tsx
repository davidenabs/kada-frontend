"use client";
import React from "react";
import { Password as RizzPassword } from "rizzui";
import type { PasswordProps } from "rizzui";

interface PasswordProp extends PasswordProps {
  placeholder: string;
  className?: string;
  error?: string;
}

const Password = React.forwardRef<HTMLInputElement, PasswordProp>(
  ({ placeholder, className, error = "", ...props }, ref) => (
    <div className="flex flex-col my-1">
      <RizzPassword
        ref={ref}
        placeholder={placeholder}
        className={``}
        inputClassName={`px-5 py-8 ring-0 border--400 bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full border-0 ${className}`}
        aria-label={placeholder}
        {...props}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  )
);

export default Password;
