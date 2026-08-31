import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onDone?: () => void;
}

const Toast = ({
  message,
  duration = 5000,
  onDone,
}: ToastProps) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, duration);

    const removeTimer = window.setTimeout(() => {
      onDone?.();
    }, duration + 250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, [duration, onDone]);

  return (
    <>
{/* =====================================================
    DESKTOP / TABLET
    ===================================================== */}
<div
  role="status"
  aria-live="polite"
  className="
    fixed
    inset-0
    z-[100]
    hidden
    items-center
    justify-center
    bg-black/55
    px-4
    py-6
    backdrop-blur-[2px]
    md:flex
  "
>
  <div
    className={`
      relative
      w-full
      max-w-[380px]
      rounded-[20px]
      border
      border-[var(--color-border)]
      bg-[var(--color-card)]
      px-6
      py-10
      shadow-2xl
      sm:px-10
      sm:py-12
      ${isLeaving ? "toast-desktop-exit" : "toast-desktop-enter"}
    `}
  >
    {/* Close */}
    <button
      type="button"
      onClick={onDone}
      aria-label="Close"
      className="
        absolute
        right-5
        top-5
        flex
        h-8
        w-8
        cursor-pointer
        items-center
        justify-center
        rounded-full
        text-[20px]
        font-medium
        text-[var(--color-content-secondary)]
        transition-colors
        hover:bg-[var(--color-background-secondary)]
        hover:text-[var(--color-content-primary)]
      "
    >
      ×
    </button>

    {/* Icon */}
    <div className="mb-7 flex justify-center">
      <div
        className="
          relative
          flex
          h-[100px]
          w-[100px]
          items-center
          justify-center
          rounded-full
          border
          border-green-500/30
          bg-green-500/10
          text-[var(--color-content-primary)]
          shadow-[0_0_30px_rgba(34,197,94,0.18)]
        "
      >
        <span
          className="
            pointer-events-none
            absolute
            inset-[-8px]
            rounded-full
            bg-green-500/10
            blur-[10px]
          "
        />

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-full
            border
            border-green-500/30
          "
        />

        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12.5L9.5 17L19 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>

    {/* Message */}
    <div className="text-center">
     <h2
  className="
    text-[18px]
    font-semibold
    leading-6
    text-[var(--color-content-primary)]
    sm:text-[19px]
  "
>
  {message}
</h2>
    </div>

    {/* Action Button */}
    <button
      type="button"
      onClick={onDone}
      className="
        mt-8
        flex
        h-14
        w-full
        cursor-pointer
        items-center
        justify-center
        rounded-[10px]
        bg-black
        text-[16px]
        font-semibold
        text-white
        transition-all
        duration-200
        hover:opacity-90
        active:scale-[0.99]
        dark:bg-white
        dark:text-black
      "
    >
      Awesome!
    </button>
  </div>
</div>

      {/* =====================================================
          MOBILE
          ===================================================== */}
      <div
        role="status"
        aria-live="polite"
        className={`
          fixed
          top-5
          left-1/2
          z-[100]
          flex
          w-[calc(100%-32px)]
          max-w-[420px]
          -translate-x-1/2
          items-center
          rounded-[14px]
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          px-3
          py-2.5
          text-[var(--color-content-primary)]
          shadow-[0_8px_30px_rgba(0,0,0,0.08),0_0_18px_rgba(34,197,94,0.12)]
          backdrop-blur-md
          dark:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(34,197,94,0.16)]
          md:hidden
          ${isLeaving ? "toast-exit" : "toast-enter"}
        `}
      >
        {/* Green Glow Border */}
        <span
          className="
            pointer-events-none
            absolute
            inset-[-2px]
            rounded-[14px]
            border
            border-green-500/25
          "
        />

        {/* Icon */}
        <span
          className="
            relative
            z-10
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-green-500/30
            bg-green-500/10
            text-[var(--color-content-primary)]
            shadow-[0_0_18px_rgba(34,197,94,0.16)]
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>

        {/* Divider */}
        <span
          className="
            mx-2.5
            h-7
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
            flex-1
            truncate
            text-left
            text-[13px]
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
            items-center
            justify-center
            rounded-full
            text-[18px]
            text-[var(--color-content-secondary)]
            transition-colors
            hover:bg-[var(--color-background-secondary)]
          "
        >
          ×
        </button>
      </div>
    </>
  );
};

export default Toast;