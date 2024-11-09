import ModalWindow from '@/app/_components/modalWindow';
import ProfileImageUpload from '@/app/_components/profileImageUpload';
import { useSettingsContext } from '@/app/_context/settingsContext';
import Image from 'next/image';
import { type FormEvent, useState } from 'react'

interface Props{
  photos: {
    profile: string;
    cover: string;
  },
}

const PhotosSettings: React.FC<Props> = ({ photos }) => {
  const [profileImg, setProfileImg] = useState(photos.profile)
  const [coverImg, setCoverImg] = useState(photos.cover)
  
  const [previewImg, setPreviewImg] = useState("")
  const [isOpenModal, setIsOpenModal] = useState(false)
  
  const { addPicture, deletePicture } = useSettingsContext()

  const handleOnClickOverlay = () => {
    setIsOpenModal(state => !state)
  }

  const onSelectNewProfile = (e: FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageURL = reader.result?.toString() ?? "";
      setPreviewImg(imageURL);
    });

    reader.readAsDataURL(file);
    setIsOpenModal(true)
  };

  const onDeleteProfile = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (profileImg.startsWith('/')) return

    setProfileImg("/img/default.jpg");
    deletePicture("/img/default.jpg", "profile");
    setIsOpenModal(false);
  };

  const onSelectNewCover = (e: FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageURL = reader.result?.toString() ?? "";

      setCoverImg(imageURL);
      addPicture(new Blob([file], {type: "image/jpeg"}), 'cover');
    });

    reader.readAsDataURL(file);
  }

  const onDeleteCover = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (coverImg.startsWith("/")) return

    setCoverImg("/img/default-cover.png");
    deletePicture("/img/default-cover.png", "cover");
    setIsOpenModal(false);
  };

  const handleCropImg = (cropedImg: string) => {
    setProfileImg(cropedImg)
    setIsOpenModal(false)
  }

  const handleCancelCrop = () => {
    setPreviewImg('')
    setIsOpenModal(false)
  }

  const addNewProfileImg = (blob: Blob) => addPicture(blob, "profile");

  return (
    <>
      <div className="user-settings-photo">
        <Image
          src={profileImg}
          alt="profile picture pŕeview"
          className="user-settings-photo__profile-img"
          width={126}
          height={126}
        />

        <div className="user-settings-photo__btns">
          <div>
            <button
              className="user-settings-photo__btn"
              onClick={onDeleteProfile}
              disabled={profileImg === "/img/default.jpg"}
            >
              Borrar foto
            </button>
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              name="selectProfile"
              id="selectProfile"
              className="user-settings-photo__upload-input"
              onChange={onSelectNewProfile}
            />
            <label
              htmlFor="selectProfile"
              className="user-settings-photo__upload-label"
            >
              Subir foto
            </label>
          </div>
        </div>
      </div>

      <ModalWindow
        isModalOpen={isOpenModal}
        onClickOverlay={handleOnClickOverlay}
      >
        {previewImg && (
          <ProfileImageUpload
            imgSrc={previewImg}
            onCropImg={handleCropImg}
            onCancel={handleCancelCrop}
            setUpdateProfileImg={addNewProfileImg}
          />
        )}
      </ModalWindow>

      <div className="user-settings-photo">
        <Image
          src={coverImg}
          alt="cover picture preview"
          className="user-settings-photo__cover-img"
          width={252}
          height={141}
        />

        <div className="user-settings-photo__btns">
          <div>
            <button
              className="user-settings-photo__btn"
              onClick={onDeleteCover}
              disabled={coverImg === "/img/default-cover.png"}
            >
              Borrar foto
            </button>
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              name="selectCover"
              id="selectCover"
              className="user-settings-photo__upload-input"
              onChange={onSelectNewCover}
            />
            
            <label
              htmlFor="selectCover"
              className="user-settings-photo__upload-label"
            >
              Subir foto
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotosSettings