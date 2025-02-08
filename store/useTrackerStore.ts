import getUserTrackers from "@/lib/supabase/getUserTrackers";
import { TTracker } from "@/types/TTracker";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseTrackerStore {
  loading: boolean;
  error: string | string[] | null;
  trackers: TTracker[];
  retrieveTrackerData: () => void;
  revalidateTrackerData: () => void;
  addOneTracker: (data: TTracker) => void;
  getOneTracker: (id: number | null) => TTracker | undefined;
}

export const useTrackerStore = create<IUseTrackerStore>()(
  persist(
    (set, get) => ({
      loading: true,
      error: null,
      trackers: [],
      retrieveTrackerData: async () => {
        set({ loading: true });
        try {
          const { data, error } = await getUserTrackers();

          if (error) {
            set({
              error: `An error occurred while fetching pocket data: ${error}`,
              loading: false,
            });
            return;
          }

          set({
            trackers: data,
            loading: false,
          });
        } catch (error) {
          console.error("[ ERROR ] Fetching pocket data error:", error);
          set({
            error: `An error occurred while fetching pocket data: ${error}`,
            loading: false,
          });
        }
      },
      revalidateTrackerData: () => {
        set({ trackers: [] });
        get().retrieveTrackerData();
      },
      addOneTracker: (data) => {
        set((state) => ({
          trackers: [...state.trackers, data],
        }));
      },
      getOneTracker: (id) => {
        return get().trackers.find((tracker) => tracker.id === id);
      },
    }),
    {
      name: "pocket-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
