import Image from 'next/image'

import FooterContact from './footerContact'
import FooterNav from './footerNav'

import '@/styles/layout/footer.scss'
import { getCookieTheme } from '../_utils/getCookieTheme'
import { mainLogoDark, mainLogoLight } from '../_utils/logos'

const Footer: React.FC = async () => {
  const theme = getCookieTheme()

  return (
    <footer className="l-footer">
      <div className="l-footer__col">
        <div className="l-footer__description">
          <Image
            src={theme === "light" ? mainLogoLight : mainLogoDark}
            alt="Main logo"
            width={50}
            height={50}
            className="l-footer__description-logo"
            style={{
              width: "auto",
            }}
          />

          <p className="l-footer__description-text">
            Encuentra articulos acerca de diversos temas, conoce mas sobre sus
            autores, publica tus propios textos para convertirte en uno de
            nuestros autores. No esperes mas para descubrir lo que SciFlutter
            tiene para ofrecer.
          </p>
        </div>

        <FooterContact />
      </div>

      <div className="l-footer__col">
        <FooterNav />
      </div>
    </footer>
  );
}

export default Footer