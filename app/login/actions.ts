"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { TUserData } from "@/types/TUserData";

export async function login(
  currentState: TUserData | null,
  formData: FormData
) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: user_auth, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    return null;
  }

  const user_data = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user_auth.user?.id)
    .single<TUserData>();

  if (user_data.error || (!user_data.data && user_auth.user)) {
    console.error(user_data.error);

    const user: TUserData = {
      id: Math.random(),
      email: user_auth.user.email,
      first_name: "",
      middle_name: "",
      last_name: "",
      username: "",
    };

    return user;
  }

  revalidatePath("/", "layout");
  const user: TUserData = {
    email: user_auth.user.email,
    ...user_data.data,
  };

  return user;
}
