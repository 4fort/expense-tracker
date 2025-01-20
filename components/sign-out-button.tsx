"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const SignOutButton = ({ className }: Props) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch("/auth/sign-out", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const errorMessage = encodeURIComponent("Sign out failed");
      router.push(`/error?message=${errorMessage}`);
    }
  };

  return (
    <Button className={cn(className)} onClick={handleSignOut}>
      Log Out
    </Button>
  );
};

export default SignOutButton;
