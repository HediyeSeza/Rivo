import type { FC } from "react";

import lightRivoLogo from "../../assets/icons/Light/Rivo.png";
import darkRivoLogo from "../../assets/icons/Dark/Rivo.png";
import { useTheme } from "../../context/ThemeContext";

const Loading: FC = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const logo = isDark ? darkRivoLogo : lightRivoLogo;

  return (
    <div
      role="status"
      aria-label="Loading page"
      className={`flex min-h-[calc(100dvh-64px)] w-full items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-[#09090b]" : "bg-white"
      }`}
    >
      <div className="flex -translate-y-30 flex-col items-center gap-3 text-center">
        <div className="relative flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
          <div
            className={`absolute inset-0 animate-spin rounded-full border-2 border-l-transparent ${
              isDark
                ? "border-b-white border-r-white border-t-white"
                : "border-b-black border-r-black border-t-black"
            }`}
          />

          <img
            src={logo}
            alt="Rivo logo"
            className="relative z-10 h-4 w-5 object-contain sm:h-5 sm:w-7"
          />
        </div>

        <div className="flex flex-col items-center">
          <h2
            className={`text-[14px] font-bold sm:text-base ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Loading Page
          </h2>

          <p
            className={`mt-0.5 text-[9px] font-light sm:mt-1 sm:text-[11px] ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Please wait...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;





