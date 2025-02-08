"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import React from "react";
import AddTracker from "./_components/add-tracker";
import useTrackerPersist from "@/hooks/useTrackerPersist";
import useAuthPersist from "@/hooks/useAuthPersist";
import Trackers from "./_components/trackers";

export default function TrackersPageComponent() {
  const { user } = useAuthPersist();
  const { trackers, isTrackerEmpty, loading } = useTrackerPersist();

  return (
    <div
      className="p-[inherit] min-h-screen h-[inherit] bg-accent overflow-y-auto"
      vaul-drawer-wrapper=""
    >
      <TitleHeader title="Trackers" className="bg-accent/30 backdrop-blur-md" />
      <Main className="flex flex-col">
        {!isTrackerEmpty && <Trackers trackers={trackers} className="pb-14" />}
        <AddTracker
          isTrackerEmpty={isTrackerEmpty}
          isFreeUser={user?.plan === "free"}
          loading={loading}
        />
      </Main>
    </div>
  );
}
