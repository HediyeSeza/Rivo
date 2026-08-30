import Avatar from "../../common/Avatar/Avatar";
import { useTheme } from "../../../context/ThemeContext";

import profileAddDark from "../../../assets/icons/Dark/profile-add.svg";
import profileAddLight from "../../../assets/icons/Light/profile-add.svg";

import heartDark from "../../../assets/icons/Dark/Name=Heart.svg";
import heartLight from "../../../assets/icons/Light/Name=Heart.svg";

import chatDark from "../../../assets/icons/Dark/Name=Chat.svg";
import chatLight from "../../../assets/icons/Light/Name=Chat.svg";

import avatarImage from "../../../assets/Avatar/a.png";

interface NotificationCardProps {
  type: "LIKE" | "COMMENT" | "FOLLOW";
  username: string;
  postContent: string;
  commentContent: string;
  time: string;
  avatar?: string;
  read: boolean;
}

const NotificationCard = ({
  type,
  username,
  postContent,
  commentContent,
  time,
  avatar,
  read,
}: NotificationCardProps) => {
  const { theme } = useTheme();

  const isLike = type === "LIKE";
  const isComment = type === "COMMENT";
  const isFollow = type === "FOLLOW";

  const notificationIcon = isFollow
    ? theme === "dark"
      ? profileAddDark
      : profileAddLight
    : isLike
      ? theme === "dark"
        ? heartDark
        : heartLight
      : theme === "dark"
        ? chatDark
        : chatLight;

  return (
    <article
      className={`
        w-full
        rounded-xl
        p-5
        text-[var(--color-content-primary)]
        transition-colors
        duration-200
        ${
          read
            ? "bg-white dark:bg-[var(--color-card)]"
            : "bg-[#f0f0f0] dark:bg-[#252525]"
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar
          src={avatar || avatarImage}
          alt={`${username} avatar`}
          size={40}
        />

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Notification */}
          <div className="flex items-center gap-2">
            <img
              src={notificationIcon}
              alt=""
              className="h-[18px] w-[18px] shrink-0"
            />

            <p className="text-[14px] leading-5">
              <span
                className="
                  cursor-pointer
                  font-semibold
                  text-[var(--color-content-primary)]
                "
              >
                {username}
              </span>{" "}
              <span className="text-[var(--color-content-secondary)]">
                {isLike
                  ? "liked your post"
                  : isComment
                    ? "commented on your post"
                    : "started following you"}
              </span>
            </p>
          </div>

          {/* Post Content */}
          {!isFollow && postContent && (
            <p
              className="
                mt-3
                p-2
                min-w-48
                max-w-fit
                rounded-sm
                bg-[#f0f0f0]
                dark:bg-[#252525]
                break-words
                text-[16px]
                leading-6
                text-[var(--color-content-primary)]
              "
            >
              {postContent}
            </p>
          )}

          {/* Comment Content */}
          {isComment && commentContent && (
            <p
              className="
                mt-2
                min-w-48
                max-w-fit
                p-2
                rounded-sm
                bg-[#f0f0f0]
                dark:bg-[#252525]
                break-words
                text-[16px]
                leading-6
                text-[var(--color-content-primary)]
              "
            >
              {commentContent}
            </p>
          )}

          {/* Time */}
          <span
            className="
              mt-1
              block
              text-[13px]
              text-[var(--color-content-secondary)]
            "
          >
            {time}
          </span>
        </div>
      </div>
    </article>
  );
};

export default NotificationCard;
