import { Metadata } from "next"
import { FC } from "react"
import { BaseComponent } from "../_interfaces/components"
import { UserProvider } from "../_context/userContext"
import { getLoggedUser } from "../_actions/userActions"

export const metadata: Metadata = {
  title: 'SignIn'
}

const Layout: FC<BaseComponent> = async ({ children }) => {
  const loggedUser = await getLoggedUser()

  return (
    <UserProvider initialValue={loggedUser}>{children}</UserProvider>
  )
}

export default Layout