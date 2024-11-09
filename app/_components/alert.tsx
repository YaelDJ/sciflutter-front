"use client"
import clsx from 'clsx'

import '@/styles/components/alert.scss'
import { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { CheckSquare, Warning, XSquare } from '@phosphor-icons/react'
import { useAlertContext } from '../_context/alertContext'

enum AlertType {
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warn"
}

const ICON: {[key in AlertType]: JSX.Element} = {
  [AlertType.ERROR]: <XSquare size={32} className="alert__icon" />,
  [AlertType.SUCCESS]: <CheckSquare size={32} className="alert__icon" />,
  [AlertType.WARNING]: <Warning size={32} className="alert__icon" />,
};

const Alert: React.FC = () => {
  const alert = useAlertContext(state => state.alert)
  const hiddeAlert = useAlertContext(useShallow(state => state.hiddeAlert))
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentAlert = alertRef.current

    currentAlert?.addEventListener('click', () => {
      hiddeAlert()
    })
    
    return () => {
      currentAlert?.removeEventListener("click", () => {
        hiddeAlert();
      });
    }
    
  }, [hiddeAlert])

  return (
    <div className={clsx(`alert alert_${alert.type}`, Boolean(alert.message) && "is-display")} ref={alertRef}>
      <div className='alert__icon-box'>{ICON[alert.type as AlertType]}</div>
      <p>{alert.message}</p>
    </div>
  )
}

export default Alert