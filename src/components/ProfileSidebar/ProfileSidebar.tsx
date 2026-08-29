import Icon from "../common/Icon/Icon";
import Avatar from "../common/Avatar/Avatar";
import avatarImage from "../../assets/Avatar/a.png";
import type { User } from "../../services/userApi";
import { getUsernameFromEmail } from "../../utils/getUsernameFromEmail";

interface ProfileSidebarProps {
  user: User | null | undefined;
}

const ProfileSidebar = ({
  user,
}: ProfileSidebarProps) => {
  if (!user) {
    return null;
  }

  const profileAvatar = user.image || avatarImage;

  const username = getUsernameFromEmail(
    user.email,
  );

  const followersCount =
    user._count?.followers ?? 0;

  const followingCount =
    user._count?.following ?? 0;

  return (
    <aside
      className="
        w-full
        rounded-2xl
        border
        border-(--color-border)
        bg-(--color-card)
        p-4
        shadow-sm
        transition-colors
        duration-300
      "
    >
      <div className="w-full">
        <div className="flex flex-col items-center">
          <Avatar
            src={profileAvatar}
            size={64}
          />

          <h2
            className="
              mt-2
              text-[18px]
              font-semibold
              text-(--color-content-primary)
            "
          >
            {user.name}
          </h2>

          <span
            className="
              mt-1
              text-[13px]
              text-(--color-content-secondary)
            "
          >
            {username}
          </span>

          {user.bio?.trim() ? (
            <p
              className="
                mt-3
                w-full
                text-center
                text-[13px]
                leading-5
                text-(--color-content-secondary)
              "
            >
              {user.bio}
            </p>
          ) : null}
        </div>

        <div
          className="
            my-5
            h-px
            w-full
            bg-(--color-border)
          "
        />

        <div className="flex items-center justify-between text-center">
          <div>
            <p
              className="
                text-[16px]
                font-medium
                text-(--color-content-primary)
              "
            >
              {followingCount}
            </p>

            <span
              className="
                text-[13px]
                text-(--color-content-secondary)
              "
            >
              Followings
            </span>
          </div>

          <div>
            <p
              className="
                text-[16px]
                font-medium
                text-(--color-content-primary)
              "
            >
              {followersCount}
            </p>

            <span
              className="
                text-[13px]
                text-(--color-content-secondary)
              "
            >
              Followers
            </span>
          </div>
        </div>

        <div
          className="
            my-4
            h-px
            w-full
            bg-(--color-border)
          "
        />

        <div
          className="
            flex
            items-center
            gap-2
            text-(--color-content-secondary)
          "
        >
          <Icon name="Location" size={18} />

          <span className="text-[13px]">
            {user.location || "No location"}
          </span>
        </div>

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-(--color-content-secondary)
          "
        >
          <Icon name="Link" size={18} />

          <span className="text-[13px]">
            {user.website || "No website"}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
