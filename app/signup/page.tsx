"use client";

import { signup } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [_, formAction, isPending] = useActionState(signup, null);

  return (
    <div>
      <h1>Signup</h1>
      <form action={formAction}>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" required />
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" required />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {isPending ? "Logging in" : "Login"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="login" className="text-foreground underline">
          Login
        </Link>
      </p>
    </div>
  );
}
