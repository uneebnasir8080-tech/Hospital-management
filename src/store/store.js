import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      appointment: "new",
      new: () => set({ appointment: "new" }),
      complete: () => set({ appointment: "complete" }),

      sideBar: false,
      openSideBar: () => set((state) => ({ sideBar: !state.sideBar })),

      msgScreen: false,
      openScreen: () => set((state) => ({ msgScreen: !state.msgScreen })),

      // // set name
      // name: "",
      // setName: (name) => set({ name }),
      user: {
        name: "",
        role: "",
      },

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),

      clearUser: () =>
        set({
          user: { name: "", role: "" },
        }),
    }),
    {
      name: "user-storage", // key in localStorage
    },
  ),
);
