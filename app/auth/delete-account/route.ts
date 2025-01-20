"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const res = await request.json();

  console.log(res);

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const { data, error } = await supabase.auth.admin.deleteUser(
    user.data.user.id,
    res.isSoftDelete
  );

  console.log(data, error);

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  return redirect("/login");
}
