import { useState } from "react";

import Button from "../../common/Button/Button";

import { toggleFollowUser } from "../../../services/userApi";

interface FollowUserButtonProps {
  userId: string;
  initialFollowing?: boolean;
  onFollowChange?: (
    userId: string,
    isFollowing: boolean,
  ) => void;
}

const FollowUserButton = ({
  userId,
  initialFollowing = false,
  onFollowChange,
}: FollowUserButtonProps) => {
  const [isFollowing, setIsFollowing] =
    useState(initialFollowing);

  const [isLoading, setIsLoading] =
    useState(false);

  const handleToggleFollow = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const response =
        await toggleFollowUser(userId);

      if (!response.success) {
        return;
      }

      const nextFollowing = !isFollowing;

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

  return (
    <Button
      type="button"
      variant={
        isFollowing
          ? "secondary"
          : "primary"
      }
      onClick={handleToggleFollow}
      disabled={isLoading}
      className="
        min-w-[88px]
        shrink-0
      "
    >
      <span className="text-[13px] font-semibold">
        {isLoading
          ? "..."
          : isFollowing
            ? "Following"
            : "Follow"}
      </span>
    </Button>
  );
};

export default FollowUserButton;