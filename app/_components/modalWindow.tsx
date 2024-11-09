import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Overlay from './overlay'
import { BaseComponent } from '../_interfaces/components'

import '@/styles/components/modal-window.scss'
import clsx from 'clsx'

interface WindowProps extends BaseComponent{
  onClose?(): void;
  isModalOpen: boolean,
  onClickOverlay(): void
}

export const ModalWindow: React.FC<WindowProps> = ({ children, isModalOpen, onClickOverlay }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
       if(!isModalOpen) return

      if (ref.current && !ref.current.contains((e.target as Node))) onClickOverlay();
    };

    if (isModalOpen) { 
      document.body.classList.add('is-modal-open')
    } else {
      document.body.classList.remove('is-modal-open')
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isModalOpen, ref, onClickOverlay])

  return createPortal(
    <div className={clsx('modal-cont-1', isModalOpen && 'modal-cont-1--open')}>
      <div className='modal-cont-2'>
        <div className='modal-cont-3'>
          <Overlay display={isModalOpen}/>

          <div className='modal-cont-4'>
            <div className="modal-cont-5">
              <div className='modal-container' ref={ref}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalWindow;