import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import React from "react";
import Main from "@/components/main";
import { NavBar } from "@/components/nav-bar";
import { TUserData } from "@/types/TUserData";

export default async function HomePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const user = data.user;

  const userData = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", user.id)
    .single<TUserData>();

  const fullName = `${userData.data?.first_name} ${userData.data?.last_name}`;

  return (
    <React.Fragment>
      <header className="flex items-center justify-between h-16 px-4">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500">Hello,</span>{" "}
          <p>{fullName}</p>
        </div>
        <div className="border-2 rounded-full p-2 h-8 w-8 flex items-center justify-center">
          <p>{userData.data?.first_name.charAt(0)}</p>
        </div>
        {/* <SignOutButton /> */}
      </header>
      <Main>
        <h1>Hello World, Home</h1>
      </Main>
      <NavBar />
    </React.Fragment>
  );
}
