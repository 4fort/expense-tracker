import { create } from "zustand";

interface IUseTrackerSelectionStore {
  drawerState: boolean;
  selectedTracker: number | null;
  setDrawerState: (state: boolean) => void;
  setSelectedTracker: (tracker: number | null) => void;
  unselectTracker: () => void;
}

export const useTrackerSelectionStore = create<IUseTrackerSelectionStore>()(
  (set) => ({
    drawerState: false,
    selectedTracker: null,
    setDrawerState: (state) => set({ drawerState: state }),
    setSelectedTracker: (tracker) => set({ selectedTracker: tracker }),
    unselectTracker: () => set({ selectedTracker: null }),
  })
);
