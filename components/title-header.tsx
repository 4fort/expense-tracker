"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  className?: string;
  hasBackButton?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function TitleHeader({
  title,
  className,
  hasBackButton,
  size = "lg",
}: Props) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 flex items-center justify-center h-16 px-4 z-40",
        className
      )}
    >
      {hasBackButton && (
        <Button
          className="absolute left-4"
          variant="ghost"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </Button>
      )}
      <h1
        className={cn(
          "font-bold",
          size === "sm"
            ? "text-md"
            : size === "md"
            ? "text-xl"
            : size === "lg"
            ? "text-2xl"
            : ""
        )}
      >
        {title}
      </h1>
    </header>
  );
}
