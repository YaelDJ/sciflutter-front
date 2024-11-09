import React from 'react'
import "@/styles/components/prev-list.scss";

interface Props{
  type: 'authors' | 'articles',
  children: React.ReactNode
}

const CardsList: React.FC<Props> = ({ children, type }) => {
  return (
    <ul className={`b-prev-list_${type}`}>
      {children}
    </ul>
  )
}

export default CardsList