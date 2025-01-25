import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export const datefmt = (date: Date | string) => {
  let _date;
  if (typeof date === "string") {
    _date = new Date(date);
  } else {
    _date = date;
  }

  const short = new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
  }).format(_date);

  const standardLong = new Intl.DateTimeFormat("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(_date);

  const standardShort = new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(_date);

  const standardNumeric = new Intl.DateTimeFormat("en-PH", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(_date);

  const mediumTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short", // "Oct"
      day: "numeric", // "12"
      hour: "numeric", // "1"
      minute: "2-digit", // "37"
      hour12: true, // "PM"
    };
    const tmp_date = new Date(_date);
    return tmp_date.toLocaleString("en-US", options);
  };

  const addOneDay = () => {
    const tmp_date = new Date(_date);
    const _addOneDay = tmp_date.setDate(tmp_date.getDate() + 1);
    return new Date(_addOneDay);
  };

  return {
    short,
    standardLong,
    standardShort,
    standardNumeric,
    mediumTime,
    addOneDay,
  };
};

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
