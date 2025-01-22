"use client";

import { usePocketStore } from "@/store/useTrackerStore";
import { useEffect } from "react";

export default function usePocketPersist() {
  const { trackers, error, loading, retrievePocketData } = usePocketStore();

  useEffect(() => {
    retrievePocketData();
  }, []);

  return {
    trackers,
    isTrackerEmpty: trackers.length === 0,
    error,
    loading,
    retrievePocketData,
  };
}
