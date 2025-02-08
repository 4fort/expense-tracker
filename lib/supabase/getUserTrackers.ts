"use server";

import { TTracker } from "@/types/TTracker";
import { TTrackerExtension } from "@/types/TTrackerExtension";
import { TTrackerTransaction } from "@/types/TTrackerTransaction";
import { createClient } from "@/utils/supabase/server";

export default async function getUserTrackers() {
  const supabase = await createClient();

  const { data: user, error: user_error } = await supabase.auth.getUser();

  if (user_error) {
    throw new Error(user_error.message);
  }

  const user_id = user.user.id;

  const { data, error } = await supabase
    .from("trackers")
    .select(
      `
      *,
      tracker_extensions(*),
      tracker_transactions(*)
    `
    )
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  // console.log(data);

  const trackers: TTracker[] = data!.map((tracker: TTracker) => {
    // const amount = tracker.tracker_transactions.reduce(
    //   (sum, transaction) => sum + transaction.amount,
    //   0
    // );

    const amount = tracker.tracker_transactions.reduce((sum, transaction) => {
      if (transaction.type === "expense") return sum - transaction.amount;
      else {
        return sum + transaction.amount;
      }
    }, 0);

    const latest_transaction_data =
      tracker.tracker_transactions[tracker.tracker_transactions.length - 1];
    return {
      id: tracker.id,
      name: tracker.name,
      icon: tracker.icon,
      amount,
      color: tracker.color,
      created_at: tracker.created_at,
      tracker_extensions: tracker.tracker_extensions as TTrackerExtension,
      tracker_transactions:
        tracker.tracker_transactions as TTrackerTransaction[],
      latest_transaction: latest_transaction_data as TTrackerTransaction,
    };
  });

  console.log("Trackers:", trackers, error);

  return { data: trackers, error };
}
