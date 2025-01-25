"use server";

import { createClient } from "@/utils/supabase/server";
import { ITrackerData } from "./_types/ITrackerData";
import { TTrackerColors } from "./_types/TTrackerColors";
import { IconName } from "lucide-react/dynamic";
import { TTrackerExtend, TTrackerExtension } from "@/types/TTrackerExtend";
import { revalidatePath } from "next/cache";
import { TTracker } from "@/types/TTracker";
import { TTrackerTransaction } from "@/types/TTrackerTransaction";

interface DBEntryTracker {
  user_id: string;
  name: string;
  color: TTrackerColors;
  icon: IconName;
}

interface DBEntryTrackerTransaction {
  tracker_id: number;
  amount: number;
  description: string;
  type: "initial" | "income" | "expense";
}

interface DBEntryExtendedTracker {
  tracker_id: number;
  goal_amount: number | null;
  start_date: Date | null;
  due_date: Date;
}

export async function addTracker(
  currentState: {
    error: string[];
    data: TTrackerExtend | ITrackerData | null;
  },
  formData: FormData
): Promise<{ error: string[]; data: TTrackerExtend | ITrackerData | null }> {
  const supabase = await createClient();

  const { data: user_data, error: user_error } = await supabase.auth.getUser();

  if (user_error) {
    console.error("Failed to get user data:", user_error.message);
    return {
      error: [user_error.message],
      data: currentState.data as ITrackerData,
    };
  }

  const user_id = user_data?.user.id;

  const tracker: DBEntryTracker = {
    user_id: user_id as string,
    name: formData.get("name") as string,
    color: formData.get("color") as TTrackerColors,
    icon: formData.get("icon") as IconName,
  };

  const { data: tracker_data, error: tracker_error } = await supabase
    .from("trackers")
    .insert(tracker)
    .select()
    .single<TTracker>();

  if (tracker_error && !tracker_data) {
    console.error("Failed to insert tracker:", tracker_error.message);
    return {
      error: [tracker_error.message],
      data: null,
    };
  }

  const tracker_id = tracker_data.id;

  const transaction: DBEntryTrackerTransaction = {
    tracker_id,
    amount: parseFloat(formData.get("amount") as string),
    description: "Initial amount",
    type: "initial",
  };

  const { data: tracker_transaction_data, error: transaction_error } =
    await supabase
      .from("tracker_transactions")
      .insert(transaction)
      .select()
      .single<DBEntryTrackerTransaction>();

  if (transaction_error && !tracker_transaction_data) {
    console.error(
      "Failed to insert tracker transaction:",
      transaction_error.message
    );
    return {
      error: [transaction_error.message],
      data: null,
    };
  }

  const { data: latest_transaction_data } = await supabase
    .from("tracker_transactions")
    .select("amount, created_at")
    .order("created_at", { ascending: false })
    .single();

  if (!formData.get("due_date")) {
    const data: TTracker = {
      id: tracker_data.id,
      name: tracker_data.name,
      amount: tracker_transaction_data.amount,
      icon: tracker_data.icon,
      color: tracker_data.color,
      created_at: tracker_data.created_at,
      tracker_extensions: null,
      tracker_transactions: tracker_data.tracker_transactions,
      latest_transaction: latest_transaction_data as TTrackerTransaction,
    };
    return {
      error: [],
      data,
    };
  }

  const tracker_extension: DBEntryExtendedTracker = {
    tracker_id: tracker_data.id,
    goal_amount: parseFloat(formData.get("goal_amount") as string),
    start_date: new Date(formData.get("start_date") as string),
    due_date: new Date(formData.get("due_date") as string),
  };

  const { data: tracker_extension_data, error: tracker_extension_error } =
    await supabase
      .from("tracker_extensions")
      .insert(tracker_extension)
      .select()
      .single<TTrackerExtension>();

  if (tracker_error || tracker_extension_error) {
    let errors: string[] = [];
    if (tracker_extension_error) {
      console.error(
        "Failed to insert tracker extension:",
        tracker_extension_error.message
      );
      errors = [...errors, tracker_extension_error.message];
    }
    return {
      error: errors,
      data: null,
    };
  }

  revalidatePath("/pocket");

  return {
    error: [],
    data: {
      ...tracker_data,
      amount: tracker_transaction_data.amount,
      tracker_extensions: tracker_extension_data,
      tracker_transactions: tracker_data.tracker_transactions,
      latest_transaction: latest_transaction_data as TTrackerTransaction,
    },
  };
}
