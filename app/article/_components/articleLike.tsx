"use client"
import { likeArticle, unlikeArticle } from "@/app/_actions/featuresActions";
import { Heart } from "@phosphor-icons/react"
import clsx from "clsx";
import { useState } from "react";

interface Props{
  articleId: string,
  liked: boolean
}

const ArticleLike: React.FC<Props> = ({ articleId, liked }) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked)

  const onLike = async () => {
    const apiResponse = await likeArticle(articleId);

    if (!apiResponse.success) return;

    setIsLiked(true);
  };

  const onUnlike = async () => {
    const apiResponse = await unlikeArticle(articleId);

    if (!apiResponse.success) return;

    setIsLiked(false);
  };

  const handleLikeButton = async () => {
    if (isLiked) await onUnlike();
    else await onLike();
  };

  return (
    <button className={clsx("c-article-options__option", isLiked && "is-fill")} onClick={handleLikeButton}>
      {isLiked ? "Unlike" : "Like"} <Heart size={32} className="article-option__icon" weight={isLiked ? "fill" : "regular"} />
    </button>
  )
}

export default ArticleLike