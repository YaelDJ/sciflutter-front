import { io, type Socket } from "socket.io-client"
import { createStore } from "zustand"
import { getToken } from "../_actions/userActions"
import { checkCookieExist } from "../_actions/authActions"

export interface SocketState {
  socket: Socket | null,
}

export interface SocketActions {
  sendNotification: (uid: string) => void,
  initSocket: () => Promise<void>
}

export type SocketStore = SocketState & SocketActions

export const initDefaultValues: SocketState = {
  socket: null
}


export const createSocketStore = (initialState: SocketState = initDefaultValues) =>
  createStore<SocketStore>()((set, get) => ({
    ...initialState,
    sendNotification: (uid) => {
      const {socket} = get();

      if (socket) socket.emit("new-notification-s", uid);
    },
    initSocket: async () => {
      const { socket } = get();
      let mySocket: Socket;

      if (!(await checkCookieExist())) return

      if (!socket?.connect)
        mySocket = io("https://sciflutter-backend.onrender.com", {
          query: {
            "sciflutter-token": `${await getToken()}`,
          },
        });
      else mySocket = socket;      

      set(() => ({socket: mySocket}));
    }
  }))
