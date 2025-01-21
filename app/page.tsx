"use client";

import React, { useEffect } from "react";
import Main from "@/components/main";
import { NavBar } from "@/components/nav-bar";
import { TUserData } from "@/types/TUserData";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
  const { user, revalidate, isAuthorized } = useAuthStore();

  useEffect(() => {
    if (!user && isAuthorized) {
      revalidate();
    }
  }, [user]);

  return (
    <React.Fragment>
      {user ? <Header user={user} /> : <HeaderSkeleton />}
      <Main>
        <h1>Hello World, Home</h1>
      </Main>
      <NavBar />
    </React.Fragment>
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
      <div className="border-2 rounded-full h-9 w-9 flex items-center justify-center">
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
