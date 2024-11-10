"use client";
import { cn } from "rizzui";
import React, { FC, ReactNode } from "react";
import { Loader } from "rizzui";

type ButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  handleClick,
  type = "button",
  className = "",
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn(
        "inline-flex justify-center items-center px-8 py-4 mt8 max-w-full text-base font-normal text-center text-white whitespace-nowrap !bg-primary rounded-xl w-full max-md:px-5 hover:opacity-85 transition-all focus:outline-none focus:ring-0 shadow-[0px_4px_16px_rgba(0,165,81,0.39)] disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      disabled={loading}
    >
      {loading && <Loader variant="spinner" className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};

const buttonVariants = {
  default: "bg-primary text-white hover:bg-primary/90",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  outline:
    "border border-input text-black hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-white hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "underline-offset-4 hover:underline text-primary",
};

export interface KadaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const KadaButton = React.forwardRef<HTMLButtonElement, KadaButtonProps>(
  (
    {
      className,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-[36px] text-white whitespace-nowrap px-4",
          className,
          buttonVariants[props.variant || "default"]
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader variant="spinner" className="mr-2 h-4 w-4" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);
KadaButton.displayName = "KadaButton";

export { KadaButton };

export default Button;
