import { useEffect } from "react";
import type { ReactNode } from "react";

import DecorativeBubbles from "../../DecorativeBubbles/DecorativeBubbles";

type ActionModalVariant =
  | "success"
  | "danger"
  | "warning"
  | "info";

interface ActionModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  buttonText: string;
  onAction: () => void;
  onClose: () => void;
  variant?: ActionModalVariant;
  icon?: ReactNode;
  autoCloseMs?: number;
}

const ActionModal = ({
  isOpen,
  title,
  description,
  buttonText,
  onAction,
  onClose,
  variant = "success",
  icon,
  autoCloseMs = 5000,
}: ActionModalProps) => {
  // =========================================
  // Auto Close
  // =========================================

  useEffect(() => {
    if (!isOpen || autoCloseMs <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, autoCloseMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) {
    return null;
  }

  // =========================================
  // Default Icon
  // =========================================

  const renderDefaultIcon = () => {
    if (variant === "danger") {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 9V13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          <path
            d="M12 17H12.01"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          <path
            d="M10.3 4.7L3.6 16.3C2.8 17.7 3.8 19.5 5.4 19.5H18.6C20.2 19.5 21.2 17.7 20.4 16.3L13.7 4.7C12.9 3.3 11.1 3.3 10.3 4.7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg
        width="34"
        height="34"
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
    );
  };

  // =========================================
  // Variant Glow
  // =========================================

  const getGlowClasses = () => {
    switch (variant) {
      case "danger":
        return {
          background: "bg-red-500/10",
          border: "border-red-500/30",
          shadow:
            "shadow-[0_0_30px_rgba(239,68,68,0.18)]",
        };

      case "warning":
        return {
          background: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          shadow:
            "shadow-[0_0_30px_rgba(234,179,8,0.18)]",
        };

      case "info":
        return {
          background: "bg-blue-500/10",
          border: "border-blue-500/30",
          shadow:
            "shadow-[0_0_30px_rgba(59,130,246,0.18)]",
        };

      default:
        return {
          background: "bg-green-500/10",
          border: "border-green-500/30",
          shadow:
            "shadow-[0_0_30px_rgba(34,197,94,0.18)]",
        };
    }
  };

  const glow = getGlowClasses();

  return (
    <>
      {/* =====================================================
          DESKTOP / TABLET
          ===================================================== */}

      <div
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
        onClick={onClose}
      >
        <div
          className="
            relative
            w-full
            max-w-[380px]
            rounded-2xl
            border
            border-[var(--color-border)]
            bg-[var(--color-card)]
            px-5
            py-7
            shadow-2xl
            sm:px-8
            sm:py-8
          "
          onClick={(event) => event.stopPropagation()}
        >
          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              absolute
              right-4
              top-4
              z-30
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

          <div className="mb-6 flex justify-center">
            <div
              className={`
                relative
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-background-primary)]
                text-[var(--color-content-primary)]
                ${glow.shadow}
              `}
            >
              <DecorativeBubbles />

              <span
                className={`
                  pointer-events-none
                  absolute
                  inset-[-7px]
                  z-0
                  rounded-full
                  blur-[10px]
                  ${glow.background}
                `}
              />

              <span
                className={`
                  pointer-events-none
                  absolute
                  inset-0
                  z-10
                  rounded-full
                  border
                  ${glow.border}
                `}
              />

              <span className="relative z-20">
                {icon ?? renderDefaultIcon()}
              </span>
            </div>
          </div>

          {/* Content */}

          <div className="text-center">
            <h2
              className="
                text-[20px]
                font-bold
                leading-tight
                text-[var(--color-content-primary)]
                sm:text-[22px]
              "
            >
              {title}
            </h2>

            {description && (
              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[420px]
                  text-[14px]
                  leading-5
                  text-[var(--color-content-secondary)]
                  sm:text-[15px]
                  sm:leading-6
                "
              >
                {description}
              </p>
            )}
          </div>

          {/* Action */}

          <button
            type="button"
            onClick={onAction}
            className="
              mt-6
              flex
              h-12
              w-full
              cursor-pointer
              items-center
              justify-center
              rounded-[10px]
              bg-black
              text-[15px]
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
            {buttonText}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE POPUP
          ===================================================== */}

      <div
        className="
          fixed
          inset-x-0
          top-[16px]
          z-[100]
          flex
          justify-center
          px-3
          pb-4
          pointer-events-none
          md:hidden
        "
      >
        <div
          role="status"
          aria-live="polite"
          className={`
            pointer-events-auto
            relative
            flex
            min-h-[58px]
            w-full
            max-w-[360px]
            items-center
            rounded-[14px]
            border
            border-[var(--color-border)]
            bg-[var(--color-card)]
            px-3
            py-2.5
            pr-10
            ${glow.shadow}
          `}
        >
          {/* Glow Border */}

          <span
            className={`
              pointer-events-none
              absolute
              inset-[-2px]
              rounded-[14px]
              border
              ${glow.border}
            `}
          />

          {/* Icon */}

          <div
            className={`
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
              ${glow.border}
              ${glow.background}
              text-[var(--color-content-primary)]
            `}
          >
            {icon ?? (
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {variant === "danger" ? (
                  <>
                    <path
                      d="M12 9V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M12 17H12.01"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M10.3 4.7L3.6 16.3C2.8 17.7 3.8 19.5 5.4 19.5H18.6C20.2 19.5 21.2 17.7 20.4 16.3L13.7 4.7C12.9 3.3 11.1 3.3 10.3 4.7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </>
                ) : (
                  <path
                    d="M5 12.5L9.5 17L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            )}
          </div>

          {/* Divider */}

          <div
            className="
              mx-2.5
              h-7
              w-px
              shrink-0
              bg-[var(--color-border)]
            "
          />

          {/* Message */}

          <div className="relative z-10 min-w-0 flex-1">
            <p
              className="
                truncate
                text-[12px]
                font-semibold
                leading-5
                text-[var(--color-content-primary)]
              "
            >
              {title}
            </p>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              absolute
              right-2
              top-1/2
              z-20
              flex
              h-7
              w-7
              -translate-y-1/2
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
    </>
  );
};

export default ActionModal;