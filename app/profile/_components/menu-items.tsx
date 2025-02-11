"use client";

import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <ul>
      {context.profile_menu.map((item) => (
        <li key={item.code}>
          <Link
            className="text-md py-6 my-1 inline-flex justify-between items-center font-medium w-full hover:bg-accent hover:text-accent-foreground transition-all h-11 rounded-xl px-8 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            href={item.href}
          >
            <div className="flex items-center gap-4">
              <DynamicIcon name={item.icon as IconName} size={48} />
              {item.title}
            </div>
            <ChevronRight />
          </Link>
        </li>
      ))}
    </ul>
  );
};
