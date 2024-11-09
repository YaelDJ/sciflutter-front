"use client"
import { type FC, type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { type UserStore, createUserStore } from '../_store/userStore'
import type { LoggedUser } from '../_interfaces/api'

const UserContext = createContext<StoreApi<UserStore> | null>(null)

interface Props {
  initialValue?: LoggedUser | null;
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ initialValue, children }) => {
  const ref = useRef<StoreApi<UserStore>>()

  if (!ref.current) {
    if (initialValue) ref.current = createUserStore({ user: initialValue })
    else ref.current = createUserStore()
  }

  return (
    <UserContext.Provider value={ref.current}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = <T,>(selector: (store: UserStore) => T,): T => {
  const userStoreContext = useContext(UserContext)

  if (!userStoreContext) throw new Error(`useUserStore must be use within UserStoreProvider`)

  return useStore(userStoreContext, selector)
}
