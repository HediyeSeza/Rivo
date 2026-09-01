import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  duration?: number;
  type?: "success" | "error";
  onDone?: () => void;
}

const Toast = ({
  message,
  duration = 5000,
  type = "success",
  onDone,
}: ToastProps) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const isSuccess = type === "success";

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, Math.max(0, duration - 250));

    const removeTimer = window.setTimeout(() => {
      onDone?.();
    }, duration);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, [duration, onDone]);

  const colorClasses = isSuccess
    ? {
        border: "border-green-500/25",
        iconBorder: "border-green-500/30",
        background: "bg-green-500/10",
        icon: "text-green-600",
        shadow:
          "shadow-[0_8px_30px_rgba(0,0,0,0.12),0_0_18px_rgba(34,197,94,0.12)]",
        darkShadow:
          "dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(34,197,94,0.16)]",
      }
    : {
        border: "border-red-500/25",
        iconBorder: "border-red-500/30",
        background: "bg-red-500/10",
        icon: "text-red-500",
        shadow:
          "shadow-[0_8px_30px_rgba(0,0,0,0.12),0_0_18px_rgba(239,68,68,0.12)]",
        darkShadow:
          "dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(239,68,68,0.16)]",
      };

  const toast = (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed
        inset-x-0
        top-3
        z-[9999]
        flex
        justify-center
        px-4
        pointer-events-none
        translate-x-[105px]
      "
    >
      <div
        className={`
          pointer-events-auto
          relative
          flex
          w-fit
          min-w-[260px]
          max-w-[calc(100vw-32px)]
          items-center
          rounded-[12px]
          border
          bg-[var(--color-card)]
          px-3
          py-2.5
          text-[var(--color-content-primary)]
          backdrop-blur-md
          ${colorClasses.border}
          ${colorClasses.shadow}
          ${colorClasses.darkShadow}
          ${isLeaving ? "toast-exit" : "toast-enter"}
        `}
      >
        {/* Colored Border */}
        <span
          className={`
            pointer-events-none
            absolute
            inset-[-1px]
            rounded-[12px]
            border
            ${colorClasses.border}
          `}
        />

        {/* Icon */}
        <span
          className={`
            relative
            z-10
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            ${colorClasses.iconBorder}
            ${colorClasses.background}
            ${colorClasses.icon}
          `}
        >
          {isSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </span>

        {/* Divider */}
        <span
          className="
            mx-2
            h-6
            w-px
            shrink-0
            bg-[var(--color-border)]
          "
        />

        {/* Message */}
        <span
          className="
            relative
            z-10
            min-w-0
            text-left
            text-[12px]
            font-semibold
            leading-5
            text-[var(--color-content-primary)]
          "
        >
          {message}
        </span>

        {/* Close */}
        <button
          type="button"
          onClick={onDone}
          aria-label="Close"
          className="
            relative
            z-10
            ml-2
            flex
            h-7
            w-7
            shrink-0
            cursor-pointer
            items-center
            justify-center
            rounded-full
            text-[16px]
            text-[var(--color-content-secondary)]
            transition-colors
            hover:bg-[var(--color-background-secondary)]
            hover:text-[var(--color-content-primary)]
          "
        >
          ×
        </button>
      </div>
    </div>
  );

  return createPortal(toast, document.body);
};

export default Toast;