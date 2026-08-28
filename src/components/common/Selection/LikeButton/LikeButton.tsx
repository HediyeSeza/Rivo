import { useEffect, useState } from "react";

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

const LIKED_POSTS_KEY = "rivo_liked_posts";

const getLikedPosts = (userId: string): string[] => {
  try {
    const stored = localStorage.getItem(`${LIKED_POSTS_KEY}_${userId}`);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveLikedPosts = (userId: string, postIds: string[]) => {
  localStorage.setItem(`${LIKED_POSTS_KEY}_${userId}`, JSON.stringify(postIds));
};

const LikeButton = ({
  postId,
  likes,
  likesCount,
  onMessage,
}: LikeButtonProps) => {
  const { user } = useAuth();

  const [isLiked, setIsLiked] = useState(false);

  const [count, setCount] = useState(likesCount);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLiked(false);
      return;
    }

    /*
     * First check localStorage.
     * This keeps the UI state after refresh.
     */
    const likedPosts = getLikedPosts(user.id);

    const isStoredLiked = likedPosts.includes(postId);

    /*
     * If backend provides the user's like,
     * use that information as well.
     */
    const isBackendLiked = likes.some((like) => like.userId === user.id);

    setIsLiked(isStoredLiked || isBackendLiked);

    setCount(likesCount);
  }, [postId, user, likes, likesCount]);

  const handleLike = async () => {
    if (!user || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await toggleLikePost(postId);

      onMessage?.(response.message);

      if (!response.success) {
        return;
      }

      const liked = response.message === "Post liked successfully";

      const likedPosts = getLikedPosts(user.id);

      if (liked) {
        /*
         * Save this post as liked.
         */
        if (!likedPosts.includes(postId)) {
          likedPosts.push(postId);
        }

        saveLikedPosts(user.id, likedPosts);

        setIsLiked(true);

        setCount((currentCount) => currentCount + 1);
      } else {
        /*
         * Remove this post from liked posts.
         */
        const updatedLikedPosts = likedPosts.filter((id) => id !== postId);

        saveLikedPosts(user.id, updatedLikedPosts);

        setIsLiked(false);

        setCount((currentCount) => Math.max(0, currentCount - 1));
      }
    } catch (error) {
      console.error("Failed to like/unlike post:", error);

      onMessage?.(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

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
