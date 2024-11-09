import type { BaseComponent } from '@/app/_interfaces/components'
import '@/styles/components/settings-button.scss'
import clsx from 'clsx';

interface Props extends BaseComponent {
  onClick?(): void,
  className?: string, 
  type?: string
}

const SettingsButton: React.FC<Props> = ({ children, onClick, className = '', type = '' }) => {
  return (
    <button onClick={onClick} className={clsx(`c-settings-button${type ? '_' + type : ''}`, className)}>
      <span>{children}</span>
    </button>
  );
}

export default SettingsButton