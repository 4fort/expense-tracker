import { create } from "zustand";
import { TUserData } from "@/types/TUserData";
import { persist, createJSONStorage } from "zustand/middleware";

type TUserState = TUserData;

interface IUseAuthStore {
  isAuthorized: boolean;
  user: TUserState | null;
  loading: boolean;
  setUser: (user: TUserState) => void;
  removeUser: () => void;
  revalidate: () => void;
}

export const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      isAuthorized: false,
      user: null,
      loading: true, // New state to indicate revalidation is in progress
      setUser: (user) => set({ user, isAuthorized: true, loading: false }),
      removeUser: () =>
        set({ user: null, isAuthorized: false, loading: false }),
      revalidate: async () => {
        set({ loading: true }); // Start revalidation
        try {
          const response = await fetch("/auth/revalidate-user-data", {
            method: "GET",
          });

          if (!response.ok) {
            set({ loading: false }); // Stop loading if revalidation fails
            return;
          }

          const userData = await response.json();
          const data: TUserData = userData.user;

          set({
            user: {
              id: data.id,
              email: data.email,
              first_name: data.first_name,
              middle_name: data.middle_name,
              last_name: data.last_name,
              username: data.username,
            },
            isAuthorized: true,
            loading: false, // Revalidation complete
          });
        } catch (error) {
          console.error("[ ERROR ] Revalidation error:", error);
          set({ loading: false }); // Stop loading if an error occurs
        }
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
