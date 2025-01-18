"use client";

import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import BrandLogo from "@/components/brand-logo";
import LabelInput from "@/components/label-input";

export default function LoginPage() {
  const [, formAction, isPending] = useActionState(login, null);

  return (
    <main className="h-screen p-4 pb-20 flex flex-col gap-24">
      <header className="text-4xl text-center mt-10">
        <BrandLogo />
      </header>
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
    </main>
  );
}
