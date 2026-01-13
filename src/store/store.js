import { create } from "zustand";


export const useStore= create((set)=>({
    isOpen: false,
    open:()=>set({ isOpen: true }),
    close:()=> set({isOpen: false})
}))