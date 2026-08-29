import { useEffect, useRef, useState } from "react";

import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

import Icon from "../../common/Icon/Icon";
import Button from "../../common/Button/Button";
import ConfirmModal from "../../common/Modal/ConfirmModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";

import type { User } from "../../../types/user";
import { uploadImage } from "../../../services/userApi";
import type { UpdateProfilePayload } from "../../../services/userApi";

import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

interface ProfileCardProps {
  user: User;
  onSaveProfile: (data: UpdateProfilePayload) => Promise<void>;
  isSaving: boolean;
  saveError: string | null;
}

const toImageUuid = (image: string | null | undefined) => {
  if (!image) {
    return undefined;
  }

  const matched = image.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  );

  return matched?.[0];
};

const ProfileCard = ({
  user,
  onSaveProfile,
  isSaving,
  saveError,
}: ProfileCardProps) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [isDeletePhotoOpen, setIsDeletePhotoOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const cropperRef = useRef<ReactCropperElement>(null);

  const username = getUsernameFromEmail(user.email);

  const followersCount = user._count?.followers ?? 0;
  const followingCount = user._count?.following ?? 0;
  const postsCount = user._count?.posts ?? 0;

  useEffect(() => {
    return () => {
      if (selectedImage?.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

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
      return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
    }

    if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    }

    if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    }

    if (diffDays < 30) {
      return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
    }

    if (diffDays < 365) {
      return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
    }

    return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
  };

  const closeCropper = () => {
    if (selectedImage?.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
    setIsCropOpen(false);
    setIsUploadingAvatar(false);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    if (selectedImage?.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImage);
    }

    setAvatarError(null);
    setSelectedImage(URL.createObjectURL(file));
    setIsCropOpen(true);
  };

  const handleSaveCrop = async () => {
    const cropper = cropperRef.current?.cropper;

    if (!cropper) {
      return;
    }

    const canvas = cropper.getCroppedCanvas({
      width: 512,
      height: 512,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    });

    const file = await new Promise<File | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }

          resolve(
            new File([blob], "avatar.jpg", {
              type: "image/jpeg",
            }),
          );
        },
        "image/jpeg",
        0.92,
      );
    });

    if (!file) {
      setAvatarError("Could not crop this photo.");
      return;
    }

    try {
      setIsUploadingAvatar(true);
      setAvatarError(null);

      const uploaded = await uploadImage(file);

      await onSaveProfile({
        name: user.name,
        bio: user.bio ?? "",
        location: user.location ?? "",
        website: user.website ?? "",
        image: uploaded,
      });

      closeCropper();
    } catch (error) {
      console.error("Avatar save failed:", error);

      setAvatarError(
        error instanceof Error
          ? error.message
          : "Could not upload photo. Please try again.",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      setAvatarError(null);

      await onSaveProfile({
        name: user.name,
        bio: user.bio ?? "",
        location: user.location ?? "",
        website: user.website ?? "",
        image: null,
      });

      setIsDeletePhotoOpen(false);
    } catch (error) {
      console.error("Avatar delete failed:", error);

      setAvatarError(
        error instanceof Error
          ? error.message
          : "Could not delete photo. Please try again.",
      );
    }
  };

  const handleSaveProfile = async (data: {
    name: string;
    bio: string;
    location: string;
    website: string;
  }) => {
    const image = toImageUuid(user.image);

    await onSaveProfile(image ? { ...data, image } : data);

    setIsEditProfileOpen(false);
  };

  return (
    <div className="min-h-[446px] w-full rounded-2xl border border-(--color-border) bg-(--color-card) p-5 shadow-sm transition-colors duration-300">
      <style>
        {`
          .avatar-cropper .cropper-view-box,
          .avatar-cropper .cropper-face {
            border-radius: 50%;
          }
        `}
      </style>

      <div className="w-full">
        <div className="flex flex-col items-center">
          {/* Profile photo is display-only inside the card */}
          <ProfilePhoto
            image={user.image}
            name={user.name}
            editable={false}
          />

          <h2 className="mt-3 text-[20px] font-semibold text-(--color-content-primary)">
            {user.name}
          </h2>

          <span className="mt-1 text-[14px] text-(--color-content-secondary)">
            {username}
          </span>

          {user.bio && (
            <p className="mt-3 text-center text-[14px] leading-6 text-(--color-content-secondary)">
              {user.bio}
            </p>
          )}

          {avatarError && (
            <p className="mt-3 text-center text-[13px] text-red-500">
              {avatarError}
            </p>
          )}
        </div>

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

        <div className="mb-12 mt-4 w-full">
          <Button
            type="button"
            onClick={() => setIsEditProfileOpen(true)}
            variant="primary"
            className="w-full"
          >
            <Icon name="Edit" size={20} className="mr-2" />
            <span>Edit Profile</span>
          </Button>
        </div>

        <EditProfileModal
  isOpen={isEditProfileOpen}
  user={user}
  isSaving={isSaving}
  error={saveError}
  onClose={() => setIsEditProfileOpen(false)}
  onSave={handleSaveProfile}
  onChangeAvatar={handleFileSelect}
/>

        {isCropOpen && selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-card) p-5">
              <h3 className="mb-4 text-[18px] font-semibold text-(--color-content-primary)">
                Crop photo
              </h3>

              <div className="overflow-hidden rounded-xl">
                <Cropper
                  ref={cropperRef}
                  src={selectedImage}
                  aspectRatio={1}
                  viewMode={1}
                  dragMode="move"
                  background={false}
                  guides={false}
                  autoCropArea={1}
                  responsive={true}
                  checkOrientation={false}
                  minCropBoxWidth={200}
                  minCropBoxHeight={200}
                  className="avatar-cropper h-72 w-full"
                />
              </div>

              {avatarError && (
                <p className="mt-3 text-[13px] text-red-500">
                  {avatarError}
                </p>
              )}

              <div className="mt-5 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeCropper}
                  disabled={isUploadingAvatar}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSaveCrop}
                  disabled={isUploadingAvatar}
                >
                  {isUploadingAvatar ? "Saving..." : "Save photo"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {isDeletePhotoOpen && (
          <ConfirmModal
            title="Delete photo?"
            message="Your profile photo will be removed."
            confirmLabel="Yes, delete"
            onCancel={() => setIsDeletePhotoOpen(false)}
            onConfirm={handleDeletePhoto}
          />
        )}

        <div className="flex items-center gap-2 pt-6 text-(--color-content-secondary)">
          <Icon name="Location" size={20} />
          <span className="text-[14px]">
            {user.location || "No location"}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-(--color-content-secondary)">
          <Icon name="Link" size={20} />
          <span className="text-[14px]">
            {user.website || "No website"}
          </span>
        </div>

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