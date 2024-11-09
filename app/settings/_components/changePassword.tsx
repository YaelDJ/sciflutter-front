import { useState } from "react";
import dynamic from "next/dynamic";

import { setCookieToken } from "@/app/_actions/authActions";
import { changePassword } from "@/app/_actions/userActions";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/app/_interfaces/api";

import SettingsGroup from "./settingsGroup";
import SettingsButton from "./settingsButton";
import ConfirmChanges from "../../_components/confirmChanges";
import { useAlertContext } from "@/app/_context/alertContext";

const DynamicModalWindow = dynamic(() => import('@/app/_components/modalWindow'), { ssr: false })

const ChangePassword: React.FC = () => {
  const { setAlert } = useAlertContext(state => state);
  const [confirmPasswordOpen, setConfirmPasswordOpen] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");

  return (
    <form
      className="l-settings__col"
      action={(formData: FormData) => {
        if (!formData.get("newPassword") || !formData.get("newPasswordConfirm"))
          return setAlert("error", "Todos los campos con obligatorios");

        if ((formData.get("newPassword") as string).length < 8)
          return setAlert(
            "error",
            "Password must be at least 8 characters long"
          );

        if (formData.get("newPassword") !== formData.get("newPasswordConfirm"))
          return setAlert("error", "Las contraseñas no coinciden");

        setConfirmPasswordOpen(true);
      }}
    >
      <p className="l-settings__heading">Cambiar contraseña</p>

      <div className="l-settings__row">
        <SettingsGroup>
          <label htmlFor="newPassword">
            Nueva contraseña (8 caracteres minimo)
          </label>
          <input
            type="password"
            placeholder="***********"
            id="newPassword"
            name="newPassword"
            className="input"
            value={newPassword}
            onChange={(e) => {
              if (e.target.value === " ") return;

              setNewPassword(e.target.value);
            }}
          />
        </SettingsGroup>

        <SettingsGroup>
          <label htmlFor="newPasswordConfirm">Confirmar nueva contraseña</label>
          <input
            type="password"
            placeholder="***********"
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            className="input"
            value={newPasswordConfirm}
            onChange={(e) => {
              if (e.target.value === " ") return;

              setNewPasswordConfirm(e.target.value.trim());
            }}
          />
        </SettingsGroup>
      </div>

      <div className="l-settings__submit">
        <SettingsButton>Cambiar contraseña</SettingsButton>
      </div>

      <DynamicModalWindow
        isModalOpen={confirmPasswordOpen}
        onClickOverlay={() => setConfirmPasswordOpen(false)}
      >
        <ConfirmChanges
          onClick={async (password: string) => {
            const formData = {
              password,
              newPassword,
              newPasswordConfirm,
            };

            const apiResponse: ApiSuccessResponse | ApiErrorResponse =
              await changePassword(formData);

            setAlert(
              apiResponse.success ? "success" : "error",
              apiResponse.message
            );

            if (apiResponse.success && apiResponse.token) {
              setCookieToken(apiResponse.token);
              setConfirmPasswordOpen(false);
            }
          }}
          onCancel={() => setConfirmPasswordOpen(false)}
          title="Confirm new password"
        />
      </DynamicModalWindow>
    </form>
  );
}

export default ChangePassword