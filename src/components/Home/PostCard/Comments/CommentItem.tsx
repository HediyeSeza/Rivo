import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "../../../common/Avatar/Avatar";
import Icon from "../../../common/Icon/Icon";
import ConfirmModal from "../../../common/Modal/ConfirmModal";
import EditableContent from "../../../common/EditableContent/EditableContent";

import avatarImage from "../../../../assets/Avatar/a.png";

import {
  deleteComment,
  updateComment,
  type PostComment,
} from "../../../../services/postApi";
import { searchUsers } from "../../../../services/userApi";

import { useAuth } from "../../../../context/AuthContext";

interface CommentItemProps {
  comment: PostComment;
  postId: string;
  onReply: (comment: PostComment) => void;
  onCommentUpdated: (postId: string) => void | Promise<void>;
  onCommentDeleted: (postId: string) => void | Promise<void>;
  onMessage?: (message: string) => void;
}

const formatCommentTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

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

  return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
};

const CommentItem = ({
  comment,
  postId,
  onReply,
  onCommentUpdated,
  onCommentDeleted,
  onMessage,
}: CommentItemProps) => {
  const { user } = useAuth();

  const isOwnComment = !!user && user.email === comment.author.email;

  const [isEditing, setIsEditing] = useState(false);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleAuthorClick = async () => {
    try {
      const results = await searchUsers(comment.author.email);
      const matchedUser = results.find((u) => u.email === comment.author.email);

      if (matchedUser) {
        navigate(`/profile/${matchedUser.id}`);
      }
    } catch (error) {
      console.error("Failed to find user profile:", error);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);

      const response = await deleteComment(postId, comment.id);

      onMessage?.(response.message);

      if (!response.success) {
        return;
      }

      setIsConfirmingDelete(false);
      await onCommentDeleted(postId);
    } catch (error) {
      console.error("Failed to delete comment:", error);

      onMessage?.(
        error instanceof Error ? error.message : "Failed to delete comment.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Main Comment */}
      <div className="flex items-start gap-3">
        <Avatar
          src={comment.author.image || avatarImage}
          alt={`${comment.author.name} avatar`}
          size={36}
        />

        <div className="min-w-0 flex-1">
          {/* Comment Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAuthorClick}
                className="text-[14px] font-semibold text-[var(--color-content-primary)] hover:underline cursor-pointer"
              >
                {comment.author.name}
              </button>

              <span
                className="
                  text-[12px]
                  text-[var(--color-content-muted)]
                "
              >
                {formatCommentTime(comment.createdAt)}
              </span>
            </div>

            {isOwnComment && !isEditing && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit comment"
                  className="rounded-md px-2 py-1 cursor-pointer"
                >
                  <Icon name="EditComment" size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(true)}
                  aria-label="Delete comment"
                  className="rounded-md px-2 py-1 cursor-pointer"
                >
                  <Icon name="Tash" size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Comment Content / Edit Mode */}
          {isEditing ? (
            <div className="mt-2">
              <EditableContent
                initialContent={comment.content}
                rows={2}
                onCancel={() => setIsEditing(false)}
                onMessage={onMessage}
                onSave={async (newContent) => {
                  const response = await updateComment(
                    postId,
                    comment.id,
                    newContent,
                  );

                  if (response.success) {
                    setIsEditing(false);
                    await onCommentUpdated(postId);
                  }

                  return response;
                }}
              />
            </div>
          ) : (
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
          )}

          {/* Reply Button */}
          {!isEditing && (
            <button
              type="button"
              onClick={() => onReply(comment)}
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
              <Icon name="Reply" size={18} className="cursor-pointer" />
              <span>Reply</span>
            </button>
          )}
        </div>
      </div>

      {isConfirmingDelete && (
        <ConfirmModal
          title="Delete comment?"
          message="Are you sure you want to delete this comment?"
          confirmLabel={isDeleting ? "Deleting..." : "Delete"}
          onCancel={() => setIsConfirmingDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default CommentItem;
