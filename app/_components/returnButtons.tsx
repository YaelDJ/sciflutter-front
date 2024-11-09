"use client"
import { type ReactNode, type FC } from 'react'

import { ArrowLeft } from '@phosphor-icons/react'
import '@/styles/components/return-buttons.scss'
import { useRouter } from 'next/navigation'

interface Props {
  children?: ReactNode
}

const ReturnButtons: FC<Props> = ({ children }) => {
  const { back } = useRouter()
  
  const handleBack = () => {
    back()
  }

  return (
    <div className='c-return-buttons'>
      <div>
        <button onClick={handleBack}><ArrowLeft size={24}/>  Go back</button>
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}

export default ReturnButtons