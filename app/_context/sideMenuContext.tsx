"use client"
import { type ReactNode, type FC, createContext, useRef, useContext } from "react";
import { useStore, type StoreApi } from "zustand";
import { type SideMenuStore, createSideMenuStore } from "../_store/sideMenuStore";

const SideMenuContext = createContext<StoreApi<SideMenuStore> | null>(null)

interface Props {
  children: ReactNode
}

export const SideMenuProvider: FC<Props> = ({ children }) => {
  const ref = useRef<StoreApi<SideMenuStore>>()

  if (!ref.current) {
    ref.current = createSideMenuStore()
  }

  return (
    <SideMenuContext.Provider value={ref.current}>
      {children}
    </SideMenuContext.Provider>
  )
}

export const useSideMenuContext = <T,>(selector: (store: SideMenuStore) => T,): T => {
  const context = useContext(SideMenuContext)

  if (!context) throw new Error("useSideMenuStore must be use within SideMenuStoreProvider")

  return useStore(context, selector)
}
