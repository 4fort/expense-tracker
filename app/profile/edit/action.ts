"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export const verifyPassword = async (password: string): Promise<boolean> => {
  const supabase = await createClient();

  const { data: current_data } = await supabase.auth.getUser();

  if (!current_data.user || !current_data.user.email) {
    return false;
  }

  const user_email = current_data.user.email;

  const { error: sign_in_error } = await supabase.auth.signInWithPassword({
    email: user_email,
    password,
  });

  if (sign_in_error) {
    return false;
  }

  return true;
};

export async function changePassword(
  currentState: { error: AuthError } | null,
  formData: FormData
) {
  const supabase = await createClient();

  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error };
  }

  return null;
}
