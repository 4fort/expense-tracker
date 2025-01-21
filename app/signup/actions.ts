"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { TUserData } from "@/types/TUserData";

export async function signup(
  currentState: TUserData | null,
  formData: FormData
): Promise<TUserData | null> {
  const supabase = await createClient();

  // Extract form data with type-casting (ensure these fields exist in the form)
  const final_data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
    first_name: formData.get("first_name") as string,
    middle_name: formData.get("middle_name") as string,
    last_name: formData.get("last_name") as string,
  };

  // Sign up the user with Supabase Auth
  const { error: authError, data: user_auth } = await supabase.auth.signUp({
    email: final_data.email,
    password: final_data.password,
  });

  // Handle errors or null user
  if (authError || !user_auth?.user) {
    console.error("Signup failed:", authError?.message);
    return null;
  }

  const authId = user_auth.user.id; // Auth user ID
  const personal_data = {
    first_name: final_data.first_name,
    middle_name: final_data.middle_name,
    last_name: final_data.last_name,
    username: final_data.username,
  };

  // Update user data in the "users" table
  const { error: personalError, data: updatedUser } = await supabase
    .from("users")
    .update(personal_data)
    .eq("auth_id", authId)
    .select("*")
    .single(); // Use `select("*")` and `single()` to fetch the updated row

  const userId = updatedUser?.id;

  if (personalError || !updatedUser) {
    console.error("Failed to update personal data:", personalError?.message);
    return {
      id: userId,
      email: user_auth.user.email,
      first_name: "",
      middle_name: "",
      last_name: "",
      username: "",
    };
  }

  // Revalidate any necessary paths
  revalidatePath("/");

  // Construct and return the final user object
  const user: TUserData = {
    id: userId,
    email: user_auth.user.email,
    first_name: updatedUser.first_name,
    middle_name: updatedUser.middle_name,
    last_name: updatedUser.last_name,
    username: updatedUser.username,
  };

  return user;
}

export async function validateEmail(
  email: string
): Promise<{ ok: boolean; message: string }> {
  if (!email) {
    return { ok: false, message: "Email is required" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("check_email_exists", {
    email_to_check: email,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: !data,
    message: data ? "Email is already taken" : "",
  };
}
