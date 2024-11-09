"use client"

import { followAuthor, unfollowAuthor } from "@/app/_actions/featuresActions";
import { useUserContext } from "@/app/_context/userContext";
import { UserMinus, UserPlus } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";

interface Props{
  authorId: string,
  follow: boolean
}

const ArticleFollow: React.FC<Props> = ({ authorId, follow }) => {
  const [isFollow, setIsFollow] = useState<boolean>(follow);
  const currentUser = useUserContext(state => state.user);

  if (currentUser?._id === authorId) return null;

  const onFollow = async () => {
    const apiResponse = await followAuthor(authorId);

    if (!apiResponse.success) return;

    setIsFollow(true);
  };

  const onUnfollow = async () => {
    const apiResponse = await unfollowAuthor(authorId);

    if (!apiResponse.success) return;

    setIsFollow(false);
  };

  const handleFollowButton = async () => {
    if (isFollow) await onUnfollow();
    else await onFollow();
  };
  
  return (
    <button className={clsx("c-article-options__option", isFollow && "is-fill")} onClick={handleFollowButton}>
      {isFollow ? "Unfollow author" : "Follow author"} {isFollow ? <UserMinus size={32}/> : <UserPlus size={32} />}
    </button>
  );
}

export default ArticleFollow