export interface DBEntryTrackerTransaction {
  tracker_id: number;
  amount: number;
  description: string;
  type: "initial" | "income" | "expense";
}
