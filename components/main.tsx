import { cn } from "@/lib/utils";
import React from "react";

const Main = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return <main className={cn("h-full p-4", className)}>{children}</main>;
};

export default Main;
