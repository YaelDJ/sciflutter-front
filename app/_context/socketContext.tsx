"use client"
import { type FC, createContext, useRef, useContext } from "react";
import { useStore, type StoreApi } from "zustand";
import { createSocketStore, type SocketStore } from "../_store/socketStore";
import type { BaseComponent } from "../_interfaces/components";
import { Socket } from "socket.io-client";

const SocketContext = createContext<StoreApi<SocketStore> | null>(null)

interface Props {
  initialState?: {
    socket: Socket | null
  }
}

export const SocketProvider: FC<BaseComponent & Props> = ({children, initialState}) => {
  const ref = useRef<StoreApi<SocketStore>>()

  if (!ref.current) {
    ref.current = createSocketStore()
  }

  return (
    <SocketContext.Provider value={ref.current}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = <T,>(selector: (store: SocketStore) => T,): T => {
  const context = useContext(SocketContext)
  if (!context) throw new Error('useSocketContext must be call with SocketProvider')

  return useStore(context, selector)
}
