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
    error?: boolean;
    errorMessage?: string;
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
      error = false,
      errorMessage,
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
      <div>
        <div className="flex flex-col relative text-sm">
          <LabelPrimitive.Root
            className={cn(
              "absolute left-4 top-1.5 text-xs font-semibold",
              error && "text-destructive",
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
              error && "ring ring-destructive",
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
        {error && (
          <p className="text-sm text-destructive  rounded-sm mt-2">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";

const LabelTextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea"> & {
    label: string;
    labelClassName?: string;
    error?: boolean;
    errorMessage?: string;
  }
>(
  (
    {
      className,
      name,
      label,
      labelClassName,
      error = false,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col relative text-smS">
        <div className="absolute left-0 top-0 ps-4 pt-1.5 w-full rounded-t-sm bg-input z-10">
          <LabelPrimitive.Root
            className={cn(
              "text-xs font-semibold",
              error && "text-destructive",
              labelClassName
            )}
            htmlFor={name}
          >
            {label}
          </LabelPrimitive.Root>
        </div>
        <textarea
          id={name}
          name={name}
          ref={ref}
          className={cn(
            "pt-6 pb-2 bg-input rounded-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all",
            "pl-4 pr-4",
            error && "ring ring-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive  rounded-sm mt-2">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

LabelTextArea.displayName = "LabelTextArea";

export { LabelInput, LabelTextArea };

export default LabelInput;
