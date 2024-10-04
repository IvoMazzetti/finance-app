import { create } from "zustand";

type NewCategorytState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNewCategory = create<NewCategorytState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));