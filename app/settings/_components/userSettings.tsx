"use client"
import dynamic from "next/dynamic"
import clsx from "clsx"

import { useSettingsContext } from "@/app/_context/settingsContext"

import { useUserContext } from "@/app/_context/userContext"

import UserSettingsSkeleton from "@/app/_skeletons/userSettingsSkeleton"
import PhotosSettingsSkeleton from "@/app/_skeletons/photosSettingsSkeleton"

import SettingsGroup from "./settingsGroup"
import SettingsButton from "./settingsButton"
import Notification from "@/app/_components/notification"

import "@/styles/components/user-settings.scss";
import "@/styles/layout/settings.scss";

const DynamicPhotosSettings = dynamic(() => import('./photosSettings'), { ssr: true, loading: () => <PhotosSettingsSkeleton /> })

const UserSettings: React.FC = () => {
  const user = useUserContext(state => state.user)

  const { requestDataUpdate, pending } = useSettingsContext();

  if (!user) return <UserSettingsSkeleton />;
  
  return (
    <form action={requestDataUpdate} className="l-settings">
      {user.status === "unconfirmed" && (
        <Notification type="warning">
          Please confirm your account to change your data
        </Notification>
      )}

      <p className="l-settings__heading">User</p>

      <div className="l-settings__content">
        <SettingsGroup>
          <p>Fotos</p>

          <div className="photos">
            <DynamicPhotosSettings photos={user.photos} />
          </div>
        </SettingsGroup>

        <div className="l-settings__row">
          <SettingsGroup>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              defaultValue={user.name}
              id="name"
              name="name"
              className="input"
            />
          </SettingsGroup>

          <SettingsGroup>
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              defaultValue={user.lastName}
              id="lastName"
              name="lastName"
              className="input"
            />
          </SettingsGroup>
        </div>
      </div>

      {user.role === "author" && (
        <>
          <div className="l-settings__line"></div>

          <p className="l-settings__heading">Autor</p>

          <div className="l-settings__content">
            <div className="l-settings__row">
              <SettingsGroup type="single">
                <label htmlFor="discipline">Disciplina</label>
                <input
                  type="text"
                  defaultValue={user.discipline ?? ""}
                  id="discipline"
                  name="discipline"
                  className="input"
                  placeholder="Selecciona tu disciplina"
                />
              </SettingsGroup>
            </div>

            <div className="l-settings__row">
              <SettingsGroup>
                <label htmlFor="discipline">Descripcion</label>
                <textarea
                  name="description"
                  id="description"
                  cols={30}
                  rows={3}
                  defaultValue={user.description ?? ""}
                  className="input"
                  placeholder="Escribe una descripcion breve"
                />
              </SettingsGroup>
            </div>
          </div>
        </>
      )}

      <div className="l-settings__submit">
        <SettingsButton
          className={clsx(pending && "loading")}
        >
          {pending ? "Guardando..." : "Guardar cambios"}
        </SettingsButton>
      </div>
    </form>
  );
}

export default UserSettings