import { useState } from "react";

interface EditResult {
  success: boolean;
  message: string;
}

interface EditableContentProps {
  initialContent: string;
  onSave: (content: string) => Promise<EditResult>;
  onCancel: () => void;
  onMessage?: (message: string) => void;
  rows?: number;
  saveLabel?: string;
  savingLabel?: string;
}

const EditableContent = ({
  initialContent,
  onSave,
  onCancel,
  onMessage,
  rows = 3,
  saveLabel = "Save",
  savingLabel = "Saving...",
}: EditableContentProps) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const trimmed = content.trim();

    if (!trimmed || isSaving) {
      return;
    }

    try {
      setIsSaving(true);

      const result = await onSave(trimmed);

      onMessage?.(result.message);

      if (!result.success) {
        return;
      }
    } catch (error) {
      console.error("Failed to save edit:", error);

      onMessage?.(
        error instanceof Error ? error.message : "Failed to save changes.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={rows}
        disabled={isSaving}
        autoFocus
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          px-3
          py-2
          text-[14px]
          text-[var(--color-content-primary)]
          outline-none
          focus:border-[var(--color-content-primary)]
          disabled:opacity-60
        "
      />

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="
            cursor-pointer
            rounded-lg
            px-3
            py-1.5
            text-[13px]
            text-[var(--color-content-secondary)]
            hover:bg-black/5
            dark:hover:bg-white/5
          "
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={!content.trim() || isSaving}
          className="
            cursor-pointer
            rounded-lg
            bg-[var(--color-content-primary)]
            px-3
            py-1.5
            text-[13px]
            font-semibold
            text-[var(--color-card)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSaving ? savingLabel : saveLabel}
        </button>
      </div>
    </div>
  );
};

export default EditableContent;
