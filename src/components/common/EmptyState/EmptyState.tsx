import type { ReactNode } from "react";

type EmptyStateVariant =
  | "posts"
  | "likes"
  | "notifications"
  | "search"
  | "followers"
  | "following";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title: string;
  description?: string;
  icon?: ReactNode;
}

const EmptyState = ({
  variant = "posts",
  title,
  description,
  icon,
}: EmptyStateProps) => {
  const renderDefaultIcon = () => {
    if (variant === "likes") {
      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-(--color-content-primary)"
          aria-hidden="true"
        >
          <path
            d="
              M20.84 4.61
              C19.32 3.09 16.84 3.09 15.32 4.61
              L12 7.93
              L8.68 4.61
              C7.16 3.09 4.68 3.09 3.16 4.61
              C1.61 6.16 1.61 8.68 3.16 10.23
              L12 19.07
              L20.84 10.23
              C22.39 8.68 22.39 6.16 20.84 4.61Z
            "
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (variant === "notifications") {
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-(--color-content-primary)"
          aria-hidden="true"
        >
          <path
            d="
              M18 9
              C18 5.69 15.76 3 12 3
              C8.24 3 6 5.69 6 9
              V13
              L4 17
              H20
              L18 13
              V9Z
            "
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M10 20C10.5 20.6 11.2 21 12 21C12.8 21 13.5 20.6 14 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (variant === "search") {
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-(--color-content-primary)"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <path
            d="M16 16L21 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (variant === "followers" || variant === "following") {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-(--color-content-primary)"
          aria-hidden="true"
        >
          {/* Main person */}
          <circle
            cx="12"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <path
            d="M6.5 19C6.5 15.96 8.96 13.5 12 13.5C15.04 13.5 17.5 15.96 17.5 19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Left person */}
          <circle
            cx="5.5"
            cy="9"
            r="2"
            stroke="currentColor"
            strokeWidth="1.3"
          />

          <path
            d="M2.5 17C2.5 14.79 3.84 13 5.5 13C6.32 13 7.06 13.41 7.58 14.08"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Right person */}
          <circle
            cx="18.5"
            cy="9"
            r="2"
            stroke="currentColor"
            strokeWidth="1.3"
          />

          <path
            d="M16.42 14.08C16.94 13.41 17.68 13 18.5 13C20.16 13 21.5 14.79 21.5 17"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Small rays */}
          <path
            d="M12 2V3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          <path
            d="M8.5 3L9.2 4.2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          <path
            d="M15.5 3L14.8 4.2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-(--color-content-primary)"
        aria-hidden="true"
      >
        <path
          d="M6 3.5H14L18 7.5V20.5H6V3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        <path
          d="M14 3.5V7.5H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        <path
          d="M9 11H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M9 14.5H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div
      className="
        flex
        min-h-[280px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-(--color-border)
        bg-(--color-card)
        px-6
        py-8
        text-center
      "
    >
      <div className="relative mb-5">
        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-(--color-background-secondary)
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-(--color-border)
              bg-(--color-background-primary)
              shadow-sm
            "
          >
            {icon ?? renderDefaultIcon()}
          </div>
        </div>

        {/* Decorative dots */}
        <span
          className="
            absolute
            -left-1
            top-7
            h-2
            w-2
            rounded-full
            bg-(--color-content-muted)
            opacity-50
          "
        />

        <span
          className="
            absolute
            -right-1
            top-2
            h-1.5
            w-1.5
            rounded-full
            bg-(--color-content-muted)
            opacity-40
          "
        />

        <span
          className="
            absolute
            bottom-1
            left-2
            h-1.5
            w-1.5
            rounded-full
            bg-(--color-content-muted)
            opacity-40
          "
        />

        {/* Likes rays */}
        {variant === "likes" && (
          <>
            <span
              className="
                absolute
                left-1/2
                -top-3
                h-3
                w-px
                -translate-x-1/2
                bg-(--color-content-muted)
                opacity-60
              "
            />

            <span
              className="
                absolute
                left-[calc(50%-9px)]
                -top-2
                h-2
                w-px
                rotate-[-25deg]
                bg-(--color-content-muted)
                opacity-60
              "
            />

            <span
              className="
                absolute
                left-[calc(50%+9px)]
                -top-2
                h-2
                w-px
                rotate-[25deg]
                bg-(--color-content-muted)
                opacity-60
              "
            />
          </>
        )}

        {/* Connections rays */}
        {(variant === "followers" || variant === "following") && (
          <>
            <span
              className="
                absolute
                left-1/2
                -top-3
                h-3
                w-px
                -translate-x-1/2
                bg-(--color-content-muted)
                opacity-60
              "
            />

            <span
              className="
                absolute
                left-[calc(50%-9px)]
                -top-2
                h-2
                w-px
                rotate-[-25deg]
                bg-(--color-content-muted)
                opacity-60
              "
            />

            <span
              className="
                absolute
                left-[calc(50%+9px)]
                -top-2
                h-2
                w-px
                rotate-[25deg]
                bg-(--color-content-muted)
                opacity-60
              "
            />
          </>
        )}
      </div>

      <h2
        className="
          text-[18px]
          font-bold
          text-(--color-content-primary)
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            mt-2
            max-w-[340px]
            text-[14px]
            leading-5
            text-(--color-content-secondary)
          "
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;