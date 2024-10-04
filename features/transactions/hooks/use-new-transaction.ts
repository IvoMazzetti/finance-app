import { create } from "zustand";

type NewTransactiontState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNewTransaction = create<NewTransactiontState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));