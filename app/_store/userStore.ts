import { createStore } from "zustand"
import type { LoggedUser } from "../_interfaces/api";

export type UserState = {
  user: LoggedUser | null;
};

export type UserActions = {
  clearUser: () => void,
  updateUser: (newData: LoggedUser) => void
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
};

export const createUserStore = (
  initState: UserState = defaultInitState
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    clearUser: () => set(() => ({user: null})),
    updateUser: (newData: LoggedUser) => set(() => ({ user: { ...newData } })),
  }));
};
