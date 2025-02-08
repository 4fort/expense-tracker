"use server";

import { DBEntryTrackerTransaction } from "@/types/DBEntryTrackerTransaction";
import { TTrackerTransaction } from "@/types/TTrackerTransaction";
import { createClient } from "@/utils/supabase/server";

export async function addTransaction(
  currentState: {
    error: string[];
    data: TTrackerTransaction | null;
  },
  formData: FormData
): Promise<{ error: string[]; data: TTrackerTransaction | null }> {
  const supabase = await createClient();

  const transaction: DBEntryTrackerTransaction = {
    tracker_id: parseInt(formData.get("tracker_id") as string),
    amount: parseFloat(formData.get("amount") as string),
    description: formData.get("description") as string,
    type: formData.get("type") as TTrackerTransaction["type"],
  };

  const { data: transaction_data, error: transaction_error } = await supabase
    .from("tracker_transactions")
    .insert(transaction)
    .select()
    .single<TTrackerTransaction>();

  if (transaction_error && !transaction_data) {
    console.error("Failed to insert transaction:", transaction_error.message);
    return {
      error: [transaction_error.message],
      data: null,
    };
  }

  return {
    error: [],
    data: transaction_data,
  };
}
