"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthPersist() {
  const { user, revalidate, isAuthorized, removeUser, loading } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      revalidate();
      console.log("Waiting for revalidation to finish");
      // Wait for revalidation to finish
      return;
    }

    if (!user && isAuthorized) {
      console.log("User is not loaded but is authorized, revalidating");
      revalidate();
    } else if (!user && !isAuthorized) {
      console.log("User is not loaded and is not authorized");
      const handleSignOut = async () => {
        const response = await fetch("/auth/sign-out", {
          method: "POST",
        });

        removeUser();

        if (response.ok) {
          router.push("/login");
        } else {
          const errorMessage = encodeURIComponent("Sign out failed");
          router.push(`/error?message=${errorMessage}`);
        }
      };
      handleSignOut();
    }
  }, [user, isAuthorized, loading, revalidate, removeUser, router]);

  return { user, isAuthorized, loading };
}
