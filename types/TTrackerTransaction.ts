export type TTrackerTransaction = {
  id: string;
  description: string;
  amount: number;
  type: TTrackerTransactionType;
  created_at: string;
};

export type TTrackerTransactionType = "initial" | "income" | "expense";
