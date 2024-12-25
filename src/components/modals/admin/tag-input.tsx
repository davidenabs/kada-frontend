"use client";
import Input from "@/components/form/input";
import { CloseIcon } from "@/icons";
import React, { useState, KeyboardEvent, forwardRef } from "react";
import { Badge, cn } from "rizzui";

export interface TagInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  tags?: string[];
  onTagChange?: (tags: string[]) => void;
  maxTags?: number;
  error?: boolean;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      tags = [],
      onTagChange,
      maxTags = 10,
      placeholder = "Add tags...",
      className,
      error,
      disabled,
      ...props
    },
    ref
  ) => {
    const [input, setInput] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag();
      } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    const addTag = () => {
      const trimmedInput = input.trim().toLowerCase();
      if (
        trimmedInput &&
        !tags.includes(trimmedInput)
        // tags.length < maxTags
      ) {
        const newTags = [...tags, trimmedInput];
        onTagChange?.(newTags);
        setInput("");
      }
    };

    const removeTag = (index: number) => {
      const newTags = tags.filter((_, i) => i !== index);
      onTagChange?.(newTags);
    };

    return (
      <div className={cn("w-full space-y-2", className)}>
        <div
          className={cn(
            error && "border-destructive",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Input
            // @ts-ignore
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            placeholder="Add tags..."
            label="Tags"
            helperText={`Press enter or comma to add a filter`}
            helperClassName="text-xs text-gray-500"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className="flex items-center gap-1 px-3 py-1 text-xs font-light"
              color="primary"
              variant="outline"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-destructive focus:outline-none"
                disabled={disabled}
              >
                <CloseIcon className="h-2 w-2" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    );
  }
);
