"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const context = {
  title: "Help & Support",
};

export default function HelpPage() {
  return (
    <AnimatePresence>
      <motion.div
        key="help"
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
          <div>Help</div>
        </Main>
      </motion.div>
    </AnimatePresence>
  );
}
