import PhotosSettingsSkeleton from "./photosSettingsSkeleton";

import "@/styles/skeletons/settings.scss";

const UserSettingsSkeleton: React.FC = () => {
  return (
    <div className="s-settings__container">
      <p className="s-settings__heading">User</p>

      <div className="s-settings__content">
        <div className="s-settings__group">
          <p className="s-settings__title">Fotos</p>

          <div className="s-settings__photos">
            <PhotosSettingsSkeleton />
          </div>
        </div>

        <div className="s-settings__row">
          <div className="s-settings__group">
            <p className="s-settings__title">Nombre</p>
            <div className="s-settings__input">Nombre</div>
          </div>

          <div className="s-settings__group">
            <p className="s-settings__title">Apellido</p>
            <div className="s-settings__input">Apellida</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsSkeleton