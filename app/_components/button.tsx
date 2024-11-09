import React from 'react'

interface Props{
  children: React.ReactNode,
  className: string,
  onClick?(): void,
  disabled?: boolean
}

const Button: React.FC<Props> = ({ children, className, onClick, disabled = false }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button