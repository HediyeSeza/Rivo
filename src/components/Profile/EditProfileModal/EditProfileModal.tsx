import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";

import type { UpdateProfilePayload } from "../../../services/userApi";
import type { User } from "../../../types/user";

import Avatar from "../../common/Avatar/Avatar";
import Icon from "../../common/Icon/Icon";

import avatarImage from "../../../assets/Avatar/a.png";

interface EditProfileModalProps {
  isOpen: boolean;
  user: User;
  isSaving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (data: UpdateProfilePayload) => Promise<void>;
  onChangeAvatar: (file: File) => void;
}

const EditProfileModal = ({
  isOpen,
  user,
  isSaving,
  error,
  onClose,
  onSave,
  onChangeAvatar,
}: EditProfileModalProps) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(user.name ?? "");
    setBio(user.bio ?? "");
    setLocation(user.location ?? "");
    setWebsite(user.website ?? "");
  }, [isOpen, user]);

  const handleSave = async () => {
    const trimmedName = name.trim();

    if (!trimmedName || isSaving) {
      return;
    }

    await onSave({
      name: trimmedName,
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
    });
  };

  const handleAvatarChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    onChangeAvatar(file);

    event.target.value = "";
  };

  const handleOverlayClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      event.target === event.currentTarget &&
      !isSaving
    ) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        py-4
        backdrop-blur-[2px]
      "
      onMouseDown={handleOverlayClick}
    >
      <div
        className="
          w-full
          max-w-[420px]
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          px-5
          py-4
          shadow-2xl
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2
              className="
                text-[18px]
                font-semibold
                leading-6
                text-[var(--color-content-primary)]
              "
            >
              Edit Profile
            </h2>

            <p
              className="
                mt-0.5
                max-w-[330px]
                text-[12px]
                font-normal
                leading-4
                text-[var(--color-content-muted)]
              "
            >
              Make changes to your profile here. Click
              save when you're done.
            </p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close"
            className="
              flex
              h-7
              w-7
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border-0
              bg-transparent
              p-0
              outline-none
              transition-opacity
              hover:opacity-70
              focus:outline-none
              focus:ring-0
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Icon
              name="Close"
              size={18}
              alt=""
            />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center py-3">
          <label
            htmlFor="profile-avatar-input"
            className="
              relative
              cursor-pointer
              rounded-full
              outline-none
            "
            aria-label="Change profile picture"
          >
            <div
              className="
                rounded-full
                border
                border-[var(--color-border)]
                p-1
              "
            >
              <Avatar
                src={user.image || avatarImage}
                alt={`${user.name} avatar`}
                size={64}
              />
            </div>

            {/* Camera */}
            <span
              className="
                absolute
                bottom-0
                right-0
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border-2
                border-[var(--color-card)]
                bg-[var(--color-content-primary)]
              "
            >
              <Icon
                name="Camera"
                size={13}
                alt=""
                reverseTheme
              />
            </span>

            <input
              id="profile-avatar-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isSaving}
              className="hidden"
            />
          </label>
        </div>

        {/* Divider */}
        <div
          className="
            mb-4
            h-px
            w-full
            bg-[var(--color-border)]
          "
        />

        {/* Name */}
        <div className="mb-3">
          <label
            htmlFor="profile-name"
            className="
              mb-1.5
              block
              text-[12px]
              font-semibold
              text-[var(--color-content-primary)]
            "
          >
            Name
          </label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            disabled={isSaving}
            autoComplete="name"
            className="
              h-9
              w-full
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-card)]
              px-3
              text-[12px]
              font-normal
              text-[var(--color-content-primary)]
              outline-none
              ring-0
              transition-all
              placeholder:text-[var(--color-content-muted)]
              focus:border-[#A3A3A3]
              focus:outline-none
              focus:ring-0
              focus:shadow-[0_0_0_3px_rgba(128,128,128,0.16)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* Bio */}
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="profile-bio"
              className="
                text-[12px]
                font-semibold
                text-[var(--color-content-primary)]
              "
            >
              Bio
            </label>

            <span
              className="
                text-[10px]
                font-normal
                text-[var(--color-content-muted)]
              "
            >
              {bio.length}/160
            </span>
          </div>

          <textarea
            id="profile-bio"
            value={bio}
            onChange={(event) => {
              if (event.target.value.length <= 160) {
                setBio(event.target.value);
              }
            }}
            disabled={isSaving}
            placeholder="Tell others about yourself..."
            rows={3}
            className="
              min-h-[72px]
              w-full
              resize-none
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-card)]
              px-3
              py-2.5
              text-[12px]
              font-normal
              leading-5
              text-[var(--color-content-primary)]
              outline-none
              ring-0
              transition-all
              placeholder:text-[var(--color-content-muted)]
              focus:border-[#A3A3A3]
              focus:outline-none
              focus:ring-0
              focus:shadow-[0_0_0_3px_rgba(128,128,128,0.16)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* Location */}
        <div className="mb-3">
          <label
            htmlFor="profile-location"
            className="
              mb-1.5
              block
              text-[12px]
              font-semibold
              text-[var(--color-content-primary)]
            "
          >
            Location
          </label>

          <input
            id="profile-location"
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            disabled={isSaving}
            placeholder="Where are you from?"
            className="
              h-9
              w-full
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-card)]
              px-3
              text-[12px]
              font-normal
              text-[var(--color-content-primary)]
              outline-none
              ring-0
              transition-all
              placeholder:text-[var(--color-content-muted)]
              focus:border-[#A3A3A3]
              focus:outline-none
              focus:ring-0
              focus:shadow-[0_0_0_3px_rgba(128,128,128,0.16)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* Website */}
        <div className="mb-4">
          <label
            htmlFor="profile-website"
            className="
              mb-1.5
              block
              text-[12px]
              font-semibold
              text-[var(--color-content-primary)]
            "
          >
            Website
          </label>

          <input
            id="profile-website"
            type="url"
            value={website}
            onChange={(event) =>
              setWebsite(event.target.value)
            }
            disabled={isSaving}
            placeholder="Your personal website"
            autoComplete="url"
            className="
              h-9
              w-full
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-card)]
              px-3
              text-[12px]
              font-normal
              text-[var(--color-content-primary)]
              outline-none
              ring-0
              transition-all
              placeholder:text-[var(--color-content-muted)]
              focus:border-[#A3A3A3]
              focus:outline-none
              focus:ring-0
              focus:shadow-[0_0_0_3px_rgba(128,128,128,0.16)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              mb-3
              rounded-lg
              border
              border-red-500/20
              bg-red-500/10
              px-3
              py-1.5
            "
          >
            <p className="text-[11px] text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="
              h-8
              cursor-pointer
              rounded-lg
              border
              border-[var(--color-border)]
              bg-transparent
              px-4
              text-[11px]
              font-medium
              text-[var(--color-content-primary)]
              outline-none
              transition-all
              hover:bg-black/5
              focus:border-[#A3A3A3]
              focus:outline-none
              focus:ring-0
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:hover:bg-white/5
              dark:focus:border-[#555555]
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="
              h-8
              cursor-pointer
              rounded-lg
              border
              border-[var(--color-content-primary)]
              bg-[var(--color-content-primary)]
              px-4
              text-[11px]
              font-semibold
              text-[var(--color-card)]
              outline-none
              transition-opacity
              hover:opacity-85
              focus:border-[var(--color-content-primary)]
              focus:outline-none
              focus:ring-0
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Privacy */}
        <div
          className="
            mt-2.5
            flex
            items-center
            justify-center
            gap-1.5
            text-[9px]
            font-normal
            text-[var(--color-content-muted)]
          "
        >
          <span aria-hidden="true">🔒</span>
          <span>
            Your information is private and secure.
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;