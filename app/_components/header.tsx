import Image from 'next/image'
import Link from 'next/link'

import { getCookieTheme } from '../_utils/getCookieTheme'

import { textLogoDark, textLogoLight } from '../_utils/logos'

import '@/styles/layout/header.scss'

interface Props{
  children: React.ReactNode
}

const Header: React.FC<Props> = ({ children }) => {
  const theme = getCookieTheme()
  return (
    <header className="l-header">
      <div className="l-header__navigation">
        <Link href="/">
          <Image
            src={theme === "light" ? textLogoLight : textLogoDark}
            className="l-header__logo"
            alt="Sciflutter logo"
            style={{
              width: "auto",
              height: "3.2rem",
            }}
          />
        </Link>

        {children}
      </div>
    </header>
  );
}

export default Header