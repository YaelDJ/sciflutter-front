"use client"
import { useState, type ButtonHTMLAttributes, type FC } from "react";
import type { BaseComponent } from "../_interfaces/components";
import { useRouter } from "next/navigation";
import { useAlertContext } from "../_context/alertContext";
import { signout } from "../_actions/authActions";
import { followAuthor, unfollowAuthor } from "../_actions/featuresActions";

interface LogoutProps extends ButtonHTMLAttributes<HTMLButtonElement>{ 
  onClick?: () => void
}

export const Logout: FC<BaseComponent & LogoutProps> = ({ children, onClick, ...props }) => {
  const { setAlert } = useAlertContext(state => state)
  const { refresh } = useRouter();

  const handleSignOut = () => {
    signout();
    setAlert("success", "Sesión cerrada.");
    onClick?.()
    refresh();
  };

  return (
    <button onClick={handleSignOut} {...props}>
      {children}
    </button>
  )
}

interface FollowProps{
  follow: boolean;
  userId: string
}

export const Follow: FC<FollowProps> = ({ follow, userId }) => {
  const [isFollow, setIsFollow] = useState<boolean>(follow);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFollow = async () => {
    const apiResponse = await followAuthor(userId);

    if (!apiResponse.success) return;

    setIsFollow(true);
  };

  const onUnfollow = async () => {
    const apiResponse = await unfollowAuthor(userId);

    if (!apiResponse.success) return;

    setIsFollow(false);
  };

  const handleFollowButton = async () => {
    setIsLoading(true)
    if (isFollow) await onUnfollow();
    else await onFollow();
    setIsLoading(false);
  };

  return (
    <button
      data-style={isFollow ? "secondary" : "primary"}
      onClick={handleFollowButton}
    >
      {isLoading ?
        <span>Loading...</span> :
        <span>{isFollow ? "Dejar de seguir" : "Seguir"}</span>
      }
    </button>
  );
}

interface TopProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export const BackToTop: FC<TopProps> = ({children, ...props}) => {
  const handleClick = () => {
    scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
