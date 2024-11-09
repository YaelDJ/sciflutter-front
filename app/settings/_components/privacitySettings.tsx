"use client"
import { useState } from "react";
import dynamic from "next/dynamic";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/app/_interfaces/api";

import { signout } from "@/app/_actions/authActions";
import { deactivateAccount, deleteAccount } from "@/app/_actions/userActions";

import { useAlertContext } from "@/app/_context/alertContext";

import ChangePassword from "./changePassword";
import SettingsGroup from "./settingsGroup";
import SettingsButton from "./settingsButton";
import ConfirmChanges from "../../_components/confirmChanges";

import "@/styles/layout/settings.scss";

const DynamicModalWindow = dynamic(() => import('@/app/_components/modalWindow'), { ssr: false })

const PrivacitySettings: React.FC = () => {
  const [selectOption, setSelectOption] = useState<string>('deactivate')

  const [confirmDisableOpen, setConfirmDisableOpen] = useState<boolean>(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false)
  const setAlert = useAlertContext(state =>state.setAlert)

  const handleDeactivateAccount = async (password: string) => {
    const apiResponse: ApiSuccessResponse | ApiErrorResponse =
      await deactivateAccount(password);

    setAlert(apiResponse.success ? "success" : "error", apiResponse.message);

    if (apiResponse.success) {
      setConfirmDisableOpen(false);
      signout();
    }
  }

  const handleDeleteAccount = async (password: string) => {
    const apiResponse: ApiSuccessResponse | ApiErrorResponse =
      await deleteAccount(password);

    setAlert(apiResponse.success ? "success" : "error", apiResponse.message);

    if (apiResponse.success) {
      setConfirmDisableOpen(false);
      signout();
    }
  }

  return (
    <div className="l-settings">
      <p className="l-settings__heading">Access</p>

      <div className="l-settings__content">
        <ChangePassword />

        <form
          className="l-settings__col"
          action={() => {
            if (selectOption === "deactivate") {
              setConfirmDisableOpen(true);
            } else if (selectOption === "delete") {
              setConfirmDeleteOpen(true);
            }
          }}
        >
          <p className="l-settings__heading">Account</p>

          <div className="l-settings__row">
            <SettingsGroup>
              <label htmlFor="name">Delete or disable account</label>

              <select
                name="disable"
                id="disable"
                className="input"
                defaultValue={selectOption}
                onChange={(e) => setSelectOption(e.target.value.trim())}
              >
                <option value="deactivate">Deactivate</option>
                <option value="delete">Delete</option>
              </select>
            </SettingsGroup>

            <SettingsButton>
              {`${selectOption.at(0)?.toUpperCase()}${selectOption.substring(
                1
              )} account`}
            </SettingsButton>
          </div>

          <DynamicModalWindow
            isModalOpen={confirmDisableOpen}
            onClickOverlay={() => setConfirmDisableOpen(false)}
          >
            <ConfirmChanges
              onClick={handleDeactivateAccount}
              onCancel={() => setConfirmDisableOpen(false)}
              title="Confirm deactivate account"
            >
              <p>
                Remember that once your account has been deactivated your
                articles won&apos;t be longer visibles. You can reactivate your
                account logging in again.
              </p>
            </ConfirmChanges>
          </DynamicModalWindow>

          <DynamicModalWindow
            isModalOpen={confirmDeleteOpen}
            onClickOverlay={() => setConfirmDeleteOpen(false)}
          >
            <ConfirmChanges
              onClick={handleDeleteAccount}
              onCancel={() => setConfirmDeleteOpen(false)}
              title="Confirm delete account"
            >
              <p>
                Remember that once your account has been deleted your articles
                won&apos;t be longer visibles. This action is irreversible and
                if you want to keep your Sciflutter data you could just
                deactivate your account.
              </p>
            </ConfirmChanges>
          </DynamicModalWindow>
        </form>
      </div>
    </div>
  );
};

export default PrivacitySettings;
