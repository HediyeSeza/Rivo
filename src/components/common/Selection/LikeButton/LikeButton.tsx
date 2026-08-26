import { useState } from "react";

import Icon from "../../Icon/Icon";
import { toggleLikePost } from "../../../../services/postApi";
import { useAuth } from "../../../../context/AuthContext";

interface LikeButtonProps {
  postId: string;
  likes: {
    userId: string;
  }[];
  likesCount: number;
  onMessage?: (message: string) => void;
}

const LikeButton = ({
  postId,
  likes,
  likesCount,
  onMessage,
}: LikeButtonProps) => {
  const { user } = useAuth();

  // مقدار واقعی که از پراپ‌ها (دیتای بک‌اند) محاسبه می‌شه
  const derivedIsLiked =
    !!user && likes.some((like) => like.userId === user.id);

  // این state فقط برای override موقت بعد از کلیک خود کاربره
  const [likeOverride, setLikeOverride] = useState<boolean | null>(null);
  const [prevLikes, setPrevLikes] = useState(likes);

  // اگه پراپ likes عوض شد (یعنی دیتای تازه از بک‌اند اومد)، override رو ریست کن
  if (likes !== prevLikes) {
    setPrevLikes(likes);
    setLikeOverride(null);
  }

  const isLiked = likeOverride ?? derivedIsLiked;

  const [count, setCount] = useState(likesCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!user || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await toggleLikePost(postId);

      // Backend response:
      // {
      //   message: "...",
      //   success: true/false
      // }

      onMessage?.(response.message);

      if (!response.success) {
        return;
      }

      const liked = response.message === "Post liked successfully";

      setLikeOverride(liked);

      setCount((currentCount) =>
        liked ? currentCount + 1 : Math.max(0, currentCount - 1),
      );
    } catch (error) {
      console.error("Failed to like/unlike post:", error);

      if (error instanceof Error) {
        onMessage?.(error.message);
      } else {
        onMessage?.("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log({
    postId,
    userId: user?.id,
    likesUserIds: likes.map((l) => l.userId),
    derivedIsLiked,
    likeOverride,
    finalIsLiked: isLiked,
  });

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={!user || isLoading}
      aria-label={isLiked ? "Unlike post" : "Like post"}
      className="
        flex
        cursor-pointer
        items-center
        gap-2
        rounded-lg
        px-2
        py-1
        text-[var(--color-content-secondary)]
        transition-colors
        duration-200
        hover:bg-black/5
        disabled:cursor-not-allowed
        disabled:opacity-50
        dark:hover:bg-white/5
      "
    >
      <Icon name={isLiked ? "HeartFill" : "Heart"} size={18} />

      <span className="text-[14px]">{count}</span>
    </button>
  );
};

export default LikeButton;
