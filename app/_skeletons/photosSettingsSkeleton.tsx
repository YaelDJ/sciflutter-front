import "@/styles/skeletons/settings-photo.scss";

const PhotosSettingsSkeleton: React.FC = () => {
  return (
    <>
      <div className="s-settings-photo">
        <div className="s-settings-photo__profile-img"></div>

        <div>
          <p className="s-settings-photo__label">Subir foto</p>
        </div>
      </div>

      <div className="s-settings-photo">
        <div className="s-settings-photo__cover-img"></div>

        <div>
          <p className="s-settings-photo__label">Subir foto</p>
        </div>
      </div>
    </>
  );
};

export default PhotosSettingsSkeleton;
