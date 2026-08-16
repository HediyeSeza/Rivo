import type { FC } from "react";

import lightRivoLogo from "../../assets/icons/Light/Rivo.png";
import darkRivoLogo from "../../assets/icons/Dark/Rivo.png";

interface LoadingProps {
  isFullScreen?: boolean;
}

const Loading: FC<LoadingProps> = ({ isFullScreen = true }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`flex items-center justify-center bg-white transition-colors duration-300 dark:bg-[#09090b] ${
        isFullScreen
          ? "fixed inset-0 z-[9999] min-h-screen w-full"
          : "h-full w-full py-10"
      }`}
    >
      <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-b-black border-l-transparent border-r-black border-t-black dark:border-b-white dark:border-r-white dark:border-t-white" />

        <img
          src={lightRivoLogo}
          alt="Rivo logo"
          className="relative z-10 h-14 w-14 object-contain dark:hidden sm:h-16 sm:w-16"
        />

        <img
          src={darkRivoLogo}
          alt="Rivo logo"
          className="relative z-10 hidden h-14 w-14 object-contain dark:block sm:h-16 sm:w-16"
        />
      </div>
    </div>
  );
};

export default Loading;


