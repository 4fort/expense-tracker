import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

const LabelInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & {
    label: string;
    labelClassName?: string;
  }
>(
  (
    { className, type = "text", name, label, labelClassName, ...props },
    ref
  ) => {
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
          type={type}
          ref={ref}
          className={cn(
            "px-4 pt-6 pb-2 bg-input rounded-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";

export default LabelInput;
