import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../common/Logo/Logo";
import Icon from "../common/Icon/Icon";
import Button from "../common/Button/Button";
import MobileMenu from "./MobileMenu/MobileMenu";

import { useTheme } from "../../context/ThemeContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header
      className="
        fixed left-0 right-0 top-0 z-40
        flex h-16 w-full items-center justify-between
        border-b
        border-black/10
        bg-white/80
        backdrop-blur-xl
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#0A0A0A99]
      "
    >
      {/* Logo */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center pl-2"
        aria-label="Go to home"
      >
        <Logo />

        <h1 className="text-xl font-bold text-black dark:text-white">
          ivo
        </h1>
      </button>

      <nav className="relative mr-2 flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="
            flex h-10 w-10 cursor-pointer items-center justify-center
            rounded-xl
            border border-black/10
            bg-transparent
            transition-all duration-200
            hover:bg-black/5
            dark:border-white/10
            dark:hover:bg-white/5
          "
        >
          <Icon
            name={theme === "dark" ? "Moon" : "Light"}
            size={18}
          />
        </button>

        {/* Mobile Menu */}
        <Button
          className="w-0 md:!hidden"
          variant="primary"
          icon={<Icon name="Menu" size={18} />}
          onClick={() => setIsMenuOpen(true)}
        >
          <span />
        </Button>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />

        {/* Home */}
        <Button
          type="button"
          className="!hidden md:!flex"
          variant="secondary"
          icon={<Icon name="Home" size={18} />}
          onClick={() => navigate("/")}
        >
          <span className="text-[14px] font-normal">
            Home
          </span>
        </Button>

        {/* Notifications */}
        <Button
          type="button"
          className="!hidden md:!flex"
          variant="secondary"
          icon={<Icon name="notif" size={18} />}
          onClick={() => navigate("/notifications")}
        >
          <span className="text-[14px] font-normal">
            Notifications
          </span>
        </Button>

        {/* Profile */}
        <Button
          type="button"
          className="!hidden md:!flex"
          variant="secondary"
          icon={<Icon name="Person" size={18} />}
          onClick={() => navigate("/profile")}
        >
          <span className="text-[14px] font-normal">
            Profile
          </span>
        </Button>

        {/* Logout */}
        <Button
          type="button"
          className="!hidden md:!flex"
          variant="secondary"
          icon={<Icon name="Logout" size={18} />}
        >
          <span />
        </Button>
      </nav>
    </header>
  );
}

export default Header;