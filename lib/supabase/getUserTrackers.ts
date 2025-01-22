"use server";

import { TTrackerExtend } from "@/types/TTrackerExtend";
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
      extended_tracker(*)
    `
    )
    .eq("user_id", user_id);

  const trackers = data as TTrackerExtend[];

  return { data: trackers, error };
}
