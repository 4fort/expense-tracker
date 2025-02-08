import { create } from "zustand";
import { ITransactionData } from "../_types/ITransactionData";
import { TAddTransactionErrorMessages } from "../_types/TAddTransactionErrorMessages";

interface IAddTransactionStore {
  transactionData: ITransactionData;
  setTransactionData: (transactionData: ITransactionData) => void;
  setAmount: (amount: ITransactionData["amount"]) => void;
  setDescription: (description: ITransactionData["description"]) => void;
  setType: (type: ITransactionData["type"]) => void;
  resetTransactionData: () => void;
  errorMessages: TAddTransactionErrorMessages;
  setErrorMessages: (errorMessages: TAddTransactionErrorMessages) => void;
  setAmountError: (amountError: TAddTransactionErrorMessages["amount"]) => void;
  setDescriptionError: (
    descriptionError: TAddTransactionErrorMessages["description"]
  ) => void;
  setTypeError: (typeError: TAddTransactionErrorMessages["type"]) => void;
  resetErrorMessages: () => void;
}

export const useAddTransactionStore = create<IAddTransactionStore>()((set) => ({
  transactionData: {
    amount: "",
    description: "",
    type: undefined,
  },
  setTransactionData: (transactionData) => set({ transactionData }),
  errorMessages: {
    amount: "",
    description: "",
    type: "",
  },
  setAmount: (amount) =>
    set((state) => ({
      transactionData: { ...state.transactionData, amount },
    })),
  setDescription: (description) =>
    set((state) => ({
      transactionData: { ...state.transactionData, description },
    })),
  setType: (type) =>
    set((state) => ({ transactionData: { ...state.transactionData, type } })),
  resetTransactionData: () =>
    set({ transactionData: { amount: "", description: "", type: undefined } }),
  setErrorMessages: (errorMessages) => set({ errorMessages }),
  setAmountError: (amountError) =>
    set((state) => ({
      errorMessages: { ...state.errorMessages, amount: amountError },
    })),
  setDescriptionError: (descriptionError) =>
    set((state) => ({
      errorMessages: { ...state.errorMessages, description: descriptionError },
    })),
  setTypeError: (typeError) =>
    set((state) => ({
      errorMessages: { ...state.errorMessages, type: typeError },
    })),
  resetErrorMessages: () =>
    set({ errorMessages: { amount: "", description: "", type: "" } }),
}));
