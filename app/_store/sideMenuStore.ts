import { createStore } from "zustand";

export interface SideMenuState {
  menuOpen: boolean;
}

export interface SideMenuActions {
  toogleMenuOpen: () => void;
}

export type SideMenuStore = SideMenuState & SideMenuActions

const defaultInitState = {
  menuOpen: false
}

export const createSideMenuStore = (initialValue: SideMenuState = defaultInitState) =>
  createStore<SideMenuStore>()((set) =>
    ({
      ...initialValue,
      toogleMenuOpen: () => set((state)=>({menuOpen: !state.menuOpen}))
    }))