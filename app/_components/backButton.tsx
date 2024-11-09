"use client"
import '@/styles/components/back-button.scss'
import { ArrowLeft } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';

const BackButton = () => {
  const { back } = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if(pathname === '/') return

    back()
  }

  return (
    <div className="c-back-button__container">
      <div>
        {pathname === '/' ?
          <p className='c-back-button__text'>Home</p> :
          <button onClick={handleClick} className='c-back-button__btn'><ArrowLeft size={24}/> back</button>
        }
      </div>
    </div>
  );
}

export default BackButton