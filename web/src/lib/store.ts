import { create } from "zustand";

type error = {
  errorId: number;
  ErrorDrawer: boolean;
  setErrorId: (val: number) => void;
  setErrorDrawer: (val: boolean) => void;
};

export const UseErrorId = create<error>((set) => ({
  errorId: 0,
  ErrorDrawer: false,
  setErrorId: (val) => set({ errorId: val }),
  setErrorDrawer: (val) => set({ ErrorDrawer: val }),
}));
