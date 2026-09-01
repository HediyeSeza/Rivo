import { useState } from "react";

import Icon from "../../common/Icon/Icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

const SearchBar = ({
  value,
  onChange,
  onClear,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <div
      className={`
        flex
        h-11
        w-full
        items-center
        gap-3
        rounded-xl
        border
        px-4
        transition-all
        duration-200
        ${
          isFocused
            ? `
              border-[var(--color-content-primary)]
              shadow-[0_0_0_3px_rgba(128,128,128,0.15)]
            `
            : `
              border-[var(--color-border)]
            `
        }
        bg-[var(--color-background-secondary)]
      `}
    >
      <Icon
        name="Search"
        size={20}
        className="shrink-0"
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search users..."
        aria-label="Search users"
        className="
          min-w-0
          flex-1
          bg-transparent
          text-[14px]
          text-[var(--color-content-primary)]
          outline-none
          placeholder:text-[var(--color-content-secondary)]
        "
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="
            flex
            h-7
            w-7
            shrink-0
            cursor-pointer
            items-center
            justify-center
            rounded-full
            text-[var(--color-content-secondary)]
            transition
            hover:bg-black/5
            dark:hover:bg-white/5
          "
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;