import { useRef, useState } from "react";

import Avatar from "../../../common/Avatar/Avatar";

import { createComment, type PostComment } from "../../../../services/postApi";

import { useAuth } from "../../../../context/AuthContext";

import avatarImage from "../../../../assets/Avatar/a.png";

import { Link } from "react-router-dom";

import CommentItem from "./CommentItem";

interface CommentsProps {
  postId: string;
  comments: PostComment[];
  onCommentAdded: (postId: string) => void | Promise<void>;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<PostComment | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleReplyClick = (comment: PostComment) => {
    setReplyingTo(comment);
    textareaRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const handleSubmit = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isSubmitting || !user) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await createComment(postId, trimmedContent);

      onMessage?.(response.message);

      if (!response.success) {
        setError(response.message);
        return;
      }

      setContent("");
      setReplyingTo(null);

      await onCommentAdded(postId);
    } catch (error) {
      console.error("Failed to create comment:", error);

      const message =
        error instanceof Error ? error.message : "Failed to add comment.";

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
              postId={postId}
              onReply={handleReplyClick}
              onCommentUpdated={onCommentAdded}
              onCommentDeleted={onCommentAdded}
              onMessage={onMessage}
            />
          ))}
        </div>
      )}

      {/* Write Comment */}
      {user ? (
        <div
          className={`
      flex
      items-start
      gap-3
      ${comments.length > 0 ? "mt-5" : ""}
    `}
        >
          <Avatar src={user.image || avatarImage} alt="Your avatar" size={36} />

          <div className="min-w-0 flex-1">
            {replyingTo && (
              <div
                className="
            mb-2
            flex
            items-center
            justify-between
            rounded-lg
            bg-black/5
            px-3
            py-1.5
            text-[12px]
            text-[var(--color-content-secondary)]
            dark:bg-white/5
          "
              >
                <span>
                  Replying to <b>{replyingTo.author.name}</b>
                </span>
                <button
                  type="button"
                  onClick={cancelReply}
                  className="text-[var(--color-content-primary)] hover:opacity-70"
                >
                  ✕
                </button>
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={
                replyingTo ? "Write a reply..." : "Write a comment..."
              }
              rows={3}
              disabled={isSubmitting}
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

            {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}

            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
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
            cursor-pointer
          "
              >
                {isSubmitting
                  ? replyingTo
                    ? "Replying..."
                    : "Commenting..."
                  : replyingTo
                    ? "Reply"
                    : "Comment"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`
      flex
      items-center
      justify-between
      gap-3
      rounded-xl
      bg-black
      dark:bg-gray-100
      px-4
      py-3
      ${comments.length > 0 ? "mt-5" : ""}
    `}
        >
          <div className="min-w-0">
            <p className="text-[18px] font-bold text-white dark:text-black">
              You are signed out
            </p>
            <p className="text-[14px] text-white dark:text-black font-light">
              Sign in to write a comment
            </p>
          </div>

          <Link
            to="/login"
            className="
        shrink-0
        rounded-lg
        bg-white
        dark:bg-black
        px-4
        py-2
        text-[13px]
        font-semibold
        text-black
        dark:text-white
        transition-opacity
        duration-200
        hover:opacity-80
      "
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Comments;
