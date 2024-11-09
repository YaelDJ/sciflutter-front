import ProfileDetailsBox from './profileDetailsBox';

interface Props{
  description: string
}

const ProfileAboutMe: React.FC<Props> = ({ description }) => {
  return (
    <ProfileDetailsBox title='About me'>
      <p>{description}</p>
    </ProfileDetailsBox>
  );
}

export default ProfileAboutMe