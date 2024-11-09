"use client"
import { StoreApi, useStore } from "zustand";
import { AlertStore, createAlertStore } from "../_store/alertStore";
import { FC, createContext, useContext, useRef } from "react";
import { BaseComponent } from "../_interfaces/components";

const AlertContext = createContext<StoreApi<AlertStore> | null>(null)

export const AlertProvider: FC<BaseComponent> = ({children}) => {
  const ref = useRef<StoreApi<AlertStore>>()

  if (!ref.current) {
    ref.current = createAlertStore()
  }

  return (
    <AlertContext.Provider value={ref.current}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertContext = <T,>(selector: (store: AlertStore) => T,): T => {
  const context = useContext(AlertContext)

  if (!context) throw new Error('useAlertContext must be used within AlertProvider')

  return useStore(context, selector)
}
