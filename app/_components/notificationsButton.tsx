"use client"
import { BellSimple, BellSimpleRinging } from "@phosphor-icons/react"
import NotificationsList from "./notificationsList"
import { useCallback, useEffect, useState } from "react"
import { useNotificationStore } from "../_context/notificationsContext"
import { useShallow } from "zustand/react/shallow"

import '@/styles/components/notifications.scss'
import { useSocketContext } from "../_context/socketContext"

const NotificationsButton: React.FC = () => {
  const { socket, initSocket } = useSocketContext(useShallow(state => state))
  const { getNotifications, readNotifications, newNotifications, setNewNotifications } = useNotificationStore(useShallow(state => state))
  const [showNotifications, setShowNotifications] = useState<boolean>(false)

  const getMyNotifications = useCallback(async () => {
    await getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    getMyNotifications()
  }, [getMyNotifications])


  useEffect(() => {
    if (!socket) initSocket()
  }, [initSocket, socket])

  useEffect(() => {
    if (!socket) return
    
    socket.on('new-notification-c', async () => {
      setNewNotifications(true)
      await getMyNotifications()
    })

    return () => {
      socket.off('new-notification-c')
    }
  }, [socket, getMyNotifications, setNewNotifications])

  const handleClick = async () => {
    await readNotifications()

    setNewNotifications(false)

    setShowNotifications(state => !state)

    if(showNotifications) await getMyNotifications()
  }
  
  const handleDropdown = () => {
    setShowNotifications(false)
  }

  return (
    <div className="c-notifications__container">
      <button
        className="c-navbar-menu__btn"
        onClick={handleClick}
      >
        {newNotifications
          ? <BellSimpleRinging size={32} className="c-navbar-menu__icon" weight="fill" />
          : <BellSimple size={32} className="c-navbar-menu__icon" weight="light" />
        }
      </button>

      {showNotifications && <NotificationsList handleClose={handleDropdown}/>}
    </div>
  )
}

export default NotificationsButton