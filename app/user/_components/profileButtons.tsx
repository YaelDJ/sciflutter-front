import type { User } from '@/app/_interfaces/api';

import { getLoggedUser } from "@/app/_actions/userActions";

import { Follow } from '@/app/_components/buttons'

import "@/styles/components/profile-buttons.scss";

interface Props{
  user: User;
  follow: boolean;
}

const ProfileButtons: React.FC<Props> = async ({ user, follow }) => {
  const currentUser = await getLoggedUser();

  if (currentUser?._id === user._id) return null

  return (
    <section className="c-profile-buttons">
      <Follow follow={follow} userId={user._id} />
    </section>
  );
}

export default ProfileButtons
