import type { FC } from "react";

interface SuccessModalProps {
  message: string;
}

const SuccessModal: FC<SuccessModalProps> = ({ message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed
        left-1/2
        top-[18px]
        z-[100]
        flex
        w-[calc(100%-32px)]
        max-w-[300px]
        -translate-x-1/2
        items-center
        justify-start
        gap-3
        rounded-xl
        border
        border-[#E5E5E5]
        bg-white
        px-5
        pr-2
        py-3
        text-left
        text-(--color-content-primary)
        shadow-sm
        transition-colors
        duration-200
        dark:border-[#313131]
        dark:bg-[#191919]
      "
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
          border
          border-[#E5E5E5]
          text-[10px]
          font-bold
          leading-none
          text-(--color-content-primary)
          dark:border-[#313131]
        "
      >
        ✔
      </span>

      <span
        className="
          min-w-0
          text-left
          text-[14px]
          font-bold
          leading-5
          whitespace-nowrap
        "
      >
        {message}
      </span>
    </div>
  );
};

export default SuccessModal;