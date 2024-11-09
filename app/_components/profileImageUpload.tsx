"use client"
import React, { useRef, useState } from 'react'
import ReactCrop, { Crop, PercentCrop, PixelCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'

import Image from 'next/image';

import ModalBox from './modalBox';
import ModalHeader from './modalHeader';
import ModalButtons from './modalButtons';

import "react-image-crop/dist/ReactCrop.css";
import '@/styles/components/crop-image.scss'

interface Props{
  imgSrc: any,
  onCropImg: (cropedImg: any) => void
  onCancel(): void,
  setUpdateProfileImg(blob: Blob): void
}

const setCanvasPreview = (
  image: HTMLImageElement, // HTMLImageElement
  canvas: HTMLCanvasElement, // HTMLCanvasElement
  crop: PixelCrop // PixelCrop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

const ProfileImageUpload: React.FC<Props> = ({ imgSrc, onCropImg, onCancel, setUpdateProfileImg }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [crop, setCrop] = useState<Crop>()

  const onImageLoad = (e: React.FormEvent<HTMLImageElement>) => {
    const { clientWidth: width, clientHeight: height } = e.currentTarget;

    const crop = makeAspectCrop(
      {
        unit: "%",
        height: 100,
      },
      1,
      width,
      height
    );

    const centeredCrop = centerCrop(crop, width, height);

    setCrop(centeredCrop);
  };

  const handleCropImage = () => {
    if (!imgRef.current || !previewCanvasRef.current || !crop) return;

    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current?.width, imgRef.current?.height)
    );

    const dataUrl = previewCanvasRef.current?.toDataURL("image/jpeg", 0.8);

    //Set the crop image on the settings profile image
    onCropImg(dataUrl);

    //Get the crop image from the canvas and convert it to a blob
    previewCanvasRef.current?.toBlob(
      (blob) => {
        if (blob) {
          setUpdateProfileImg(blob);
        }
      },
      "image/jpeg",
      0.9
    );
  };

  return (
    <ModalBox>
      <ModalHeader onCancel={onCancel} title="Prepara tu foto" />

      <div>
        <ReactCrop
          crop={crop}
          circularCrop
          keepSelection
          aspect={1}
          onChange={(pixelCrop: PixelCrop, percentCrop: PercentCrop) =>
            setCrop(percentCrop)
          }
        >
          <Image
            src={imgSrc}
            alt="image preview"
            onLoad={onImageLoad}
            ref={imgRef}
            className="crop-image__preview"
            width={800}
            height={420}
            style={{
              width: "auto",
              maxHeight: "100%",
            }}
          />
        </ReactCrop>

        {crop && (
          <canvas
            style={{
              width: 300,
              height: 300,
              display: "none",
              objectFit: "cover",
            }}
            ref={previewCanvasRef}
          />
        )}
      </div>

      <ModalButtons onAccept={handleCropImage} onCancel={onCancel} acceptText='Cortar foto'/>
    </ModalBox>
  );
}

export default ProfileImageUpload