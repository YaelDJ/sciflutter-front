import { createStore } from "zustand";

export interface SavesState {
  saves: string[]
}

export interface SavesActions {
  removeSave: (save: string) => void;
  addSave: (save: string) => void
}

export type SavesStore = SavesState & SavesActions

const defaultState: SavesState = {
  saves: []
}

export const createSavesStore = (initialState: SavesState = defaultState) => 
  createStore<SavesStore>()((set, get) => ({
    ...initialState,
    addSave: (save: string) => {
      const { saves } = get()
      saves.push(save)

      set(() => ({ saves }))
    },
    removeSave(save: string) {
      set(state => ({saves: state.saves.filter(currentSave => currentSave !== save)}))
    },
  }))
