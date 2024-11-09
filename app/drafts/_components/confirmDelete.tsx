"use client"
import ModalBox from "@/app/_components/modalBox";
import ModalButtons from "@/app/_components/modalButtons";
import ModalGroup from "@/app/_components/modalGroup";
import ModalHeader from "@/app/_components/modalHeader";
import { useAlertContext } from "@/app/_context/alertContext";
import React, { useState } from "react";

interface Props {
  onClick(): void;
  onCancel(): void;
  title: string;
  children?: React.ReactNode;
}

const ConfirmDelete: React.FC<Props> = ({ onCancel, onClick, title, children }) => {
  const [confirmText, setConfirmText] = useState('')
  const { setAlert } = useAlertContext(state => state)

  const handleAccept = () => {
    if (confirmText !== 'DELETE') {
      setAlert('error', 'Validation failed, try again')
      return
    }
    
    setConfirmText('')
    onClick()
  }

  return (
    <ModalBox>
      <ModalHeader onCancel={onCancel} title={title} />

      {children}

      <ModalGroup>
        <label htmlFor="confirmText">Enter DELETE to confirm</label>
        <input
          type="text"
          name="confirmText"
          id="confirmText"
          placeholder="DELETE"
          value={confirmText}
          onChange={(e) => {
            setConfirmText(e.target.value);
          }}
        />
      </ModalGroup>

      <ModalButtons
        acceptText="Confirm delete"
        onAccept={handleAccept}
        onCancel={onCancel}
      />
    </ModalBox>
  );
}

export default ConfirmDelete