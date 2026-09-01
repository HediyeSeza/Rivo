import { Link } from "react-router-dom";
import { useState } from "react";

import Icon from "../../common/Icon/Icon";
import Avatar from "../../common/Avatar/Avatar";
import LikeButton from "../../common/Selection/LikeButton/LikeButton";
import EditableContent from "../../common/EditableContent/EditableContent";

import avatarImage from "../../../assets/Avatar/a.png";

import {
  type PostComment,
  updatePost,
} from "../../../services/postApi";

import Comments from "./Comments/Comments";

const CDN_BASE = "https://1p5nep1spk.ucarecd.net";

interface PostCardProps {
  postId: string;
  authorId: string;
  name: string;
  username: string;
  createdAt: string;
  content: string;
  image?: string | null;
  likes?: number;
  comments?: number;
  avatar?: string;

  likesData: {
    userId: string;
  }[];

  commentsData: PostComment[];

  onLikeMessage?: (message: string) => void;
  onLikeChange?: (postId: string, isLiked: boolean) => void;

  onCommentAdded?: (
    postId: string,
  ) => void | Promise<void>;

  onCommentMessage?: (message: string) => void;

  showDelete?: boolean;
  onDelete?: () => void;

  showEdit?: boolean;
  onPostUpdated?: (
    postId: string,
  ) => void | Promise<void>;
}

/* =========================================
   Post Time
========================================= */

const formatPostTime = (createdAt: string) => {
  const postDate = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(
    diffInSeconds / 60,
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${
      diffInMinutes === 1 ? "minute" : "minutes"
    } ago`;
  }

  const diffInHours = Math.floor(
    diffInMinutes / 60,
  );

  if (diffInHours < 24) {
    return `${diffInHours} ${
      diffInHours === 1 ? "hour" : "hours"
    } ago`;
  }

  const diffInDays = Math.floor(
    diffInHours / 24,
  );

  if (diffInDays < 7) {
    return `${diffInDays} ${
      diffInDays === 1 ? "day" : "days"
    } ago`;
  }

  const diffInWeeks = Math.floor(
    diffInDays / 7,
  );

  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${
      diffInWeeks === 1 ? "week" : "weeks"
    } ago`;
  }

  return postDate.toLocaleDateString();
};

/* =========================================
   Resolve Post Image URL
========================================= */

const resolvePostImageUrl = (
  image?: string | null,
) => {
  if (!image) {
    return undefined;
  }

  const value = image.trim();

  if (!value) {
    return undefined;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("blob:") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  const uuid = value.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  )?.[0];

  if (uuid) {
    return `${CDN_BASE}/${uuid}/`;
  }

  if (value.startsWith("/")) {
    return value;
  }

  return value;
};

/* =========================================
   Post Card
========================================= */

const PostCard = ({
  postId,
  authorId,
  name,
  username,
  createdAt,
  content,
  image,
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
  showEdit = false,
  onPostUpdated,
}: PostCardProps) => {
  const [showComments, setShowComments] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const postImageUrl =
    resolvePostImageUrl(image);

  /* =========================================
     Update Post
  ========================================= */

  const handleUpdatePost = async (
    newContent: string,
  ) => {
    try {
      const response = await updatePost(
        postId,
        {
          content: newContent,
        },
      );

      if (!response.success) {
        return {
          success: false,
          message:
            response.message ||
            "Failed to update post.",
        };
      }

      setIsEditing(false);

      await onPostUpdated?.(postId);

      return {
        success: true,
        message:
          response.message ||
          "Post updated successfully.",
      };
    } catch (error) {
      console.error(
        "Failed to update post:",
        error,
      );

      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update post.",
      };
    }
  };

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
        text-[var(--color-content-primary)]
        dark:border-[#313131]
        dark:bg-[#191919]
      "
    >
      {/* =========================================
          Post Header
      ========================================= */}

      <div className="flex items-center gap-3">
        <Link
          to={`/profile/${authorId}`}
          className="
            shrink-0
            cursor-pointer
            rounded-full
            transition-opacity
            duration-200
            hover:opacity-80
          "
          aria-label={`View ${name}'s profile`}
        >
          <Avatar
            src={avatar || avatarImage}
            alt={`${name} avatar`}
            size={40}
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-0.5
            "
          >
            <Link
              to={`/profile/${authorId}`}
              className="
                cursor-pointer
                text-[16px]
                font-bold
                leading-5
                text-[var(--color-content-primary)]
                transition-opacity
                duration-200
                hover:opacity-70
              "
            >
              {name}
            </Link>

            <Link
              to={`/profile/${authorId}`}
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

        {/* =========================================
            Edit + Delete
        ========================================= */}

        {(showEdit || showDelete) && !isEditing && (
          <div className="flex items-center gap-1">
            {showEdit && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                aria-label="Edit post"
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
                <Icon
                  name="EditComment"
                  size={18}
                />
              </button>
            )}

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
                <Icon
                  name="Tash"
                  size={20}
                />
              </button>
            )}
          </div>
        )}
      </div>

      {/* =========================================
          Post Content
      ========================================= */}

      <div className="mt-3">
        {isEditing ? (
          <>
            <EditableContent
              initialContent={content}
              onSave={handleUpdatePost}
              onCancel={() => setIsEditing(false)}
              rows={3}
              saveLabel="Save"
              savingLabel="Saving..."
            />

            {postImageUrl && (
              <div
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-background)]
                "
              >
                <img
                  src={postImageUrl}
                  alt="Post image"
                  loading="lazy"
                  className="
                    block
                    max-h-[520px]
                    w-full
                    object-contain
                  "
                />
              </div>
            )}
          </>
        ) : (
          <>
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

            {postImageUrl && (
              <div
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-background)]
                "
              >
                <img
                  src={postImageUrl}
                  alt="Post image"
                  loading="lazy"
                  className="
                    block
                    max-h-[520px]
                    w-full
                    object-contain
                  "
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* =========================================
          Actions
      ========================================= */}

      {!isEditing && (
        <div className="mt-3 flex items-center gap-2">
          <LikeButton
            postId={postId}
            likes={likesData}
            likesCount={likes}
            onMessage={onLikeMessage}
            onLikeChange={onLikeChange}
          />

          <button
            type="button"
            aria-label={
              showComments
                ? "Hide comments"
                : "Show comments"
            }
            onClick={() =>
              setShowComments(
                (prev) => !prev,
              )
            }
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
              ${
                showComments
                  ? "bg-black/5 dark:bg-white/5"
                  : ""
              }
            `}
          >
            <Icon
              name={
                showComments
                  ? "ChatFill"
                  : "Chat"
              }
              size={18}
            />

            <span className="text-[14px]">
              {comments}
            </span>
          </button>
        </div>
      )}

      {/* =========================================
          Comments
      ========================================= */}

      {!isEditing &&
        showComments && (
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
              onCommentAdded={
                onCommentAdded ??
                (() => {})
              }
              onMessage={onCommentMessage}
            />
          </div>
        )}
    </article>
  );
};

export default PostCard;