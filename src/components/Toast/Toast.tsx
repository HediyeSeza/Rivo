import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onDone?: () => void;
}

const Toast = ({ message, duration = 5000, onDone }: ToastProps) => {
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
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed
        top-5
        left-1/2
        z-[100]
        flex
        w-auto
        min-w-[260px]
        max-w-[90vw]
        items-center
        justify-start
        gap-3
        rounded-2xl
        border
        border-black/[0.08]
        bg-white/95
        px-4
        py-3
        text-(--color-content-primary)
        backdrop-blur-md
        shadow-[0_8px_30px_rgb(0,0,0,0.06),0_2px_12px_rgba(16,185,129,0.14)]
        dark:border-white/[0.12]
        dark:bg-[#18181b]/95
        dark:shadow-[0_8px_30px_rgb(0,0,0,0.4),0_2px_16px_rgba(16,185,129,0.18)]
        ${isLeaving ? "toast-exit" : "toast-enter"}
      `}
    >
      <span
        className="
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-emerald-500
          text-white
          shadow-[0_0_8px_rgba(16,185,129,0.4)]
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>

      <span className="min-w-0 text-left text-[14px] font-bold leading-5 whitespace-nowrap">
        {message}
      </span>
    </div>
  );
};

export default Toast;
