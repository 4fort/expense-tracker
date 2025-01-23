import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export const getCurrentDay = (): string => {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: "short", // "Oct"
    day: "numeric", // "12"
    hour: "numeric", // "1"
    minute: "2-digit", // "37"
    hour12: true, // "PM"
  };

  return now.toLocaleString("en-US", options);
};
