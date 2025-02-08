import {
  TTrackerTransaction,
  TTrackerTransactionType,
} from "@/types/TTrackerTransaction";

export type ITransactionData = Omit<
  TTrackerTransaction,
  "created_at" | "id" | "type" | "amount"
> & {
  amount: TTrackerTransaction["amount"] | string;
  type?: TTrackerTransactionType;
};
