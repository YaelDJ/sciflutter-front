import '@/styles/skeletons/profile.scss'

const ProfileSkeleton: React.FC = () => {
  return (
    <div className='s-profile'>
      <div className='s-profile__pictures'>
        <div className="s-profile__picture s-profile__picture_cover">
        </div>

        <div className="s-profile__picture s-profile__picture_profile">
        </div>
      </div>

      <div className='s-profile__info'></div>
    </div>
  )
}

export default ProfileSkeleton