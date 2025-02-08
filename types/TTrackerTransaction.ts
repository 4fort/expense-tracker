import { TTracker } from "./TTracker";

export type TTrackerTransaction = {
  id: string;
  description: string;
  amount: number;
  type: TTrackerTransactionType;
  created_at: string;
};

export type TTrackerTransactionDisplay = TTrackerTransaction & {
  tracker: {
    name: string;
    icon: TTracker["icon"];
    color: TTracker["color"];
  };
};

export type TTrackerTransactionType = "initial" | "income" | "expense";
