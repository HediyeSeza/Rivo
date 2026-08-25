import { useState } from "react";

import Icon from "../../common/Icon/Icon";
import Button from "../../common/Button/Button";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import avatarImage from "../../../assets/Avatar/a.png";

import type { User } from "../../../services/userApi";
import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const profileAvatar = user.image || avatarImage;
  const username = getUsernameFromEmail(user.email);

  const followersCount = user._count?.followers ?? 0;
  const followingCount = user._count?.followings ?? 0;
  const postsCount = user._count?.posts ?? 0;

  const getJoinedTime = (createdAt: string) => {
    const createdDate = new Date(createdAt);

    if (Number.isNaN(createdDate.getTime())) {
      return "Unknown";
    }

    const diffMs = Math.max(0, Date.now() - createdDate.getTime());

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMinutes < 1) {
      return "just now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} ${
        diffMinutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    if (diffHours < 24) {
      return `${diffHours} ${
        diffHours === 1 ? "hour" : "hours"
      } ago`;
    }

    if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    }

    if (diffDays < 30) {
      return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
    }

    if (diffDays < 365) {
      return `${diffMonths} ${
        diffMonths === 1 ? "month" : "months"
      } ago`;
    }

    return `${diffYears} ${
      diffYears === 1 ? "year" : "years"
    } ago`;
  };

  return (
    <div
      className="
        min-h-[446px]
        w-full
        rounded-2xl
        border
        border-(--color-border)
        bg-(--color-card)
        p-5
        shadow-sm
        transition-colors
        duration-300
      "
    >
      <div className="w-full">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <img
            src={profileAvatar}
            alt={`${user.name} avatar`}
            className="h-20 w-20 rounded-full object-cover"
          />

          <h2
            className="
              mt-3
              text-[20px]
              font-semibold
              text-(--color-content-primary)
            "
          >
            {user.name}
          </h2>

          <span
            className="
              mt-1
              text-[14px]
              text-(--color-content-secondary)
            "
          >
            {username}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-8 flex items-center justify-between text-center">
          <div>
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              {followingCount}
            </p>

            <span className="text-[14px] text-(--color-content-secondary)">
              Followings
            </span>
          </div>

          <div>
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              {followersCount}
            </p>

            <span className="text-[14px] text-(--color-content-secondary)">
              Followers
            </span>
          </div>

          <div>
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              {postsCount}
            </p>

            <span className="text-[14px] text-(--color-content-secondary)">
              Posts
            </span>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="mb-12 mt-4 w-full">
          <Button
            type="button"
            onClick={() => setIsEditProfileOpen(true)}
            variant="primary"
            className="w-full"
          >
            <Icon
              name="Edit"
              size={20}
              className="mr-2"
            />
            <span>Edit Profile</span>
          </Button>
        </div>

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
        />

        {/* Location */}
        <div className="flex items-center gap-2 pt-6 text-(--color-content-secondary)">
          <Icon name="Location" size={20} />

          <span className="text-[14px]">
            {user.location || "No location"}
          </span>
        </div>

        {/* Website */}
        <div className="mt-3 flex items-center gap-2 text-(--color-content-secondary)">
          <Icon name="Link" size={20} />

          <span className="text-[14px]">
            {user.website || "No website"}
          </span>
        </div>

        {/* Joined */}
        <div className="mt-3 flex items-center gap-2 text-(--color-content-secondary)">
          <Icon name="Calendar" size={20} />

          <span className="text-[14px]">
            {getJoinedTime(user.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;