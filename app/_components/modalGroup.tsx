import '@/styles/components/modal-group.scss';

interface Props{
  children: React.ReactNode
}

const ModalGroup: React.FC<Props> = ({ children }) => {
  return (
    <div className='c-modal-group'>{children}</div>
  )
}

export default ModalGroup