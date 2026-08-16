import Icon from "../../common/Icon/Icon";
import Button from "../../common/Button/Button";
import { useState } from "react";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const ProfileCard = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  return (
    <div
      className="
      h-[446px]
        w-[524px]
        rounded-2xl
        border border-[#E5E5E5]
        bg-white
        p-5
        shadow-sm
        dark:border-[#262626]
        dark:bg-[#0A0A0A]
      "
    >
      <div className="w-full">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <img
            src="src\assets\Avatar\a.png"
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />

          <h2 className="mt-3 text-[20px] font-semibold">Pedram</h2>

          <span className="mt-1 text-[14px] text-gray-500">iran</span>
        </div>

        {/* Followers */}
        <div className="flex items-center justify-between text-center mt-8">
          <div>
            <p className="text-[18px] font-medium">2</p>
            <span className="text-[14px] text-gray-500">Followings</span>
          </div>

          <div>
            <p className="text-[18px] font-medium">2</p>
            <span className="text-[14px] text-gray-500">Followers</span>
          </div>

          <div>
            <p className="text-[18px] font-medium">2</p>
            <span className="text-[14px] text-gray-500">Posts</span>
          </div>
        </div>

        <div className="mt-4 h-px w-full mb-12">
          <Button
            type="button"
            onClick={() => setIsEditProfileOpen(true)}
            variant="primary"
            className="w-full"
          >
            <Icon name="Edit" reverseTheme size={20} className="pr-2" />
            <p className="w-full">Edit profile</p>
          </Button>
        </div>
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
        />

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 pt-6">
          <Icon name="Location" size={20} />
          <span className="text-[14px]">No location</span>
        </div>

        {/* Website */}
        <div className="mt-3 flex items-center gap-2 text-gray-500">
          <Icon name="Link" size={20} />
          <span className="text-[14px]">No website</span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-500">
          <Icon name="Calendar" size={20} />
          <span className="text-[14px]">6 days ago</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
