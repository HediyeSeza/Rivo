import { useEffect, useState } from "react";
import type { UpdateProfilePayload } from "../../../services/userApi";

import type { User } from "../../../types/user";

interface EditProfileModalProps {
  isOpen: boolean;
  user: User;
  isSaving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (data: UpdateProfilePayload) => Promise<void>;
}

const EditProfileModal = ({
  isOpen,
  user,
  isSaving,
  error,
  onClose,
  onSave,
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
    await onSave({
      name: name.trim(),
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
    });
  };

  return (
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 px-4

        transition-opacity duration-300 ease-in-out

        ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
    >
      <div
        className={`
          w-full max-w-[575px]
          rounded-lg
          border border-[#E5E5E5]
          bg-white
          p-7
          shadow-xl

          transition-all duration-300 ease-in-out

          ${
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-2 scale-95 opacity-0"
          }

          dark:border-[#262626]
          dark:bg-[#0A0A0A]
        `}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[21px] font-semibold">
            Edit Profile
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="
              text-2xl
              font-light
              text-gray-500
              transition
              hover:text-black
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:hover:text-white
            "
          >
            X
          </button>
        </div>

        {/* Name */}
        <div className="mb-2">
          <label className="mb-2 block text-[14px]">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSaving}
            className="
              h-11
              w-full
              rounded-lg
              border border-[#E5E5E5]
              bg-white
              px-3
              outline-none
              transition
              focus:border-black
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {/* Bio */}
        <div className="mb-2">
          <label className="mb-2 block text-[14px]">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isSaving}
            placeholder="Enter your Bio"
            className="
              h-26
              w-full
              resize-none
              rounded-lg
              border border-[#E5E5E5]
              bg-white
              p-3
              outline-none
              transition
              focus:border-black
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {/* Location */}
        <div className="mb-2">
          <label className="mb-2 block text-[14px]">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isSaving}
            placeholder="Where you are at"
            className="
              h-11
              w-full
              rounded-lg
              border border-[#E5E5E5]
              bg-white
              px-3
              outline-none
              transition
              focus:border-black
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {/* Website */}
        <div className="mb-3">
          <label className="mb-2 block text-[14px]">
            Website
          </label>

          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={isSaving}
            placeholder="Your personal website"
            className="
              h-11
              w-full
              rounded-lg
              border border-[#E5E5E5]
              bg-white
              px-3
              outline-none
              transition
              focus:border-black
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {error && (
          <p className="mb-4 text-[14px] text-red-500">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="
              h-11
              rounded-lg
              border border-[#E5E5E5]
              bg-white
              px-5
              text-[15px]
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-[#262626]
              dark:bg-[#0A0A0A]
              dark:hover:bg-white/10
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="
              h-11
              rounded-lg
              bg-[#171717]
              px-5
              text-[15px]
              text-white
              transition
              hover:bg-black
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:bg-white
              dark:text-black
              dark:hover:bg-gray-200
            "
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;