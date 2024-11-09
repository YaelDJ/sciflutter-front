"use client"
import clsx from "clsx";

import { saveArticle, unsaveArticle } from "@/app/_actions/featuresActions";

import { useAlertContext } from "@/app/_context/alertContext";
import { useSavesContext } from "@/app/_context/savesContext";

import { BookmarkSimple } from "@phosphor-icons/react";

interface Props{
  articleId: string
}

const ArticleSave: React.FC<Props> = ({ articleId }) => {
  const setAlert = useAlertContext(state => state.setAlert)
  const { saves, addSave, removeSave } = useSavesContext(state => state)

  const isSaved = saves.includes(articleId)

  const handleClick = async () => {
    let apiResponse;
    if (!isSaved) {
      apiResponse = await saveArticle(articleId)

      if (apiResponse.success) addSave(articleId)
    }
    else {
      apiResponse = await unsaveArticle(articleId)

      if (apiResponse.success) removeSave(articleId)
    };

    setAlert(apiResponse.success ? "success" : "error", apiResponse.message);
  };

  return (
    <button className={clsx("c-article-options__option", isSaved && "is-fill")} onClick={handleClick}>
      {isSaved ? "Unsave" : "Save"}{" "}
      <BookmarkSimple
        size={32}
        className="article-option__icon"
        weight={isSaved ? "fill" : "regular"}
      />
    </button>
  );
}

export default ArticleSave