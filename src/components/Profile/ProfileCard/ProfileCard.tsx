import { useState } from "react";
import Icon from "../../common/Icon/Icon";
import Button from "../../common/Button/Button";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import avatarImage from "../../../assets/Avatar/a.png";
import type { UpdateProfilePayload, User } from "../../../types/user";

interface ProfileCardProps {
  user: User;
  isOwnProfile: boolean;
  onSaveProfile: (data: UpdateProfilePayload) => Promise<void>;
  isSaving: boolean;
  saveError: string | null;
}

const ProfileCard = ({
  user,
  isOwnProfile,
  onSaveProfile,
  isSaving,
  saveError,
}: ProfileCardProps) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <div className="min-h-[446px] w-full rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm dark:border-[#313131] dark:bg-[#191919]">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar || avatarImage}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover"
          />

          <h2 className="mt-3 text-[20px] font-semibold">{user.name}</h2>

          {user.username ? (
            <span className="mt-1 text-[14px] text-gray-500">
              @{user.username}
            </span>
          ) : null}

          {user.bio ? (
            <p className="mt-3 text-center text-[14px] text-gray-600 dark:text-gray-300">
              {user.bio}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between text-center">
          <div>
            <p className="text-[18px] font-medium">{user.followingCount ?? 0}</p>
            <span className="text-[14px] text-gray-500">Followings</span>
          </div>
          <div>
            <p className="text-[18px] font-medium">{user.followersCount ?? 0}</p>
            <span className="text-[14px] text-gray-500">Followers</span>
          </div>
          <div>
            <p className="text-[18px] font-medium">{user.postsCount ?? 0}</p>
            <span className="text-[14px] text-gray-500">Posts</span>
          </div>
        </div>

        {isOwnProfile ? (
          <div className="mb-12 mt-4 h-px w-full">
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
        ) : (
          <div className="mb-12 mt-4" />
        )}

        {isOwnProfile ? (
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            initialValues={{
              name: user.name,
              bio: user.bio ?? "",
              location: user.location ?? "",
              website: user.website ?? "",
            }}
            onSave={onSaveProfile}
            isSaving={isSaving}
            error={saveError}
          />
        ) : null}

        <div className="flex items-center gap-2 pt-6 text-gray-500">
          <Icon name="Location" size={20} />
          <span className="text-[14px]">{user.location || "No location"}</span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-500">
          <Icon name="Link" size={20} />
          {user.website ? (
            <a
              href={user.website}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] underline"
            >
              {user.website}
            </a>
          ) : (
            <span className="text-[14px]">No website</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
