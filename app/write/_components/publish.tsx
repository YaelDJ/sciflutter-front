import { useState } from "react";
import Image from "next/image";

import { publishDraft, uploadDraftImg } from "@/app/_actions/draftsActions";

import { WarningCircle } from "@phosphor-icons/react";

import { useAlertContext } from "@/app/_context/alertContext";

import { useCurrentDraft } from "./stepController"
import WriteButtons from "./writeButtons"

import "@/styles/components/publish-window.scss";

const Publish = () => {
  const { handleNextStep, handlePrevStep, currentDraft, updateCurrentDraftObj } = useCurrentDraft()
  const { setAlert } = useAlertContext(state => state)
  const [articleImg, setArticleImg] = useState(currentDraft?.image!)
  const [formData, setFormData] = useState(new FormData())
  const [isLoading, setIsLoading] = useState(false)

  const setUploadImage = (img: Blob) => {
    if (formData.has('image')) {
      formData.set('image', img, 'image')
    } else {
      formData.append('image', img, 'image')
    }
  }

  const handleDeleteImage = () => {
    if (formData.has("image")) {
      formData.set("image", '/img/default-article.png');
    } else {
      formData.append("image", '/img/default-article.png');
    }
  }

  const handleUploadImg = (e: React.FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageURL = reader.result?.toString() ?? "";

      setArticleImg(imageURL);
      setUploadImage(new Blob([file], { type: "image/jpeg" }))
    });

    reader.readAsDataURL(file);
  }

  const handleNext = async () => {
    // Check if a draft is requested and prevent to be requested twice
    if(currentDraft?.requested) return setAlert('warn', 'You cannot request two publishes of the same draft')
      
    setIsLoading(true)
    if (formData.has('name')) {
      formData.set('name', currentDraft?.name!)
    } else {
      formData.append('name', currentDraft?.name!)
    }
    
    const updateResponse = await uploadDraftImg(currentDraft?._id!, formData);

    setAlert(updateResponse.success ? 'success' : 'error', updateResponse.message);

    if (!updateResponse.success) return setIsLoading(false)

    updateCurrentDraftObj({ image: updateResponse.data.draft?.image })

    const requestResponse = await publishDraft(currentDraft?._id!)

    setAlert(requestResponse.success ? 'success' : 'error', requestResponse.message);

    if (!requestResponse.success) return setIsLoading(false);

    updateCurrentDraftObj({ requested: true });
    handleNextStep()
    setIsLoading(false);
  }

  return (
    <>
      <div className="c-publish-window">
        <div className="c-publish-window__item">
          <p className="c-publish-window__heading">Select a image for preview card</p>

          <div className="c-publish-window__upload">
            <div className="c-publish-window__img-container">
              <Image
                src={articleImg}
                width={250}
                height={334}
                alt="Main image"
              />
            </div>

            <div className="c-publish-window__upload-file">
              <input
                type="file"
                name="articleImage"
                id="articleImage"
                onChange={handleUploadImg}
              />
              <label htmlFor="articleImage">Upload an image</label>
            </div>

            <button
              className="c-publish-window__delete"
              onClick={handleDeleteImage}
            >
              Delete image
            </button>
          </div>
        </div>

        <div className="c-publish-window__message">
          <p className="c-publish-window__heading"><WarningCircle size={24}/> NOTE</p>

          <p>
            If everything it&apos;s okay you can request the publish of your
            article by clicking <strong>request</strong>.
          </p>
          <p>
            Remember that once requested the publish you cannot edit the draft
            sent or the article if is published. If your article is accepted to be
            published the draft will be removed from your list of drafts, this
            is to prevent different articles from relying on the same images and
            information.
          </p>
        </div>

        <button className="c-publish-window__publish" onClick={handleNext}>{isLoading ? 'Loading...' : 'Request publish'}</button>
      </div>

      <WriteButtons
        handleNextStep={handleNext}
        handlePrevStep={handlePrevStep}
      />
    </>
  );
}

export default Publish