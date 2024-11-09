import { useState } from "react";

import ModalBox from "@/app/_components/modalBox"
import ModalButtons from "@/app/_components/modalButtons";
import ModalGroup from "@/app/_components/modalGroup";
import ModalHeader from "@/app/_components/modalHeader"

interface Props {
  onClick(password: string): void;
  onCancel(): void;
  title: string;
  children?: React.ReactNode
}

const ConfirmChanges: React.FC<Props> = ({ onCancel, onClick, title, children = null }) => {
  const [password, setPassword] = useState("");

  return (
    <ModalBox>
      <ModalHeader onCancel={onCancel} title={title} />

      {children}

      <ModalGroup>
        <label htmlFor="password">Enter your current password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="**********"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </ModalGroup>

      <ModalButtons
        acceptText="Confirm"
        onAccept={() => onClick(password)}
        onCancel={onCancel}
      />
    </ModalBox>
  );
}

export default ConfirmChanges