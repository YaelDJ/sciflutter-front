import { BaseComponent } from '../_interfaces/components'

import '@/styles/components/notification.scss'
interface Props extends BaseComponent{
  type: string,
}

const Notification: React.FC<Props> = ({ children, type }) => {
  return(
    <div className={`notification notification_${type}`}>
      <h4>{type}</h4>
      <p>{children}</p>
    </div>
  )
}

export default Notification