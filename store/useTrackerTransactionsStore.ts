import getUserTrackerTransactions from "@/lib/supabase/getUserTrackerTransactions";
import { TTrackerTransactionDisplay } from "@/types/TTrackerTransaction";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseTrackerTransactionsStore {
  loading: boolean;
  error: string | string[] | null;
  transactions: TTrackerTransactionDisplay[];
  retrieveTransactions: () => void;
  revalidateTransactions: () => void;
  filterTransactions: (query: string) => void;
}

export const useTrackerTransactionsStore =
  create<IUseTrackerTransactionsStore>()(
    persist(
      (set, get) => ({
        loading: true,
        error: null,
        transactions: [],
        retrieveTransactions: async () => {
          set({ loading: true });
          try {
            const { data, error } = await getUserTrackerTransactions();

            if (error) {
              set({
                error: `An error occurred while fetching pocket data: ${error}`,
                loading: false,
              });
              return;
            }

            set({
              transactions: data,
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
        revalidateTransactions: () => {
          set({ transactions: [] });
          get().retrieveTransactions();
        },
        filterTransactions: (query) => {
          set({
            transactions: get().transactions.filter((transaction) =>
              transaction.description
                .toLowerCase()
                .includes(query.toLowerCase())
            ),
          });
        },
      }),
      {
        name: "pocket-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
