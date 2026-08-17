import { useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const [name, setName] = useState("Pedram");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const handleSave = () => {
    // فعلاً فقط برای تست
    console.log({
      name,
      bio,
      location,
      website,
    });

    onClose();
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
          <h2 className="text-[21px] font-semibold">Edit Profile</h2>

          <button
            type="button"
            onClick={onClose}
            className="
              text-2xl
              font-light
              text-gray-500
              transition
              hover:text-black
              dark:hover:text-white
            "
          >
            X
          </button>
        </div>

        {/* Name */}
        <div className="mb-2">
          <label className="mb-2 block text-[14px]">Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {/* Bio */}
        <div className="mb-2">
          <label className="mb-2 block text-[14px]">Bio</label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {/* Location */}
        <div className="mb-2">
          <label className="mb-2 block text-[14px]">Location</label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {/* Website */}
        <div className="mb-5">
          <label className="mb-2 block text-[14px]">Website</label>

          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
              dark:border-[#262626]
              dark:bg-[#191919]
              dark:focus:border-white
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              h-11
              rounded-lg
              border border-[#E5E5E5]
              bg-white
              px-5
              text-[15px]
              transition
              hover:bg-gray-100
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
            className="
              h-11
              rounded-lg
              bg-[#171717]
              px-5
              text-[15px]
              text-white
              transition
              hover:bg-black
              dark:bg-white
              dark:text-black
              dark:hover:bg-gray-200
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
