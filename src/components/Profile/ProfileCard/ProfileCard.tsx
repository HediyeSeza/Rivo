import { useState } from "react";

import Icon from "../../common/Icon/Icon";
import Button from "../../common/Button/Button";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import avatarImage from "../../../assets/Avatar/a.png";

const ProfileCard = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

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
            src={avatarImage}
            alt="Profile"
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
            Pedram
          </h2>

          <span
            className="
              mt-1
              text-[14px]
              text-(--color-content-secondary)
            "
          >
            iran
          </span>
        </div>

        {/* Followers */}
        <div className="mt-8 flex items-center justify-between text-center">
          <div>
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              2
            </p>
            <span className="text-[14px] text-(--color-content-secondary)">
              Followings
            </span>
          </div>

          <div>
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              2
            </p>
            <span className="text-[14px] text-(--color-content-secondary)">
              Followers
            </span>
          </div>

          <div>
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              2
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
        <div
          className="
            flex
            items-center
            gap-2
            pt-6
            text-(--color-content-secondary)
          "
        >
          <Icon name="Location" size={20} />

          <span className="text-[14px]">
            No location
          </span>
        </div>

        {/* Website */}
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-(--color-content-secondary)
          "
        >
          <Icon name="Link" size={20} />

          <span className="text-[14px]">
            No website
          </span>
        </div>

        {/* Joined */}
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-(--color-content-secondary)
          "
        >
          <Icon name="Calendar" size={20} />

          <span className="text-[14px]">
            6 days ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;