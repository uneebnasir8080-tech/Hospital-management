import { create } from "zustand";

export const useStore = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  appointment: "new",
  new: () => set({ appointment: "new" }),
  complete: () => set({ appointment: "complete" }),

  sideBar: false,
  openSideBar: () => set((state) => ({ sideBar: !state.sideBar })),

  msgScreen:false,
  openScreen:()=>set((state)=>({msgScreen: !state.msgScreen})),
}));
