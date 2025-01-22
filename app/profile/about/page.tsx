"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const context = {
  title: "About",
  special_thanks: [
    {
      name: "DiceBear Avatars API",
      url: "https://www.dicebear.com/",
    },
    {
      name: "shadcn-ui",
      url: "https://ui.shadcn.com/",
    },
  ],
};

export default function HelpPage() {
  return (
    <AnimatePresence>
      <motion.div
        key="about"
        initial={{ x: "100%", overflow: "hidden" }}
        animate={{ x: 0, overflow: "auto" }}
        exit={{ x: "100%", overflow: "hidden" }}
        transition={{ duration: 0.2, type: "spring", bounce: 0 }}
        className="h-[inherit] p-[inherit] bg-accent"
      >
        <TitleHeader
          title={context.title}
          className="bg-accent/30 backdrop-blur-md"
          size="md"
          hasBackButton
        />
        <Main>
          <div>About Fortracker</div>
        </Main>
      </motion.div>
    </AnimatePresence>
  );
}
