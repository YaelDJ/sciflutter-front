import { getUserStats } from '@/app/_actions/userActions';
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import { PenNib } from '@phosphor-icons/react/dist/ssr/PenNib';
import { Users } from '@phosphor-icons/react/dist/ssr/Users';

interface Props{
  userId: string
}

const ProfileStats: React.FC<Props> = async ({ userId }) => {
  let stats = await getUserStats(userId)

  return (
    <ul className="c-profile__stats">
      <li className="c-profile__stat">
        <Heart size={56} className="c-profile__stat-icon" weight="light" />

        <p>{stats.likes}</p>
      </li>

      <li className="c-profile__stat">
        <PenNib size={56} className="c-profile__stat-icon" weight="light" />

        <p>{stats.articles}</p>
      </li>

      <li className="c-profile__stat">
        <Users size={56} className="c-profile__stat-icon" weight="light" />

        <p>{stats.followers}</p>
      </li>
    </ul>
  );
}

export default ProfileStats