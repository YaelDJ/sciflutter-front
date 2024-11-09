import type { User } from '@/app/_interfaces/api'

import Profile from './profile'
import ProfileContent from './profileContent'

interface Props{
  user: User
}

const ProfilePage: React.FC<Props> = async ({ user }) => { 
  return (
    <>
      <Profile user={user} />

      <ProfileContent user={user} />
    </>
  );
}

export default ProfilePage