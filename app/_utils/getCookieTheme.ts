"use server"
import { cookies } from "next/headers"

export const getCookieTheme = (): "light" | "dark" => {
  const tema = cookies().get('sciflutter-theme')

  if (!tema) return 'light'

  return tema.value as 'light' | 'dark'
}