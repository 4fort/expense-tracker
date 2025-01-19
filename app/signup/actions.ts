"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(currentState: void | null, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const final_data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
    first_name: formData.get("first_name") as string,
    middle_name: formData.get("middle_name") as string,
    last_name: formData.get("last_name") as string,
  };

  const { error, data } = await supabase.auth.signUp({
    email: final_data.email,
    password: final_data.password,
  });

  if (error) {
    redirect("/error");
  }

  console.log(data, error);

  const personal_data = {
    first_name: final_data.first_name,
    middle_name: final_data.middle_name,
    last_name: final_data.last_name,
    username: final_data.username,
  };

  console.log(personal_data, data.user?.id);

  const { error: personalError } = await supabase
    .from("users")
    .update(personal_data)
    .eq("auth_id", data.user?.id);

  console.log(personalError);

  if (personalError) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
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
