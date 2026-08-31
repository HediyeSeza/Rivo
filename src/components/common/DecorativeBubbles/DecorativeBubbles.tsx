const DecorativeBubbles = () => {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-visible
      "
      aria-hidden="true"
    >
      {/* Top Left - Plus */}
      <span
        className="
          absolute
          left-[18%]
          top-[18%]
          text-[18px]
          font-light
          text-[var(--color-content-secondary)]
          opacity-50
        "
      >
        +
      </span>

      {/* Top Right - Circle */}
      <span
        className="
          absolute
          right-[15%]
          top-[28%]
          h-[10px]
          w-[10px]
          rounded-full
          border-2
          border-[var(--color-content-secondary)]
          opacity-45
        "
      />

      {/* Bottom Left - Diamond */}
      <span
        className="
          absolute
          left-[11%]
          bottom-[27%]
          h-[9px]
          w-[9px]
          rotate-45
          rounded-[2px]
          border-2
          border-[var(--color-content-secondary)]
          opacity-40
        "
      />

      {/* Bottom Right - Small Plus */}
      <span
        className="
          absolute
          right-[14%]
          bottom-[22%]
          text-[15px]
          font-light
          text-green-500
          opacity-45
        "
      >
        +
      </span>
    </div>
  );
};

export default DecorativeBubbles;