import type { FC } from "react";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center bg-black/30 px-4"
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-post-title"
        className="w-full max-w-90 rounded-xl border border-(--color-border) bg-(--color-card) p-5 text-(--color-content-primary) shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="delete-post-title" className="text-[16px] font-bold">
          Delete post?
        </h2>
        <p className="mt-2 text-[14px] text-(--color-content-secondary)">
          Are you sure you want to delete this post?
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-[14px] text-(--color-content-secondary) transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            No
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-[14px] font-bold text-white transition-colors hover:bg-red-700"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
