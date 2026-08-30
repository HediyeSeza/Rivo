import { Link } from "react-router-dom";
import { useState } from "react";

import Icon from "../../common/Icon/Icon";
import Avatar from "../../common/Avatar/Avatar";

import LikeButton from "../../common/Selection/LikeButton/LikeButton";

import avatarImage from "../../../assets/Avatar/a.png";

import { type PostComment } from "../../../services/postApi";

import Comments from "./Comments/Comments";

interface PostCardProps {
  postId: string;

  name: string;
  username: string;
  createdAt: string;
  content: string;

  likes?: number;
  comments?: number;
  avatar?: string;

  likesData: {
    userId: string;
  }[];

  commentsData: PostComment[];

  onLikeMessage?: (message: string) => void;
  onLikeChange?: (postId: string, isLiked: boolean) => void;

  onCommentAdded?: (postId: string) => void | Promise<void>;
  onCommentMessage?: (message: string) => void;

  showDelete?: boolean;
  onDelete?: () => void;
}

const formatPostTime = (createdAt: string) => {
  const postDate = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  }

  return postDate.toLocaleDateString();
};

const PostCard = ({
  postId,
  name,
  username,
  createdAt,
  content,
  likes = 0,
  comments = 0,
  avatar,
  likesData,
  commentsData,
  onLikeMessage,
  onLikeChange,
  onCommentAdded,
  onCommentMessage,
  showDelete = false,
  onDelete,
}: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <article
      className="
        w-full
        rounded-xl
        border
        border-[#E5E5E5]
        bg-white
        p-5
        shadow-sm
        dark:border-[#313131]
        dark:bg-[#191919]
        text-[var(--color-content-primary)]
      "
    >
      {/* Post Header */}
      <div className="flex items-center gap-3">
        <Avatar src={avatar || avatarImage} alt={`${name} avatar`} size={40} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h3
              className="
                text-[16px]
                font-bold
                leading-5
                text-[var(--color-content-primary)]
              "
            >
              {name}
            </h3>

            <Link
              to={`/profile/${username}`}
              className="
                cursor-pointer
                text-[12px]
                leading-5
                !text-[var(--color-content-muted)]
                transition-colors
                duration-200
                hover:text-[var(--color-content-primary)]
              "
            >
              @{username}
            </Link>

            <span
              className="
                text-[12px]
                leading-5
                text-[var(--color-content-muted)]
              "
            >
              {formatPostTime(createdAt)}
            </span>
          </div>
        </div>

        {/* Delete */}
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
            text-[var(--color-content-primary)]
          "
        >
          {content}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2">
        {/* Like */}
        <LikeButton
          postId={postId}
          likes={likesData}
          likesCount={likes}
          onMessage={onLikeMessage}
          onLikeChange={onLikeChange}
        />

        {/* Comment */}
        <button
          type="button"
          aria-label={showComments ? "Hide comments" : "Show comments"}
          onClick={() => setShowComments((prev) => !prev)}
          className={`
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
            ${showComments ? "bg-black/5 dark:bg-white/5" : ""}
          `}
        >
          <Icon name={showComments ? "ChatFill" : "Chat"} size={18} />

          <span className="text-[14px]">{comments}</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div
          className="
            mt-4
            border-t
            border-[var(--color-border)]
            pt-4
          "
        >
          <Comments
            postId={postId}
            comments={commentsData}
            onCommentAdded={onCommentAdded ?? (() => {})}
            onMessage={onCommentMessage}
          />
        </div>
      )}
    </article>
  );
};

export default PostCard;
