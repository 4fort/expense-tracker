"use client";

import { memo } from "react";
import { cubicBezier, motion } from "motion/react";

export const AnimatedDiv = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          y: -10,
          height: 0,
          marginTop: "-1rem",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0)",
          y: 0,
          height: "auto",
          marginTop: 0,
        }}
        exit={{
          opacity: 0,
          filter: "blur(10px)",
          y: -10,
          height: 0,
          marginTop: "-1rem",
        }}
        transition={{
          duration: 0.5,
          opacity: { duration: 0.2 },
          ease: cubicBezier(0.25, 0.1, 0.25, 1),
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedDiv.displayName = "AnimatedDiv";
