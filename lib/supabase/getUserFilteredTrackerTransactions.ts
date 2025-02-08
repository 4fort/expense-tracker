"use server";

import { TTrackerTransactionDisplay } from "@/types/TTrackerTransaction";
import { createClient } from "@/utils/supabase/server";

export default async function getUserTrackerFilteredTransactions() {
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
    .ilike("description", "%food%")
    .ilike("description", "%grocery%");
}
