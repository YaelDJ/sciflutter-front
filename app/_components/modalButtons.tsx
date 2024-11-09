import '@/styles/components/modal-buttons.scss';

interface Props{
  onCancel(): void,
  onAccept(): void,
  acceptText: string
}

const ModalButtons: React.FC<Props> = ({ onAccept, onCancel, acceptText }) => {
  return (
    <div className="c-modal-buttons">
      <button className="c-modal-buttons__btn_cancel" onClick={onCancel}>
        Cancelar
      </button>

      <button
        onClick={onAccept}
        className="c-modal-buttons__btn_accept"
      >
        <span>
          {acceptText}
        </span>
      </button>
    </div>
  );
}

export default ModalButtons