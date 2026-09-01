import { useState } from "react";

interface ReplyInputProps {
  onCancel: () => void;
  onSubmit: (content: string) => void;
}

const ReplyInput = ({
  onCancel,
  onSubmit,
}: ReplyInputProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    onSubmit(trimmedContent);
    setContent("");
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        }
        placeholder="Write a reply..."
        rows={2}
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          px-4
          py-3
          text-[14px]
          text-[var(--color-content-primary)]
          outline-none
          transition-colors
          duration-200
          placeholder:text-[var(--color-content-muted)]
          focus:border-[var(--color-content-primary)]
        "
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-lg
            px-4
            py-2
            text-[13px]
            font-medium
            text-[var(--color-content-secondary)]
            transition-colors
            hover:bg-black/5
            dark:hover:bg-white/5
          "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="
            rounded-lg
            bg-[var(--color-content-primary)]
            px-4
            py-2
            text-[13px]
            font-semibold
            text-[var(--color-card)]
            transition-opacity
            hover:opacity-80
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;