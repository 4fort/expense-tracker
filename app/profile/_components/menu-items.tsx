"use client";

import { Button } from "@/components/ui/button";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Bolt, ChevronRight, CircleHelp, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";

const context = {
  profile_menu: [
    {
      code: "edit_profile",
      title: "Edit Profile",
      icon: "user-round-cog",
      href: "/profile/edit",
    },
    {
      code: "settings",
      title: "Settings",
      icon: "bolt",
      href: "/profile/settings",
    },
    {
      code: "help_support",
      title: "Help & Support",
      icon: "circle-help",
      href: "/profile/help",
    },
    {
      code: "about",
      title: "About",
      icon: "circle-help",
      href: "/profile/about",
    },
  ],
};

export const MenuItems = () => {
  const router = useRouter();

  return (
    <ul>
      {context.profile_menu.map((item) => (
        <li key={item.code}>
          <Button
            type="button"
            variant="menuButton"
            className="text-md py-6 justify-between my-1"
            size="lg"
            onClick={() => router.push(item.href)}
          >
            <div className="flex items-center gap-4">
              <DynamicIcon name={item.icon as IconName} />
              {item.title}
            </div>
            <ChevronRight />
          </Button>
        </li>
      ))}
    </ul>
  );
};
