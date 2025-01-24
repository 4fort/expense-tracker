"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const includedPaths = [
  "/login",
  "/signup",
  "/forgot-password",
  "/",
  "/profile",
  "/pocket",
];

const Main = ({
  children,
  className,
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
}>) => {
  const pathname = usePathname();

  const shouldAnimate = includedPaths.includes(pathname);

  return (
    <motion.main
      className={cn("flex-grow p-4 pb-24", className)}
      initial={{ opacity: shouldAnimate ? 0 : 1 }}
      animate={{ opacity: shouldAnimate ? 1 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.main>
  );
};

export default Main;
