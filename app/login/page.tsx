"use client";

import { login } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [_, formAction, isPending] = useActionState(login, null);

  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" required />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" required />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isPending ? "Logging in" : "Login"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="signup" className="text-foreground underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
