import Image from 'next/image'

import { PenNib } from '@phosphor-icons/react/dist/ssr/PenNib'
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart'
import { Users } from '@phosphor-icons/react/dist/ssr/Users'

import '@/styles/components/author-card.scss'
import { UserPreview } from '../_interfaces/api'
import LinkSimple from './linkSimple'

interface Props {
  author: UserPreview
}

const AuthorCard: React.FC<Props> = ({ author }) => {
  return (
    <li className="c-author-card">
      <Image
        src={author.photos.profile}
        alt="author profile picture"
        className="c-author-card__img"
        width={140}
        height={140}
      />

      <h4 className="c-author-card__heading">{author.name}</h4>

      <p className="c-author-card__discipline">{author.discipline}</p>

      <div className="c-author-card__stats">
        <div className="c-author-card__stat">
          <PenNib weight="light" size={32} className="c-author-card__icon" />
          <p className="c-author-card__stat-label">Articulos</p>
          <p>{author.articles}</p>
        </div>

        <div className="c-author-card__stat">
          <Heart weight="light" size={32} className="c-author-card__icon" />
          <p className="c-author-card__stat-label">Likes</p>
          <p>{author.likes}</p>
        </div>

        <div className="c-author-card__stat">
          <Users weight="light" size={32} className="c-author-card__icon" />
          <p className="c-author-card__stat-label">Seguidores</p>
          <p>{author.followers}</p>
        </div>
      </div>

      {/* <Link href={`/users/${author._id}`} className="c-author-card__btn">
        Ver perfil{" "}
        <ArrowRight
          size={32}
          weight="regular"
          className="c-author-card__icon"
        />
      </Link> */}

      <LinkSimple href={`/user/${author._id}`}>Ver perfil</LinkSimple>
    </li>
  );
}

export default AuthorCard