import { X } from "@phosphor-icons/react";

import '@/styles/components/modal-header.scss'

interface Props{
  onCancel(): void,
  title: string
}

const ModalHeader: React.FC<Props> = ({ onCancel, title }) => {
  return (
    <div className="c-modal-header">
      <p className="c-modal-header__title">{title}</p>

      <button className="c-modal-header__btn" onClick={onCancel}>
        <X width={32} className="c-modal-header__icon" />
      </button>
    </div>
  );
}

export default ModalHeader