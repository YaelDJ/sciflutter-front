import { createStore } from "zustand";

interface Alert{
  type: string;
  message: string;
}

export interface AlertState {
  displayAlert: boolean;
  alert: Alert;
}

export interface AlertActions {
  hiddeAlert: () => void;
  setAlert: (type: string, message: string) => void;
}

export type AlertStore = AlertState & AlertActions

export const defaultInitState: AlertState = {
  displayAlert: false,
  alert: { message: '', type: '' }
};

export const createAlertStore = (initialState: AlertState = defaultInitState) => 
  createStore<AlertStore>()((set, get) => ({
    ...initialState,
    hiddeAlert: () => {
      set(() => ({ alert: { type: "", message: "" } }));
    },
    setAlert: (type: string, message: string) => {
      const { hiddeAlert } = get()
      let timeOut;
      if (timeOut) clearTimeout(timeOut)
      
      set(() => ({ alert: { type, message }, displayAlert: true }));
      
      timeOut = setTimeout(hiddeAlert, 2000);
    },
  }))