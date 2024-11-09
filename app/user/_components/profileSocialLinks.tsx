import { FacebookLogo } from "@phosphor-icons/react/dist/ssr/FacebookLogo";
import { Globe } from "@phosphor-icons/react/dist/ssr/Globe";
import { TwitterLogo } from "@phosphor-icons/react/dist/ssr/TwitterLogo";
import ProfileDetailsBox from "./profileDetailsBox";

import '@/styles/components/social-links.scss'

enum SocialType {
  WEB = 'web',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
}

const ICONS: {[key in SocialType]: JSX.Element} = {
  web: <Globe weight="fill" size={32} />,
  facebook: <FacebookLogo weight="fill" size={32} />,
  twitter: <TwitterLogo weight="fill" size={32} />,
};

const linksList = [
  {
    type: "web",
    link: 'mi-pagina-web.com',
    text: "Mi pagina web"
  },
  {
    type: "facebook",
    link: 'facebook.com',
    text: "Mi facebook"
  }
]

const ProfileSocialLinks = () => {
  return (
    <ProfileDetailsBox title="Contact">
      <ul className="c-social-links">
        {linksList.map((link) => (
          <li key={link.type}>
            <a href={link.link} className="c-social-links__link">
              {ICONS[(link.type as SocialType)]}
              <p>{link.text}</p>
            </a>
          </li>
        ))}
      </ul>
    </ProfileDetailsBox>
  );
};

export default ProfileSocialLinks;
