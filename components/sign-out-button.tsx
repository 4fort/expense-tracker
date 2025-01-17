"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SignOutButton = () => {
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

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;
