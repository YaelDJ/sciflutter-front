import React from "react"

interface Props {
  children: JSX.Element | string
}

export const HeadingSecondary: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="heading--secondary">{children}</h2>
  )
}