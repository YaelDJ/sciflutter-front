"use client"
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

import "@/styles/components/navbar-menu.scss";

const NavBarPublic: React.FC = () => {
  const pathname = usePathname()

  return (
    <nav className="c-navbar-menu">
      <Link
        href="/login"
        type="icon"
        className={clsx(
          "c-navbar-menu__link",
          pathname === "/login" && "is-active"
        )}
      >
        Login
      </Link>

      <Link
        href="/signup"
        type="icon"
        className={clsx(
          "c-navbar-menu__signup",
          pathname === "/signup" && "is-active"
        )}
      >
        Signup
      </Link>
    </nav>
  );
}

export default NavBarPublic