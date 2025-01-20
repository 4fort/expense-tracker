"use server";

import { TUserData } from "@/types/TUserData";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function useUserData(): Promise<{ user: TUserData }> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const user_auth = data.user;

  const user_data = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user_auth.id)
    .single<TUserData>();

  if (user_data.error) {
    console.error(user_data.error);

    const user: TUserData = {
      id: Math.random(),
      email: user_auth.email,
      first_name: "",
      middle_name: "",
      last_name: "",
      username: "",
    };

    return { user };
  }

  const user: TUserData = {
    email: user_auth.email,
    ...user_data.data,
  };

  return {
    user,
  };
}
