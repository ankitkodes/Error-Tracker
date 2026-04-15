import { create } from "zustand";

type error = {
  errorId: number;
  projectId: string;
  ErrorDrawer: boolean;
  setErrorId: (val: number) => void;
  setProjectId: (val: string) => void;
  setErrorDrawer: (val: boolean) => void;
};

export const UseErrorId = create<error>((set) => ({
  errorId: 0,
  projectId: "",
  ErrorDrawer: false,
  setErrorId: (val) => set({ errorId: val }),
  setProjectId: (val) => set({ projectId: val }),
  setErrorDrawer: (val) => set({ ErrorDrawer: val }),
}));
