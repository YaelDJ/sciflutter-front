"use client"
import {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  ButtonHTMLAttributes,
} from "react";
import { useShallow } from 'zustand/react/shallow'

import clsx from 'clsx'

import { useSideMenuContext } from '../_context/sideMenuContext'

import Link from 'next/link'
import { Article, Gear, Question, SignOut, X } from '@phosphor-icons/react'

import '@/styles/components/menu.scss'
import { Logout } from "./buttons";
import { LoggedUser } from "../_interfaces/api";

interface Props {
  user: LoggedUser
}

export const ToogleMenu: FC<Props> = ({ user }) => {
  const { menuOpen, toogleMenuOpen } = useSideMenuContext(state => state)

  const refMenu = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuOpen) {
        if (
          refMenu.current &&
          !refMenu.current.contains((e.target as HTMLElement))
        ) {
          toogleMenuOpen()
        }
      }
    }

    document.addEventListener('click', handleOutsideClick)
    
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [refMenu, menuOpen, toogleMenuOpen])

  return (
    <aside
      className={clsx("menu-aside", menuOpen && "menu-aside--open")}
      ref={refMenu}
    >
      <div className="menu-aside__header">
        <p className="menu-aside__header-name">
          {user?.name} {user?.lastName}
        </p>

        <ToogleMenuButton className="menu-aside__btn">
          <X className="menu-aside__icon_close" size={24} />{" "}
        </ToogleMenuButton>
      </div>

      <menu>
        <li>
          <Link
            type="icon"
            href="/settings"
            className="menu-aside__link"
            onClick={toogleMenuOpen}
          >
            Configuracion <Gear size={20} className="menu-aside__icon" />
          </Link>
        </li>

        {user?.isAdmin && (
          <li>
            <Link
              type="icon"
              href="/requests"
              className="menu-aside__link"
              onClick={toogleMenuOpen}
            >
              Requests <Article size={20} className="menu-aside__icon" />
            </Link>
          </li>
        )}

        <li>
          <Link
            type="icon"
            href="/support"
            className="menu-aside__link"
            onClick={toogleMenuOpen}
          >
            Ayuda <Question size={20} className="menu-aside__icon" />
          </Link>
        </li>

        <li>
          <Logout className="menu-aside__btn" onClick={toogleMenuOpen}>
            Cerrar sesion <SignOut size={20} className="menu-aside__icon" />{" "}
          </Logout>
        </li>
      </menu>
    </aside>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
}

export const ToogleMenuButton: FC<ButtonProps> = ({ children, ...props }) => {
  const toogleMenuOpen = useSideMenuContext(useShallow((state) => state.toogleMenuOpen))

  return (
    <button {...props} onClick={toogleMenuOpen}>
      {children}
    </button>
  );
}
