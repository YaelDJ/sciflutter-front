import { BaseComponent } from '@/app/_interfaces/components'

import '@/styles/components/details-box.scss'

interface Props extends BaseComponent{
  title: string
}

const ProfileDetailsBox: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="c-details-box">
      <h4 className="c-details-box__heading">{title}</h4>
      {children}
    </div>
  );
}

export default ProfileDetailsBox