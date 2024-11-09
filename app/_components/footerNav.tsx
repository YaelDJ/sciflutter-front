import Link from 'next/link';

import { checkCookieExist } from '../_actions/authActions';

import { BackToTop, Logout } from './buttons';

import '@/styles/layout/footer.scss'

interface NavLinks {
  category: string,
  links: {tag: string, link: string}[]
}

const FOOTER_NAV_LINKS: NavLinks[] = [
  {
    category: "Help & Support",
    links: [
      { tag: "FAQ", link: "#" },
      { tag: "Report issue", link: "#" },
      { tag: "Cookies", link: "#" },
      { tag: "Terms and conditions", link: "#" },
      { tag: "Privacity", link: "#" }
    ]
  },
  {
    category: "More",
    links: [
      { tag: "Landing page", link: "#" },
      { tag: "API", link: "#" },
      { tag: "Repository", link: "#" },
      { tag: "Documentation", link: "#" }
    ]
  }
];

const FooterNav: React.FC = async () => {
  return (
    <nav className="l-footer__nav">
      {FOOTER_NAV_LINKS.map((links) => (
        <div className="l-footer__nav-col" key={links.category}>
          <p className="l-footer__nav-col-title">{links.category}</p>

          <ul className="c-footer-list">
            {links.links.map((link) => (
              <li key={link.tag}>
                {link.tag !== "Logout" && (
                  <Link
                    href={link.link}
                    type="icon"
                    className="c-footer-list__link"
                  >
                    {link.tag}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="l-footer__nav-col">
        <p className="l-footer__nav-col-title">Account</p>

        <ul className="c-footer-list">
          <li>
            <BackToTop className="c-footer-list__btn">Home</BackToTop>
          </li>

          {!(await checkCookieExist()) && (
            <li>
              <Link href="/forgot-password" className="c-footer-list__link">
                Recover account
              </Link>
            </li>
          )}

          <li>
            <Link
              href={(await checkCookieExist()) ? "/write" : "/signup"}
              className="c-footer-list__link"
            >
              Start to write
            </Link>
          </li>

          {(await checkCookieExist()) && (
            <li>
              <Logout className="c-footer-list__btn">Logout</Logout>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default FooterNav