import { create } from "zustand";
import { TUserData } from "@/types/TUserData";
import { persist, createJSONStorage } from "zustand/middleware";

type TUserState = TUserData;

interface IUseAuthStore {
  isAuthorized: boolean;
  user: TUserState | null;
  setUser: (user: TUserState) => void;
  removeUser: () => void;
  revalidate: () => void;
}

export const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      isAuthorized: false,
      user: null,
      setUser: (user) => set({ user, isAuthorized: true }),
      removeUser: () => set({ user: null, isAuthorized: false }),
      revalidate: async () => {
        try {
          const response = await fetch("/auth/revalidate-user-data", {
            method: "GET",
          });

          if (!response.ok) {
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
          }); // Update user state
        } catch (error) {
          console.error("[ ERROR ] Revalidation error:", error);
        }
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
