"use server";

import { TTrackerTransactionDisplay } from "@/types/TTrackerTransaction";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function getUserTrackerTransactions() {
  const supabase = await createClient();

  const { data: user, error: user_error } = await supabase.auth.getUser();

  if (user_error) {
    throw new Error(user_error.message);
  }

  const user_id = user.user.id;

  const { data, error } = await supabase
    .from("tracker_transactions")
    .select<
      `
        id,
        description,
        amount,
        type,
        created_at,
        trackers (
          user_id,
          name,
          icon,
          color
        )
      `,
      Omit<TTrackerTransactionDisplay, "tracker"> & {
        trackers: {
          name: TTrackerTransactionDisplay["tracker"]["name"];
          icon: TTrackerTransactionDisplay["tracker"]["icon"];
          color: TTrackerTransactionDisplay["tracker"]["color"];
        };
      }
    >(
      `
        id,
        description,
        amount,
        type,
        created_at,
        trackers (
          user_id,
          name,
          icon,
          color
        )
      `
    )
    .eq("trackers.user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[ ERROR ] Fetching tracker transactions error:", error);
  }

  console.log(data);

  const transactions: TTrackerTransactionDisplay[] = data!.map(
    (transaction) => ({
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      created_at: transaction.created_at,
      tracker: {
        name: transaction.trackers.name,
        icon: transaction.trackers.icon,
        color: transaction.trackers.color,
      },
    })
  );

  revalidatePath("/expense");

  return { data: transactions, error };
}
