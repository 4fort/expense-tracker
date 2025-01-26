"use client";

import Main from "@/components/main";
import SignOutButton from "@/components/sign-out-button";
import TitleHeader from "@/components/title-header";
import { Separator } from "@/components/ui/separator";
import { TUserData } from "@/types/TUserData";
import React from "react";
import { MenuItems } from "./_components/menu-items";
import Loading from "@/components/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthPersist from "@/hooks/useAuthPersist";
import InstallPrompt from "@/components/install-prompt";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProfilePageComponent() {
  const { user } = useAuthPersist();

  return (
    <div
      className="p-[inherit] min-h-screen h-[inherit] bg-accent overflow-y-auto"
      vaul-drawer-wrapper=""
    >
      {!user && <Loading />}
      <TitleHeader title="Profile" className="bg-accent/30 backdrop-blur-md" />
      <Main className="flex flex-col gap-8">
        {user ? <ProfileSummary user={user} /> : <ProfileSummarySkeleton />}
        <div className="flex flex-col items-center gap-4 w-full bg-card text-card-foreground shadow-sm p-4 rounded-lg">
          <div className="w-full">
            <h5 className="text-sm opacity-50">Profile Menu</h5>
            <MenuItems />
          </div>
          <InstallPrompt />
          <Separator orientation="horizontal" />
          <div className="w-full">
            <SignOutButton className="w-full" />
          </div>
        </div>
      </Main>
    </div>
  );
}

const ProfileSummary = ({ user }: { user: TUserData }) => {
  const fullName = `${user.first_name} ${user.last_name}`;
  const urlEcodedFullName = encodeURIComponent(fullName);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={cn(
          "border-2 rounded-full p-1 h-24 w-24 text-5xl font-bold flex items-center justify-center",
          user.plan === "pro" ? "border-yellow-400 relative" : "border-border"
        )}
      >
        {user.plan === "pro" && (
          <Star
            className="absolute -bottom-1 -right-1 text-yellow-400 stroke-accent h-8 w-8 z-10"
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
      <div className="text-center">
        {user.plan === "pro" && (
          <Badge
            className="text-[.5rem] bg-yellow-400/30 border-yellow-600/30"
            variant="outline"
          >
            PRO
          </Badge>
        )}
        <h1 className="font-bold text-lg">{fullName}</h1>
        <div>
          <p className="text-secondary-foreground text-sm opacity-50">
            @{user.username}
          </p>
          <p className="text-secondary-foreground text-sm opacity-50 leading-none">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProfileSummarySkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="border-2 rounded-full p-1 h-24 w-24 text-5xl font-bold flex items-center justify-center">
        <div className="leading-none">&nbsp;</div>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-lg bg-zinc-300 w-40 rounded-md animate-pulse">
          &nbsp;
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-secondary-foreground text-sm opacity-50 leading-none bg-zinc-300 w-20 rounded-md animate-pulse">
            &nbsp;
          </p>
          <p className="text-secondary-foreground text-sm opacity-50 leading-none bg-zinc-300 w-32 rounded-md animate-pulse">
            &nbsp;
          </p>
        </div>
      </div>
    </div>
  );
};
