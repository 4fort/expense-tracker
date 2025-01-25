"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import React from "react";
import useTrackerPersist from "@/hooks/useTrackerPersist";
// import useAuthPersist from "@/hooks/useAuthPersist";

export default function ExpensePage() {
  // const { user } = useAuthPersist();
  const { trackers } = useTrackerPersist();

  console.log(trackers);

  return (
    <div
      className="p-[inherit] h-[inherit] bg-accent overflow-y-auto"
      vaul-drawer-wrapper=""
    >
      <TitleHeader title="Expense" className="bg-accent/30 backdrop-blur-md" />
      <Main className="flex flex-col">
        <h1>hello world expenses</h1>
      </Main>
    </div>
  );
}
