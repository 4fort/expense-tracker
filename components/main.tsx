import { cn } from "@/lib/utils";
import React from "react";

const Main = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <main className={cn("flex-grow p-4 pb-24", className)}>{children}</main>
  );
};

export default Main;
