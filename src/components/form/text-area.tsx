"use client";
import React from "react";
import { cn, Textarea as RizzTextArea } from "rizzui";
import type { TextareaProps } from "rizzui";

interface TextAreaProp extends TextareaProps {
  error?: string;
  label?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProp>(
  (
    { error, label, textareaClassName, className, placeholder, ...props },
    ref
  ) => (
    <div className="flex flex-col my-1">
      <RizzTextArea
        label={label}
        placeholder={placeholder}
        className={cn(className, "")}
        textareaClassName={cn(
          "px-5 ring-0 bg-[#F9F9F9] rounded-[10px] max-md:px-5 max-md:max-w-full border-[0.4px] border-primary placeholder:text-gray-400 min-h-[40px] max-h-[150px]",
          textareaClassName
        )}
        aria-label={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  )
);

export default TextArea;
