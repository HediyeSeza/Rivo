import Icon from "../common/Icon/Icon";

import avatarImage from "../../assets/Avatar/a.png";

import type { User } from "../../services/userApi";
import { getUsernameFromEmail } from "../../utils/getUsernameFromEmail";

interface ProfileSidebarProps {
  user: User;
}

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const profileAvatar = user.image || avatarImage;
  const username = getUsernameFromEmail(user.email);

  const followersCount = user._count?.followers ?? 0;
  const followingCount = user._count?.followings ?? 0;

  return (
    <aside
      className="
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

        {/* Divider */}
        <div
          className="
            my-8
            h-px
            w-full
            bg-(--color-border)
          "
        />

        {/* Followers */}
        <div className="flex items-center justify-between text-center">
          <div>
            <p
              className="
                text-[18px]
                font-medium
                text-(--color-content-primary)
              "
            >
              {followingCount}
            </p>

            <span
              className="
                text-[14px]
                text-(--color-content-secondary)
              "
            >
              Followings
            </span>
          </div>

          <div>
            <p
              className="
                text-[18px]
                font-medium
                text-(--color-content-primary)
              "
            >
              {followersCount}
            </p>

            <span
              className="
                text-[14px]
                text-(--color-content-secondary)
              "
            >
              Followers
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="
            my-6
            h-px
            w-full
            bg-(--color-border)
          "
        />

        {/* Location */}
        <div
          className="
            flex
            items-center
            gap-2
            text-(--color-content-secondary)
          "
        >
          <Icon name="Location" size={20} />

          <span className="text-[14px]">
            {user.location || "No location"}
          </span>
        </div>

        {/* Website */}
        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            text-(--color-content-secondary)
          "
        >
          <Icon name="Link" size={20} />

          <span className="text-[14px]">
            {user.website || "No website"}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;