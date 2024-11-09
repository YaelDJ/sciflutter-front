"use client"

import Message from "./_components/message"
import { getErrorMessage } from "./_utils/getErrorMessage"
import ReturnButtons from "./_components/returnButtons"
import { ArrowClockwise } from "@phosphor-icons/react"
import type { ErrorComponent } from "next/dist/client/components/error-boundary"
import { useEffect } from "react"

const ErrorPage: ErrorComponent = ({error, reset}) => {
  const { code, message } = getErrorMessage(error.message)

  useEffect(() => {
    console.log(error) 
  }, [error])

  return (
    <div>
      <Message message="Something went wrong" subMessage={`${code}: ${message}`} type="error" />
      
      <ReturnButtons>
        <button onClick={() => {
          reset()
        }}>Retry <ArrowClockwise size={24} /></button>
      </ReturnButtons>
    </div>
  )
}

export default ErrorPage