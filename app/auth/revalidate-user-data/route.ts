"use server";

import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { TUserData } from "@/types/TUserData";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return new NextResponse(error?.message, { status: 401 });
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
      plan: "free",
    };

    return NextResponse.json({ user }, { status: 200 });
  }

  const user: TUserData = {
    email: user_auth.email,
    ...user_data.data,
  };

  return NextResponse.json({ user }, { status: 200 });
}
