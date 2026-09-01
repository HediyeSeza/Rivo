import type { FC } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
  title?: string;
  message?: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  title = "Delete post?",
  message = "Are you sure you want to delete this post?",
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}) => {
  const modal = (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/30
        px-4
      "
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="
          w-full
          max-w-90
          rounded-xl
          border
          border-(--color-border)
          bg-(--color-card)
          p-5
          text-(--color-content-primary)
          shadow-lg
        "
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="confirm-modal-title"
          className="text-[16px] font-bold"
        >
          {title}
        </h2>

        <p
          className="
            mt-2
            text-[14px]
            text-(--color-content-secondary)
          "
        >
          {message}
        </p>

        <div
          className="
            mt-5
            flex
            justify-end
            gap-2
          "
        >
          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-lg
              px-3
              py-1.5
              text-[14px]
              font-medium
              text-(--color-content-secondary)
              transition
              hover:bg-black/5
              hover:text-(--color-content-primary)
              dark:hover:bg-white/5
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              rounded-lg
              bg-red-500
              px-3
              py-1.5
              text-[14px]
              font-medium
              text-white
              transition
              hover:bg-red-600
            "
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default ConfirmModal;