import { useState } from "react";

import Avatar from "../../../common/Avatar/Avatar";

import Icon from "../../../common/Icon/Icon";

import avatarImage from "../../../../assets/Avatar/a.png";

import type { PostComment } from "../../../../services/postApi";

import ReplyInput from "./ReplyInput";

interface CommentItemProps {
  comment: PostComment;
}

const formatCommentTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(
    diffInSeconds / 60,
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${
      diffInMinutes === 1
        ? "minute"
        : "minutes"
    } ago`;
  }

  const diffInHours = Math.floor(
    diffInMinutes / 60,
  );

  if (diffInHours < 24) {
    return `${diffInHours} ${
      diffInHours === 1
        ? "hour"
        : "hours"
    } ago`;
  }

  const diffInDays = Math.floor(
    diffInHours / 24,
  );

  return `${diffInDays} ${
    diffInDays === 1
      ? "day"
      : "days"
  } ago`;
};

const CommentItem = ({
  comment,
}: CommentItemProps) => {
  const [isReplying, setIsReplying] =
    useState(false);

  const [replies, setReplies] = useState<
    {
      id: string;
      content: string;
    }[]
  >([]);

  const handleReply = (content: string) => {
    setReplies((currentReplies) => [
      ...currentReplies,
      {
        id: crypto.randomUUID(),
        content,
      },
    ]);

    setIsReplying(false);
  };

  return (
    <div className="w-full">
      {/* Main Comment */}
      <div className="flex items-start gap-3">
        <Avatar
          src={
            comment.author.image ||
            avatarImage
          }
          alt={`${comment.author.name} avatar`}
          size={36}
        />

        <div className="min-w-0 flex-1">
          {/* Comment Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                text-[14px]
                font-semibold
                text-[var(--color-content-primary)]
              "
            >
              {comment.author.name}
            </span>

            <span
              className="
                text-[12px]
                text-[var(--color-content-muted)]
              "
            >
              {formatCommentTime(
                comment.createdAt,
              )}
            </span>
          </div>

          {/* Comment Content */}
          <p
            className="
              mt-1
              break-words
              text-[14px]
              leading-5
              text-[var(--color-content-primary)]
            "
          >
            {comment.content}
          </p>

          {/* Reply Button */}
          <button
            type="button"
            onClick={() =>
              setIsReplying(true)
            }
            aria-label="Reply to comment"
            className="
              mt-2
              inline-flex
              cursor-pointer
              items-center
              gap-2
              rounded-lg
              px-2
              py-1
              text-[13px]
              font-medium
              text-[var(--color-content-secondary)]
              transition-colors
              duration-200
              hover:bg-black/5
              hover:text-[var(--color-content-primary)]
              dark:hover:bg-white/5
            "
          >
            <Icon
              name="Reply"
              size={18}
            />

            <span>Reply</span>
          </button>

          {/* Reply Input */}
          {isReplying && (
            <ReplyInput
              onCancel={() =>
                setIsReplying(false)
              }
              onSubmit={handleReply}
            />
          )}

          {/* Replies */}
          {replies.length > 0 && (
            <div
              className="
                mt-4
                ml-6
                border-l
                border-[var(--color-border)]
                pl-4
              "
            >
              <div className="flex flex-col gap-4">
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    <Avatar
                      src={avatarImage}
                      alt="Your avatar"
                      size={32}
                    />

                    <div className="min-w-0 flex-1">
                      {/* Reply Header */}
                      <div className="flex items-center gap-2">
                        <span
                          className="
                            text-[14px]
                            font-semibold
                            text-[var(--color-content-primary)]
                          "
                        >
                          You
                        </span>

                        <span
                          className="
                            text-[12px]
                            text-[var(--color-content-muted)]
                          "
                        >
                          just now
                        </span>
                      </div>

                      {/* Reply Content */}
                      <p
                        className="
                          mt-1
                          break-words
                          text-[14px]
                          leading-5
                          text-[var(--color-content-primary)]
                        "
                      >
                        {reply.content}
                      </p>

                      {/* Reply Action */}
                      <button
                        type="button"
                        onClick={() =>
                          setIsReplying(true)
                        }
                        className="
                          mt-2
                          inline-flex
                          cursor-pointer
                          items-center
                          gap-2
                          rounded-lg
                          px-2
                          py-1
                          text-[12px]
                          font-medium
                          text-[var(--color-content-secondary)]
                          transition-colors
                          duration-200
                          hover:bg-black/5
                          hover:text-[var(--color-content-primary)]
                          dark:hover:bg-white/5
                        "
                      >
                        <Icon
                          name="Reply"
                          size={16}
                        />

                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;