import { BaseComponent } from '@/app/_interfaces/components'
import '@/styles/components/settings-group.scss'
import clsx from 'clsx'

interface Props extends BaseComponent{
  type?: string
}

const SettingsGroup: React.FC<Props> = ({ children, type }) => {
  return (
    <div className={clsx('c-settings-group', type && `c-settings-group_${type}`)}>{children}</div>
  )
}

export default SettingsGroup