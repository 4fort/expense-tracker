"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return new NextResponse("", { status: 401 });
  }

  await supabase.auth.signOut();
  return new NextResponse("", { status: 200 });
}
