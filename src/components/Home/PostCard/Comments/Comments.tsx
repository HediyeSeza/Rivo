import { useState } from "react";

import Avatar from "../../../common/Avatar/Avatar";

import {
  createComment,
  type PostComment,
} from "../../../../services/postApi";

import { useAuth } from "../../../../context/AuthContext";

import avatarImage from "../../../../assets/Avatar/a.png";

import CommentItem from "./CommentItem";

interface CommentsProps {
  postId: string;
  comments: PostComment[];
  onCommentAdded: (
    postId: string,
  ) => void | Promise<void>;
  onMessage?: (message: string) => void;
}

const Comments = ({
  postId,
  comments,
  onMessage,
  onCommentAdded,
}: CommentsProps) => {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [error, setError] = useState<
    string | null
  >(null);

  const handleSubmit = async () => {
    const trimmedContent = content.trim();

    if (
      !trimmedContent ||
      isSubmitting ||
      !user
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await createComment(
        postId,
        trimmedContent,
      );

      onMessage?.(response.message);

      if (!response.success) {
        setError(response.message);
        return;
      }

      setContent("");

      await onCommentAdded(postId);
    } catch (error) {
      console.error(
        "Failed to create comment:",
        error,
      );

      const message =
        error instanceof Error
          ? error.message
          : "Failed to add comment.";

      onMessage?.(message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 border-t border-[var(--color-border)] pt-4">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      )}

      {/* Write Comment */}
      <div
        className={`
          flex
          items-start
          gap-3
          ${comments.length > 0 ? "mt-5" : ""}
        `}
      >
        <Avatar
          src={user?.image || avatarImage}
          alt="Your avatar"
          size={36}
        />

        <div className="min-w-0 flex-1">
          <textarea
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            placeholder="Write a comment..."
            rows={3}
            disabled={!user || isSubmitting}
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-[var(--color-border)]
              bg-[var(--color-card)]
              px-4
              py-3
              text-[14px]
              text-[var(--color-content-primary)]
              outline-none
              transition-colors
              duration-200
              placeholder:text-[var(--color-content-muted)]
              focus:border-[var(--color-content-primary)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          {error && (
            <p className="mt-2 text-[12px] text-red-500">
              {error}
            </p>
          )}

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                !content.trim() ||
                !user ||
                isSubmitting
              }
              className="
                rounded-lg
                bg-[var(--color-content-primary)]
                px-4
                py-2
                text-[13px]
                font-semibold
                text-[var(--color-card)]
                transition-opacity
                duration-200
                hover:opacity-80
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting
                ? "Commenting..."
                : "Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;