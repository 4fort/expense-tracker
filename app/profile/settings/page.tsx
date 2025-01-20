"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const context = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <AnimatePresence>
      <motion.div
        key="edit-profile"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2, type: "spring", bounce: 0 }}
      >
        <TitleHeader title={context.title} hasBackButton />
        <Main>
          <div>SettingsPage</div>
        </Main>
      </motion.div>
    </AnimatePresence>
  );
}
