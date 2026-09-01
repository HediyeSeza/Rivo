import { useEffect, useRef, useState } from "react";

import Cropper, {
  type ReactCropperElement,
} from "react-cropper";
import "cropperjs/dist/cropper.css";

import { getUserCounts } from "../../../utils/getUserCounts";
import Icon from "../../common/Icon/Icon";
import Button from "../../common/Button/Button";

import ConfirmModal from "../../common/Modal/ConfirmModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";

import FollowListModal from "../../common/Modal/FollowListModal/FollowListModal";
import FollowUserButton from "../ProfileConnections/FollowUserButton";

import type { User } from "../../../types/user";

import {
  getUserFollowings,
  uploadImage,
} from "../../../services/userApi";

import type {
  UpdateProfilePayload,
} from "../../../services/userApi";

import {
  getUsernameFromEmail,
} from "../../../utils/getUsernameFromEmail";

import { useAuth } from "../../../context/AuthContext";

interface ProfileCardProps {
  user: User;
  postsCount: number;
  onSaveProfile: (
    data: UpdateProfilePayload,
  ) => Promise<void>;
  isSaving: boolean;
  saveError: string | null;
}

const toImageUuid = (
  image: string | null | undefined,
) => {
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
  postsCount,
  onSaveProfile,
  isSaving,
  saveError,
}: ProfileCardProps) => {
  const {
    user: authUser,
  } = useAuth();

  const [
    isEditProfileOpen,
    setIsEditProfileOpen,
  ] = useState(false);

  const [
    isCropOpen,
    setIsCropOpen,
  ] = useState(false);

  const [
    isDeletePhotoOpen,
    setIsDeletePhotoOpen,
  ] = useState(false);

  const [
    followListTab,
    setFollowListTab,
  ] = useState<
    "followers" | "following" | null
  >(null);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState<string | null>(null);

  const [
    isUploadingAvatar,
    setIsUploadingAvatar,
  ] = useState(false);

  const [
    avatarError,
    setAvatarError,
  ] = useState<string | null>(null);

  const [
    isFollowing,
    setIsFollowing,
  ] = useState(false);

  const [
    isFollowStatusLoading,
    setIsFollowStatusLoading,
  ] = useState(false);

  const cropperRef =
    useRef<ReactCropperElement>(null);

  const username =
    getUsernameFromEmail(user.email);

  const {
    followers: followersCount,
    following: followingCount,
  } = getUserCounts(user);

  const isOwnProfile =
    authUser?.id === user.id;

  /*
   * Load follow status for another user's profile.
   *
   * We check the following list of the currently
   * authenticated user and determine whether the
   * displayed profile user is already followed.
   */
  useEffect(() => {
    if (!authUser?.id || isOwnProfile) {
      setIsFollowing(false);
      setIsFollowStatusLoading(false);
      return;
    }

    let cancelled = false;

    const loadFollowStatus = async () => {
      try {
        setIsFollowStatusLoading(true);

        const followingUsers =
          await getUserFollowings(authUser.id);

        if (cancelled) {
          return;
        }

        const following =
          followingUsers.some(
            (followingUser) =>
              followingUser.id === user.id,
          );

        setIsFollowing(following);
      } catch (error) {
        console.error(
          "Failed to load follow status:",
          error,
        );
      } finally {
        if (!cancelled) {
          setIsFollowStatusLoading(false);
        }
      }
    };

    void loadFollowStatus();

    return () => {
      cancelled = true;
    };
  }, [
    authUser?.id,
    user.id,
    isOwnProfile,
  ]);

  useEffect(() => {
    return () => {
      if (
        selectedImage?.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          selectedImage,
        );
      }
    };
  }, [selectedImage]);

  const getJoinedTime = (
    createdAt: string,
  ) => {
    const createdDate =
      new Date(createdAt);

    if (
      Number.isNaN(
        createdDate.getTime(),
      )
    ) {
      return "Unknown";
    }

    const diffMs = Math.max(
      0,
      Date.now() -
        createdDate.getTime(),
    );

    const diffMinutes =
      Math.floor(
        diffMs / (1000 * 60),
      );

    const diffHours =
      Math.floor(
        diffMs /
          (1000 * 60 * 60),
      );

    const diffDays =
      Math.floor(
        diffMs /
          (1000 * 60 * 60 * 24),
      );

    const diffWeeks =
      Math.floor(diffDays / 7);

    const diffMonths =
      Math.floor(diffDays / 30);

    const diffYears =
      Math.floor(diffDays / 365);

    if (diffMinutes < 1) {
      return "just now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} ${
        diffMinutes === 1
          ? "minute"
          : "minutes"
      } ago`;
    }

    if (diffHours < 24) {
      return `${diffHours} ${
        diffHours === 1
          ? "hour"
          : "hours"
      } ago`;
    }

    if (diffDays < 7) {
      return `${diffDays} ${
        diffDays === 1
          ? "day"
          : "days"
      } ago`;
    }

    if (diffDays < 30) {
      return `${diffWeeks} ${
        diffWeeks === 1
          ? "week"
          : "weeks"
      } ago`;
    }

    if (diffDays < 365) {
      return `${diffMonths} ${
        diffMonths === 1
          ? "month"
          : "months"
      } ago`;
    }

    return `${diffYears} ${
      diffYears === 1
        ? "year"
        : "years"
    } ago`;
  };

  const closeCropper = () => {
    if (
      selectedImage?.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        selectedImage,
      );
    }

    setSelectedImage(null);
    setIsCropOpen(false);
    setIsUploadingAvatar(false);
  };

  const handleFileSelect = (
    file: File,
  ) => {
    if (
      !file.type.startsWith("image/")
    ) {
      return;
    }

    if (
      selectedImage?.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        selectedImage,
      );
    }

    setAvatarError(null);

    setSelectedImage(
      URL.createObjectURL(file),
    );

    setIsCropOpen(true);
  };

  const handleSaveCrop = async () => {
    const cropper =
      cropperRef.current?.cropper;

    if (!cropper) {
      return;
    }

    const canvas =
      cropper.getCroppedCanvas({
        width: 512,
        height: 512,
        imageSmoothingEnabled: true,
        imageSmoothingQuality:
          "high",
      });

    const file =
      await new Promise<File | null>(
        (resolve) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(null);
                return;
              }

              resolve(
                new File(
                  [blob],
                  "avatar.jpg",
                  {
                    type: "image/jpeg",
                  },
                ),
              );
            },
            "image/jpeg",
            0.92,
          );
        },
      );

    if (!file) {
      setAvatarError(
        "Could not crop this photo.",
      );
      return;
    }

    try {
      setIsUploadingAvatar(true);
      setAvatarError(null);

      const uploaded =
        await uploadImage(file);

      await onSaveProfile({
        name: user.name,
        bio: user.bio ?? "",
        location:
          user.location ?? "",
        website:
          user.website ?? "",
        image: uploaded,
      });

      closeCropper();
    } catch (error) {
      console.error(
        "Avatar save failed:",
        error,
      );

      setAvatarError(
        error instanceof Error
          ? error.message
          : "Could not upload photo. Please try again.",
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleDeletePhoto =
    async () => {
      try {
        setAvatarError(null);

        await onSaveProfile({
          name: user.name,
          bio: user.bio ?? "",
          location:
            user.location ?? "",
          website:
            user.website ?? "",
          image: null,
        });

        setIsDeletePhotoOpen(
          false,
        );
      } catch (error) {
        console.error(
          "Avatar delete failed:",
          error,
        );

        setAvatarError(
          error instanceof Error
            ? error.message
            : "Could not delete photo. Please try again.",
        );
      }
    };

  const handleSaveProfile =
    async (data: {
      name: string;
      bio: string;
      location: string;
      website: string;
    }) => {
      const image = toImageUuid(
        user.image,
      );

      await onSaveProfile(
        image
          ? {
              ...data,
              image,
            }
          : data,
      );

      setIsEditProfileOpen(
        false,
      );
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

        {/* Profile */}
        <div className="flex flex-col items-center">

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

        {/* Stats */}
        <div className="mt-8 flex items-center justify-between text-center">

          <button
            type="button"
            onClick={() =>
              setFollowListTab(
                "following",
              )
            }
            className="cursor-pointer"
          >
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              {followingCount}
            </p>

            <span className="text-[14px] text-(--color-content-secondary)">
              Followings
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setFollowListTab(
                "followers",
              )
            }
            className="cursor-pointer"
          >
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              {followersCount}
            </p>

            <span className="text-[14px] text-(--color-content-secondary)">
              Followers
            </span>
          </button>

          <div>
            <p className="text-[18px] font-medium text-(--color-content-primary)">
              {postsCount}
            </p>

            <span className="text-[14px] text-(--color-content-secondary)">
              Posts
            </span>
          </div>
        </div>

        {/* Profile Action */}
        <div className="mb-1 mt-2 w-full">
          {isOwnProfile ? (
            <Button
              type="button"
              onClick={() =>
                setIsEditProfileOpen(true)
              }
              variant="primary"
              className="w-full"
              icon={
                <Icon
                  name="Edit"
                  size={20}
                  reverseTheme
                />
              }
            >
              Edit Profile
            </Button>
          ) : (
            <div
              className="
                flex
                w-full
                [&_button]:!w-full
              "
            >
              <FollowUserButton
                userId={user.id}
                initialFollowing={
                  isFollowing
                }
                onFollowChange={(
                  _userId,
                  nextFollowing,
                ) => {
                  setIsFollowing(
                    nextFollowing,
                  );
                }}
              />
            </div>
          )}
        </div>

        {/* Edit Profile Modal */}
        {isOwnProfile && (
          <EditProfileModal
            isOpen={
              isEditProfileOpen
            }
            user={user}
            isSaving={isSaving}
            error={saveError}
            onClose={() =>
              setIsEditProfileOpen(
                false,
              )
            }
            onSave={
              handleSaveProfile
            }
            onChangeAvatar={
              handleFileSelect
            }
          />
        )}

        {/* Crop Modal */}
        {isCropOpen &&
          selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-card) p-5">

                <h3 className="mb-4 text-[18px] font-semibold text-(--color-content-primary)">
                  Crop photo
                </h3>

                <div className="overflow-hidden rounded-xl">
                  <Cropper
                    ref={cropperRef}
                    src={
                      selectedImage
                    }
                    aspectRatio={1}
                    viewMode={1}
                    dragMode="move"
                    background={false}
                    guides={false}
                    autoCropArea={1}
                    responsive
                    checkOrientation={
                      false
                    }
                    minCropBoxWidth={
                      200
                    }
                    minCropBoxHeight={
                      200
                    }
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
                    onClick={
                      closeCropper
                    }
                    disabled={
                      isUploadingAvatar
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant="primary"
                    onClick={
                      handleSaveCrop
                    }
                    disabled={
                      isUploadingAvatar
                    }
                  >
                    {isUploadingAvatar
                      ? "Saving..."
                      : "Save photo"}
                  </Button>
                </div>
              </div>
            </div>
          )}

        {/* Delete Photo */}
        {isDeletePhotoOpen && (
          <ConfirmModal
            title="Delete photo?"
            message="Your profile photo will be removed."
            confirmLabel="Yes, delete"
            onCancel={() =>
              setIsDeletePhotoOpen(
                false,
              )
            }
            onConfirm={
              handleDeletePhoto
            }
          />
        )}

        {/* Location */}
        <div className="flex items-center gap-2 pt-6 text-(--color-content-secondary)">
          <Icon
            name="Location"
            size={20}
          />

          <span className="text-[14px]">
            {user.location ||
              "No location"}
          </span>
        </div>

        {/* Website */}
        <div className="mt-3 flex items-center gap-2 text-(--color-content-secondary)">
          <Icon
            name="Link"
            size={20}
          />

          <span className="text-[14px]">
            {user.website ||
              "No website"}
          </span>
        </div>

        {/* Joined */}
        <div className="mt-3 flex items-center gap-2 text-(--color-content-secondary)">
          <Icon
            name="Calendar"
            size={20}
          />

          <span className="text-[14px]">
            {getJoinedTime(
              user.createdAt,
            )}
          </span>
        </div>

        {/* Follow List */}
        <FollowListModal
          isOpen={
            followListTab !== null
          }
          userId={user.id}
          initialTab={
            followListTab ??
            "followers"
          }
          onClose={() =>
            setFollowListTab(null)
          }
        />
      </div>
    </div>
  );
};

export default ProfileCard;