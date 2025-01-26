"use client";

import React from "react";
import Main from "@/components/main";
import { TUserData } from "@/types/TUserData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthPersist from "@/hooks/useAuthPersist";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function HomePageComponent() {
  const { user } = useAuthPersist();

  return (
    <div
      className="p-[inherit] min-h-screen h-[inherit] bg-accent overflow-y-auto"
      vaul-drawer-wrapper=""
    >
      {user ? <Header user={user} /> : <HeaderSkeleton />}
      <Main vaul-drawer-wrapper="">
        <h1>Hello World, Home</h1>
      </Main>
    </div>
  );
}

const Header = ({ user }: { user: TUserData }) => {
  const fullName = `${user.first_name} ${user.last_name}`;
  const urlEcodedFullName = encodeURIComponent(fullName);

  return (
    <header className="flex items-center justify-between h-16 px-4">
      <div className="flex flex-col">
        <span className="text-xs text-zinc-500">Hello,</span> <p>{fullName}</p>
      </div>
      <div
        className={cn(
          "border rounded-full h-9 w-9 p-0.5 flex items-center justify-center",
          user.plan === "pro" ? "border-yellow-400 relative" : "border-border"
        )}
      >
        {user.plan === "pro" && (
          <Star
            className="absolute -bottom-1 -right-1 text-yellow-400 stroke-accent h-4 w-4 z-10"
            fill="currentColor"
          />
        )}
        <Avatar className="w-full h-full">
          <AvatarImage
            src={`https://api.dicebear.com/9.x/shapes/svg?seed=${urlEcodedFullName}`}
          />
          <AvatarFallback>
            <p>{user.first_name.charAt(0)}</p>
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

const HeaderSkeleton = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4">
      <div className="flex flex-col">
        <span className="text-xs bg-zinc-300 w-12 rounded-md animate-pulse">
          &nbsp;
        </span>{" "}
        <p className="bg-zinc-300 w-40 rounded-md animate-pulse">&nbsp;</p>
      </div>
      <div className="border-2 rounded-full p-2 h-8 w-8 flex items-center justify-center">
        <p>&nbsp;</p>
      </div>
    </header>
  );
};
