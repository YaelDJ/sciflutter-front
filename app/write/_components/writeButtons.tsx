import "@/styles/components/write-buttons.scss";
import clsx from "clsx";
import { useCurrentDraft } from "./stepController";

interface Props{
  handleNextStep(): void,
  handlePrevStep(): void,
}

const WriteButtons: React.FC<Props> = ({ handlePrevStep, handleNextStep }) => {
  const { step } = useCurrentDraft()

  return (
    <div className="c-write-buttons">
      <button
        onClick={handlePrevStep}
        className={clsx("c-write-buttons__btn", step === 1 && "is-disable")}
      >
        Prev
      </button>

      <button
        onClick={handleNextStep}
        className={clsx("c-write-buttons__btn", step >= 4 && "is-disable")}
      >
        Next
      </button>
    </div>
  );
};

export default WriteButtons;
