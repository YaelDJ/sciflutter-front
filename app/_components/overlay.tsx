import '@/styles/components/overlay.scss'
import clsx from 'clsx'

interface Props{
  onClick?: () => void;
  display?: boolean;
}

const Overlay: React.FC<Props> = ({ onClick, display }) => {
  return (
    <div onClick={onClick} className={clsx('overlay', display && 'overlay--open')}></div>
  )
}

export default Overlay