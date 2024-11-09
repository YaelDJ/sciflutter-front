import '@/styles/components/profile.scss'
import Image from 'next/image'
import { User } from '@/app/_interfaces/api'
import ProfileStats from './profileStats'
import ProfileButtons from './profileButtons'
import { checkCookieExist } from '@/app/_actions/authActions'
import { checkAuthorFollow } from '@/app/_actions/featuresActions'
interface Props {
  user: User,
  children?: React.ReactNode
}

const Profile: React.FC<Props> = async ({ user, children }) => {
  const isFollow = await checkAuthorFollow(user._id);
  
  return (
    <section className="c-profile">
      <div className="c-profile__pictures">
        <div className="c-profile__picture_cover">
          <Image
            src={user.photos.cover}
            alt="user cover picture"
            width={1200}
            height={600}
          />
        </div>

        <div className="c-profile__picture_profile">
          <Image
            src={user.photos.profile}
            alt="user profile picture"
            width={250}
            height={250}
          />
        </div>
      </div>

      <div className="c-profile__info">
        <div className="c-profile__text">
          <h1 className="c-profile__info-name">
            {user.name} {user.lastName}
          </h1>

          {user.discipline && (
            <p className="c-profile__info-discipline">{user.discipline}</p>
          )}
        </div>

        {user.role === "author" && <ProfileStats userId={user._id} />}

        {await checkCookieExist() && (
          <ProfileButtons user={user} follow={isFollow} />
        )}
      </div>
    </section>
  );
}

export default Profile