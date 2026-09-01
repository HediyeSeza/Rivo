import { useEffect, useState } from "react";

import Button from "../../common/Button/Button";

import { toggleFollowUser } from "../../../services/userApi";

interface FollowUserButtonProps {
  userId: string;
  initialFollowing?: boolean;
  isFollower?: boolean;
  disabled?: boolean;
  onFollowChange?: (
    userId: string,
    isFollowing: boolean,
  ) => void;
}

const FollowUserButton = ({
  userId,
  initialFollowing = false,
  isFollower = false,
  disabled = false,
  onFollowChange,
}: FollowUserButtonProps) => {
  const [isFollowing, setIsFollowing] =
    useState(initialFollowing);

  const [isLoading, setIsLoading] =
    useState(false);

  // Sync local state whenever the parent
  // provides a new follow status.
  useEffect(() => {
    setIsFollowing(initialFollowing);
  }, [initialFollowing]);

  const handleToggleFollow = async () => {
    if (isLoading || disabled) {
      return;
    }

    try {
      setIsLoading(true);

      const response =
        await toggleFollowUser(userId);

      if (!response.success) {
        return;
      }

      const nextFollowing =
        !isFollowing;

      setIsFollowing(nextFollowing);

      onFollowChange?.(
        userId,
        nextFollowing,
      );
    } catch (error) {
      console.error(
        "Failed to toggle follow:",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled =
    isLoading || disabled;

  return (
    <Button
      type="button"
      variant={
        isFollowing
          ? "secondary"
          : "primary"
      }
      onClick={handleToggleFollow}
      disabled={isButtonDisabled}
      className="
        w-full
        min-w-[88px]
        shrink-0
      "
    >
      <span
        className="
          text-[13px]
          font-semibold
        "
      >
        {isLoading
          ? "..."
          : isFollowing
            ? "Following"
            : isFollower
              ? "Follow back"
              : "Follow"}
      </span>
    </Button>
  );
};

export default FollowUserButton;