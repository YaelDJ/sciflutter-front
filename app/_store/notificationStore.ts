import { createStore } from "zustand";
import { Notification } from "../_interfaces/api";
import { clearNotifications, getMyNotifications, readNotifications } from "../_actions/notificationsActions";

export interface NotificationState {
  notifications: Notification[],
  newNotifications: boolean
}

export interface NotificationActions {
  getNotifications: () => Promise<void>;
  readNotifications: () => Promise<void>;
  clearNotifications: () => Promise<void>;
  setNewNotifications: (newValor: boolean) => void;
}

export type NotificationStore = NotificationState & NotificationActions

export const defaultInitState: NotificationState = {
  notifications: [],
  newNotifications: false,
};

export const createNotificationStore = (initState: NotificationState = defaultInitState) => {
  return createStore<NotificationStore>()((set, get) => ({
    ...initState,
    getNotifications: async () => {
      const newNotifications = await getMyNotifications()

      const noReadNotifications = newNotifications.filter(notification => !notification.read).length > 0

      set(() => ({
        notifications: newNotifications,
        newNotifications: noReadNotifications
      }));
    },
    readNotifications: async () => {
      const { newNotifications } = get()

      if (!newNotifications) return

      await readNotifications()
    },
    clearNotifications: async () => {
      const success = await clearNotifications()

      if (!success) return

      set(() => ({ notifications: [] }))
    },
    setNewNotifications: (newValor: boolean) => set(() => ({ newNotifications: newValor }))
  }))
}
