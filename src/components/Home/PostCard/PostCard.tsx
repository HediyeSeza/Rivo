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
}

const formatPostTime = (createdAt: string) => {
  const postDate = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
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
}: PostCardProps) => {
  return (
    <article
      className="
        w-full
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-card)]
        p-6
        text-[var(--color-content-primary)]
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
        transition-colors
        duration-200
        dark:shadow-[0_2px_10px_rgba(0,0,0,0.25)]
      "
    >
      {/* Post Header */}
      <div className="flex cursor-pointer items-center gap-3">
        <Avatar
          src={avatar || avatarImage}
          alt={`${name} avatar`}
          size={40}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-bold text-[var(--color-content-primary)]">
              {name}
            </h3>

            <span className="text-[14px] text-[var(--color-content-secondary)]">
              @{username}
            </span>

            <span className="text-[14px] text-[var(--color-content-secondary)]">
              {formatPostTime(createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-2">
        <p
          className="
            whitespace-pre-wrap
            break-words
            text-[14px]
            leading-6
            text-[var(--color-content-primary)]
          "
        >
          {content}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-5">
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
            px-3
            py-2
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
            px-3
            py-2
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