import '@/styles/components/message.scss'
import '@/styles/layout/container-empty.scss'

interface Props{
  message: string,
  subMessage?: string,
  type?: string
}

const Message: React.FC<Props> = ({ message, subMessage = "", type = 'default' }) => {
  return (
    <div className='l-container-empty'>
      <p className={`c-message ${type}`}>{message}</p>
      {subMessage && <p className='c-message_sub'>{subMessage}</p>}
    </div>
  )
}

export default Message