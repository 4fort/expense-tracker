import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/sign-out-button";
import InstallPrompt from "@/components/install-prompt";

export default async function HomePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <InstallPrompt />
      <p>Hello {data.user.email}</p>
      <SignOutButton />
    </div>
  );
}
