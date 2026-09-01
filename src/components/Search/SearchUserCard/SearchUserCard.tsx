import { useEffect, useState } from "react";

import type { User } from "../../../types/user";

import { toggleFollowUser } from "../../../services/userApi";

interface SearchUserCardProps {
  user: User;
  initialFollowing?: boolean;
}

const SearchUserCard = ({
  user,
  initialFollowing = false,
}: SearchUserCardProps) => {
  const [isFollowing, setIsFollowing] =
    useState(initialFollowing);

  const [isLoading, setIsLoading] =
    useState(false);

  const [imageError, setImageError] =
    useState(false);

  // Sync the local state when the parent
  // provides a new following status.
  useEffect(() => {
    setIsFollowing(initialFollowing);
  }, [initialFollowing]);

  const handleFollow = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const response =
        await toggleFollowUser(user.id);

      if (!response.success) {
        return;
      }

      setIsFollowing(
        (current) => !current,
      );
    } catch (error) {
      console.error(
        "Failed to follow user:",
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showImage =
    Boolean(user.image) && !imageError;

  return (
    <article
      className="
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-background-secondary)]
        px-5
        py-4
        transition-colors
        duration-200
      "
    >
      {/* Avatar */}
      <div className="shrink-0">
        {showImage ? (
          <img
            src={user.image ?? undefined}
            alt={user.name}
            onError={() =>
              setImageError(true)
            }
            className="
              h-14
              w-14
              rounded-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[var(--color-background-tertiary)]
              text-[18px]
              font-semibold
              text-[var(--color-content-primary)]
            "
          >
            {user.name
              .charAt(0)
              .toUpperCase()}
          </div>
        )}
      </div>

      {/* User information */}
      <div className="min-w-0 flex-1">
        <h3
          className="
            truncate
            text-[16px]
            font-semibold
            text-[var(--color-content-primary)]
          "
        >
          {user.name}
        </h3>

        {user.bio && (
          <p
            className="
              mt-1
              truncate
              text-[14px]
              text-[var(--color-content-secondary)]
            "
          >
            {user.bio}
          </p>
        )}
      </div>

      {/* Follow */}
      <button
        type="button"
        onClick={handleFollow}
        disabled={isLoading}
        className={`
          shrink-0
          cursor-pointer
          rounded-lg
          px-5
          py-2
          text-[14px]
          font-medium
          transition
          duration-200
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${
            isFollowing
              ? `
                border
                border-[var(--color-border)]
                bg-transparent
                text-[var(--color-content-primary)]
                hover:bg-black/5
                dark:hover:bg-white/5
              `
              : `
                bg-black
                text-white
                hover:bg-black/80
                dark:bg-white
                dark:text-black
                dark:hover:bg-white/80
              `
          }
        `}
      >
        {isLoading
          ? "..."
          : isFollowing
            ? "Following"
            : "Follow"}
      </button>

      {/* More */}
      <button
        type="button"
        aria-label="More options"
        className="
          flex
          h-9
          w-9
          shrink-0
          cursor-pointer
          items-center
          justify-center
          rounded-full
          text-[var(--color-content-secondary)]
          transition
          hover:bg-black/5
          dark:hover:bg-white/5
        "
      >
        <span className="text-[20px] leading-none">
          ⋮
        </span>
      </button>
    </article>
  );
};

export default SearchUserCard;