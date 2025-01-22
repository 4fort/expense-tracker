import getUserTrackers from "@/lib/supabase/getUserTrackers";
import { TTrackerExtend } from "@/types/TTrackerExtend";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseTrackerStore {
  loading: boolean;
  error: string | string[] | null;
  trackers: TTrackerExtend[];
  retrievePocketData: () => void;
}

export const usePocketStore = create<IUseTrackerStore>()(
  persist(
    (set) => ({
      loading: true,
      error: null,
      trackers: [],
      retrievePocketData: async () => {
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
    }),
    {
      name: "pocket-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
