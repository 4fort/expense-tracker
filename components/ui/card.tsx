import * as React from "react";
import { motion, HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

type CardProps = {
  isMotion?: boolean;
} & (HTMLMotionProps<"div"> | React.HTMLAttributes<HTMLDivElement>);

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, isMotion, ...props }, ref) => {
    if (isMotion) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            "rounded-lg bg-card text-card-foreground shadow-sm",
            className
          )}
          {...(props as HTMLMotionProps<"div">)}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-card text-card-foreground shadow-sm",
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
