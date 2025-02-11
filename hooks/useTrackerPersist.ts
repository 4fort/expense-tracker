"use client";

import { useTrackerStore } from "@/store/useTrackerStore";
import { TTracker } from "@/types/TTracker";
import { useEffect } from "react";

export default function useTrackerPersist() {
  const {
    trackers,
    error,
    loading,
    retrieveTrackerData,
    revalidateTrackerData,
    addOneTracker,
    getOneTracker,
  } = useTrackerStore();

  useEffect(() => {
    if (trackers.length === 0) {
      revalidateTrackerData();
      console.log("Revalidated tracker data");
    }
  }, []);

  const cacheOneTracker = (data: TTracker) => {
    addOneTracker(data);
  };

  return {
    trackers,
    isTrackerEmpty: trackers.length === 0,
    error,
    loading,
    retrieveTrackerData,
    cacheOneTracker,
    getOneTracker,
  };
}
