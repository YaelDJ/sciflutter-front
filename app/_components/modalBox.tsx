
import '@/styles/components/modal.scss'

interface Props{
  children: React.ReactNode
}

const ModalBox: React.FC<Props> = ({children}) => {
  return (
    <div className='c-modal'>{children}</div>
  )
}

export default ModalBox