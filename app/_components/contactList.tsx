import Link from "next/link";

import { Envelope } from "@phosphor-icons/react/dist/ssr/Envelope";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr/FacebookLogo";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { Globe } from "@phosphor-icons/react/dist/ssr/Globe";

import '@/styles/components/contact-list.scss';

const ContactList: React.FC = () => {
  return (
    <ul className="c-contact-list">
      <li>
        <Link href="#" className="c-contact-list__link" type="icon">
          <FacebookLogo size={32} weight="duotone" />
        </Link>
      </li>

      <li>
        <Link href="#" className="c-contact-list__link" type="icon">
          <Globe size={32} weight="duotone" />
        </Link>
      </li>

      <li>
        <Link href="#" className="c-contact-list__link" type="icon">
          <Envelope size={32} weight="duotone" />
        </Link>
      </li>

      <li>
        <Link href="#" className="c-contact-list__link" type="icon">
          <GithubLogo size={32} weight="duotone" />
        </Link>
      </li>
    </ul>
  );
}

export default ContactList