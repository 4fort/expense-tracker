"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const LabelInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & {
    label: string;
    labelClassName?: string;
    togglePassword?: boolean;
  }
>(
  (
    {
      className,
      type = "text",
      name,
      label,
      labelClassName,
      togglePassword = true,
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] = React.useState(type);

    const toggleVisibility = () => {
      setInputType((prevType) =>
        prevType === "password"
          ? type === "password"
            ? "text"
            : type
          : "password"
      );
    };

    return (
      <div className="flex flex-col relative text-sm">
        <LabelPrimitive.Root
          className={cn(
            "absolute left-4 top-1.5 text-xs font-semibold",
            labelClassName
          )}
          htmlFor={name}
        >
          {label}
        </LabelPrimitive.Root>
        <input
          id={name}
          name={name}
          type={inputType}
          ref={ref}
          className={cn(
            "pt-6 pb-2 bg-input rounded-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all",
            type === "password" ? "pl-4 pr-12" : "px-4",
            className
          )}
          {...props}
        />
        {togglePassword &&
          type === "password" &&
          (inputType === "password" ? (
            <Eye
              className="absolute right-4 top-0 bottom-0 my-auto"
              onClick={toggleVisibility}
            />
          ) : (
            <EyeOff
              className="absolute right-4 top-0 bottom-0 my-auto"
              onClick={toggleVisibility}
            />
          ))}
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";

export default LabelInput;
