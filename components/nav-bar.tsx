"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import QuickAddTransaction from "../app/transactions/_components/quick-add-transaction";

const navLinks = [
  {
    icon: "home",
    text: "Home",
    href: "/",
    type: "link",
  },
  {
    icon: "table-properties",
    text: "Transactions",
    href: "/transactions",
    type: "link",
  },
  {
    icon: "plus",
    text: "Quick Add",
    href: "#",
    type: "button",
  },
  {
    icon: "wallet-cards",
    text: "Trackers",
    href: "/trackers",
    type: "link",
  },
  {
    icon: "user-2",
    text: "Profile",
    href: "/profile",
    type: "link",
  },
];

const excludedPaths = ["/login", "/signup", "/forgot-password"];
const includedPaths = Array.from(new Set(navLinks.map(({ href }) => href)));

export const NavBar = () => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("contextmenu", disableContextMenu);

    return () => {
      window.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  useEffect(() => {
    setIsInitial(false);

    if (!includedPaths.includes(pathname)) {
      return setIsHidden(true);
    }
    return setIsHidden(false);
  }, [pathname]);

  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.nav
        key="nav-bar"
        initial={{ y: 100 }}
        animate={{
          y: isHidden ? 100 : 0,
        }}
        className="w-11/12 mx-auto bg-muted-foreground/10 backdrop-blur-md fixed bottom-1 left-0 right-0 p-2 mb-4 rounded-full translate-y-full"
        transition={{
          delay: isInitial ? 0.5 : 0,
          duration: 0.5,
          type: "spring",
          bounce: 0,
        }}
        suppressHydrationWarning
      >
        <NavLinks />
      </motion.nav>
    </AnimatePresence>
  );
};

const NavLinks = () => {
  const [geometry, setGeometry] = useState({
    left: 0,
    width: 0,
  });

  return (
    <ul className="flex justify-around text-zinc-500 relative">
      <motion.li
        layoutId="nav-underline"
        animate={{ ...geometry }}
        className="absolute h-full w-32 rounded-full bg-primary-foreground -z-10"
      />
      {navLinks.map(({ icon, text, href, type }, i) => (
        <NavSingleLink
          key={i}
          icon={icon}
          text={text}
          href={href}
          type={type}
          setGeometry={setGeometry}
        />
      ))}
    </ul>
  );
};

const NavSingleLink = ({
  icon,
  text,
  href,
  type,
  setGeometry,
}: (typeof navLinks)[0] & {
  setGeometry: React.Dispatch<
    React.SetStateAction<{ left: number; width: number }>
  >;
}) => {
  const pathname = usePathname();
  const element = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (pathname.startsWith(href) && element.current) {
      const { width } = element.current.getBoundingClientRect();

      return setGeometry({
        left: element.current.offsetLeft,
        width,
      });
    }
  }, [pathname]);

  if (type === "button") {
    return <QuickAddTransaction />;
  }

  const isActive = pathname === href;

  return (
    <motion.li
      ref={element}
      className="flex flex-col items-center justify-center flex-grow py-1 active:scale-90 transition-all origin-center max-w-[calc(100%/5)]"
    >
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center justify-center",
          isActive ? "text-zinc-900" : ""
        )}
      >
        <DynamicIcon
          name={icon as IconName}
          className={cn(isActive && "text-foreground")}
        />
        <span className={cn("text-[0.6rem]", isActive && "text-foreground")}>
          {text}
        </span>
      </Link>
    </motion.li>
  );
};
