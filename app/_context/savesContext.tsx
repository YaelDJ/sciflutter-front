"use client"
import { FC, createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";
import { SavesStore, createSavesStore } from "../_store/savesStore";
import { BaseComponent } from "../_interfaces/components";

const SavesContext = createContext<StoreApi<SavesStore> | null>(null)

interface Props extends BaseComponent {
  defaultValues: string[];
}

export const SavesProvider: FC<Props> = ({ defaultValues, children }) => {
  const ref = useRef<StoreApi<SavesStore>>()

  if (!ref.current) ref.current = createSavesStore({ saves: defaultValues })

  return (
    <SavesContext.Provider value={ref.current}>
      {children}
    </SavesContext.Provider>
  )
}

export const useSavesContext = <T,>(selector: (store: SavesStore) => T,): T => {
  const context = useContext(SavesContext)

  if (!context) throw new Error('Error getting saved context')

  return useStore(context, selector)
}
