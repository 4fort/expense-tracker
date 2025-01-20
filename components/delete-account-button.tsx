"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const DeleteAccountButton = () => {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    const response = await fetch("/auth/delete-account", {
      method: "POST",
      body: JSON.stringify({
        isSoftDelete: false,
      }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const res = await response.text();
      const errorMessage = encodeURIComponent(res);
      router.push(`/error?message=${errorMessage}`);
    }
  };

  return (
    <Button onClick={handleDeleteAccount} variant="destructive">
      Delete Account
    </Button>
  );
};

export default DeleteAccountButton;
