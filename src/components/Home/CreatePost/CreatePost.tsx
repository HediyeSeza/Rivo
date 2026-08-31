import { useRef, useState } from "react";

import Avatar from "../../common/Avatar/Avatar";
import Button from "../../common/Button/Button";
import Icon from "../../common/Icon/Icon";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";

import avatarImage from "../../../assets/Avatar/a.png";

import sendDark from "../../../assets/icons/Dark/Send.svg";
import sendLight from "../../../assets/icons/Light/Send.svg";

import { createPost } from "../../../services/postApi";
import { uploadImage } from "../../../services/userApi";

interface CreatePostProps {
  onPostCreated: () => void | Promise<void>;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userAvatar = user?.image || avatarImage;

  const handleImagePick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
    event.target.value = "";
  };

  const handleCreatePost = async () => {
    const trimmedContent = content.trim();

    if (isSubmitting) {
      return;
    }

    if (!trimmedContent && !selectedImage) {
      setError("Please add text or choose an image.");
      return;
    }

    if (trimmedContent && trimmedContent.length < 5 && !selectedImage) {
      setError("Content is too short, minimum 5 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const uploadedImageId = selectedImage
        ? await uploadImage(selectedImage)
        : null;

      await createPost({
        content: trimmedContent || "",
        image: uploadedImageId,
      });

      setContent("");
      setSelectedImage(null);
      setPreviewUrl((currentUrl) => {
        if (currentUrl) {
          URL.revokeObjectURL(currentUrl);
        }

        return null;
      });

      window.dispatchEvent(new Event("posts:changed"));

      await onPostCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="
          mb-6
          w-full
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          p-6
          text-[var(--color-content-primary)]
          shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          transition-colors
          duration-200
          dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)]
        "
      >
        <div className="flex items-center gap-3">
          <Avatar
            src={userAvatar}
            alt={user?.name || "User avatar"}
            size={40}
          />

          <textarea
            placeholder="What's on your mind?"
            rows={1}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);

              if (error) {
                setError(null);
              }
            }}
            className="
              min-h-10
              flex-1
              resize-none
              border-0
              bg-transparent
              p-0
              !text-[14px]
              !leading-10
              text-[var(--color-content-primary)]
              outline-none
              placeholder:text-[var(--color-content-secondary)]
            "
          />
        </div>

        {previewUrl ? (
          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]">
            <img
              src={previewUrl}
              alt="Selected for post"
              className="max-h-64 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="relative mt-20">
          {error ? (
            <p
              className="
                absolute
                bottom-2
                left-0
                font-normal
                text-[12px]
                text-red-500
              "
            >
              {error}
            </p>
          ) : null}

          <div
            className="
              border-t
              border-[var(--color-border)]
            "
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleImagePick}
              aria-label="Add image to post"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-background)]
                text-[var(--color-content-primary)]
                transition-colors
                hover:bg-[var(--color-hover)]
              "
            >
              <Icon name="Image" size={18} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={handleCreatePost}
            disabled={isSubmitting}
            className="
              !h-[28px]
              !min-h-[26px]
              !w-[68px]
              !rounded-[6px]
              !px-4
              !py-2
            "
            icon={
              isSubmitting ? (
                <span
                  aria-label="Posting"
                  className="
                    block
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-current
                    border-r-transparent
                  "
                />
              ) : (
                <img
                  src={theme === "dark" ? sendDark : sendLight}
                  alt=""
                  className="h-4 w-4"
                />
              )
            }
          >
            <span className="text-[14px] font-normal">Post</span>
          </Button>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
