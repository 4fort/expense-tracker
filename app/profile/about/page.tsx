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
  ],
};

export default function HelpPage() {
  return (
    <AnimatePresence>
      <motion.div
        key="edit-profile"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2, type: "spring", bounce: 0 }}
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
