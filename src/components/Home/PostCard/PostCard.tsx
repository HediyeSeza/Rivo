import { Link } from "react-router-dom";
import Icon from "../../common/Icon/Icon";
import Avatar from "../../common/Avatar/Avatar";

import avatarImage from "../../../assets/Avatar/a.png";

interface PostCardProps {
  name: string;
  username: string;
  createdAt: string;
  content: string;
  likes?: number;
  comments?: number;
  avatar?: string;

  showDelete?: boolean;
  onDelete?: () => void;

  isLiked?: boolean;

  showUnlike?: boolean;
  onUnlike?: () => void;
}

const formatPostTime = (createdAt: string) => {
  const postDate = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${
      diffInMinutes === 1 ? "minute" : "minutes"
    } ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} ${
      diffInHours === 1 ? "hour" : "hours"
    } ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays} ${
      diffInDays === 1 ? "day" : "days"
    } ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${
      diffInWeeks === 1 ? "week" : "weeks"
    } ago`;
  }

  return postDate.toLocaleDateString();
};

const PostCard = ({
  name,
  username,
  createdAt,
  content,
  likes = 0,
  comments = 0,
  avatar,

  showDelete = false,
  onDelete,

  isLiked = false,

  showUnlike = false,
  onUnlike,
}: PostCardProps) => {
  return (
    <article
      className="
        w-full
        rounded-xl
        border border-[#E5E5E5]
      bg-white
        p-5
        shadow-sm
      dark:border-[#313131]
      dark:bg-[#191919]
        bg-(--color-card)]
        text-(--color-content-primary)]
        transition-colors
        duration-200
       
      "
    >
      {/* Post Header */}
      <div className="flex items-center gap-3">
        <Avatar src={avatar || avatarImage} alt={`${name} avatar`} size={40} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h3 className="text-[16px] font-bold leading-5 text-(--color-content-primary)]">
              {name}
            </h3>

            <Link
  to={`/profile/${username}`}
  className="
    cursor-pointer
    text-[14px]
    leading-5
    text-(--color-content-secondary)
    transition-colors
    duration-200
    hover:text-(--color-content-primary)
  "
>
  @{username}
</Link>

            <span className="text-[14px] leading-5 text-(--color-content-secondary)]">
              {formatPostTime(createdAt)}
            </span>
          </div>
        </div>
        {showDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete post"
            className="
        flex
        h-9
        w-9
        shrink-0
        cursor-pointer
        items-center
        justify-center
        rounded-lg
        transition-colors
        duration-200
        hover:bg-black/5
        dark:hover:bg-white/5
      "
          >
            <Icon name="Tash" size={20} />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="mt-3">
        <p
          className="
            whitespace-pre-wrap
            break-words
            text-[14px]
            leading-5
            text-(--color-content-primary)]
          "
        >
          {content}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2">
        {/* Like */}
        <button
          type="button"
          aria-label="Like post"
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
            dark:hover:bg-white/5
          "
        >
          <Icon name="Heart" size={18} />
          <span className="text-[14px]">{likes}</span>
        </button>

        {/* Comment */}
        <button
          type="button"
          aria-label="Comment on post"
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
            dark:hover:bg-white/5
          "
        >
          <Icon name="Chat" size={18} />
          <span className="text-[14px]">{comments}</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
