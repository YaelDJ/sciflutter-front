"use client"

import { BookmarkSimple } from "@phosphor-icons/react"
import { saveArticle, unsaveArticle } from "../_actions/featuresActions"
import { useSavesContext } from "../_context/savesContext"
import { useAlertContext } from "../_context/alertContext"

interface Props {
  articleId: string
}

const BookmarkCard: React.FC<Props> = ({ articleId }) => {
  const { saves, removeSave, addSave } = useSavesContext(state => state)
  const { setAlert } = useAlertContext(state => state)
  const isSaved = saves.includes(articleId)
  
  if (!saves) return (
    <button className="c-article-preview__bookmark">
      <BookmarkSimple
        size={40}
        className="c-article-preview__icon"
      />
    </button>
  );

  const handleClick = async () => {
    let apiResponse;
    if (!isSaved) {
      apiResponse = await saveArticle(articleId)

      if(apiResponse.success) addSave(articleId)
    }
    else {
      apiResponse = await unsaveArticle(articleId)
      if (apiResponse.success) removeSave(articleId)
    };

    setAlert(apiResponse.success ? "success" : "error", apiResponse.message);
  }

  return (
    <button className="c-article-preview__bookmark">
      <BookmarkSimple
        size={40}
        className="c-article-preview__icon"
        onClick={handleClick}
        weight={isSaved ? "fill" : "regular"}
      />
    </button>
  );
}

export default BookmarkCard