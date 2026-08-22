import { useState } from "react";

import Button from "../common/Button/Button";
import { toggleFollowUser } from "../../services/userApi";

interface FollowButtonProps {
  userId: string;
  initialFollowing?: boolean;
  onFollowSuccess?: () => Promise<void> | void;
}

const FollowButton = ({
  userId,
  initialFollowing = false,
  onFollowSuccess,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const handleToggleFollow = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await toggleFollowUser(userId);

      setIsFollowing((current) => !current);

      onFollowSuccess?.();
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      className="shrink-0"
      onClick={handleToggleFollow}
      disabled={loading}
    >
      <span className="text-[14px] font-bold">
        {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
      </span>
    </Button>
  );
};

export default FollowButton;
