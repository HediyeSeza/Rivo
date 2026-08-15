import Avatar from "../../common/Avatar/Avatar";
import Button from "../../common/Button/Button";
import { useTheme } from "../../../context/ThemeContext";

import avatarImage from "../../../assets/Avatar/a.png";

import sendDark from "../../../assets/icons/Dark/Send.svg";
import sendLight from "../../../assets/icons/Light/Send.svg";

const CreatePost = () => {
  const { theme } = useTheme();

  return (
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
      {/* Top */}
      <div className="flex items-center gap-3">
        <Avatar
          src={avatarImage}
          alt="User avatar"
          size={40}
        />

        <textarea
          placeholder="What's on your mind?"
          rows={1}
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

      {/* Divider */}
      <div
        className="
          mt-12
          border-t
          border-[var(--color-border)]
        "
      />

      {/* Post Button */}
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="primary"
          size="large"
          className="
             !h-[28px]
            !min-h-[26px]
            !w-[68px]
            !rounded-[6px]
            !px-4
            !py-2
          "
          icon={
            <img
              src={theme === "dark" ? sendDark : sendLight}
              alt=""
              className="h-4 w-4"
            />
          }
        >
          <span className="text-[14px] font-normal">
            Post
          </span>
        </Button>
      </div>
    </section>
  );
};

export default CreatePost;