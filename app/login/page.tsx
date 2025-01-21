"use client";

import { login } from "./actions";
import { Button } from "@/components/ui/button";
import React, { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import BrandLogo from "@/components/brand-logo";
import LabelInput from "@/components/label-input";
import Main from "@/components/main";
import { TUserData } from "@/types/TUserData";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [state, formAction, isPending] = useActionState<
    TUserData | null,
    FormData
  >(login, null);

  useEffect(() => {
    if (state) {
      const data: TUserData = {
        id: state.id,
        first_name: state.first_name,
        middle_name: state.middle_name,
        last_name: state.last_name,
        email: state.email,
        username: state.username,
      };
      setUser(data);
      return router.push("/");
    } else {
      return router.push("/error");
    }
  }, [state, isPending]);

  return (
    <React.Fragment>
      <Main className="flex flex-col flex-grow gap-24">
        <div className="text-4xl text-center mt-10">
          <BrandLogo />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="mb-4 font-bold">Log in</h1>
          <form
            action={formAction}
            className="w-full h-full max-w-sm flex flex-col justify-between"
          >
            <div className="flex flex-col gap-4">
              <LabelInput
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
              <LabelInput
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="signup" className="text-foreground underline">
                  Sign Up
                </Link>
              </p>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending && <Loader2 className="animate-spin" />}
                {isPending ? "Logging in" : "Log in"}
              </Button>
            </div>
          </form>
        </div>
      </Main>
    </React.Fragment>
  );
}
