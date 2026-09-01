import { useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import Logo from "../common/Logo/Logo";

import Icon from "../common/Icon/Icon";

import Button from "../common/Button/Button";

import MobileMenu from "./MobileMenu/MobileMenu";

import SearchBar from "../Search/SearchBar/SearchBar";

import ConfirmModal from "../common/Modal/ConfirmModal";

import { useTheme } from "../../context/ThemeContext";

import { useAuth } from "../../context/AuthContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const { signOut, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") ?? "";

  const handleSearchChange = (value: string) => {
    const trimmedValue = value.trimStart();

    /*
     * Empty search
     *
     * اگر کاربر تمام متن سرچ را پاک کرد،
     * query از URL حذف می‌شود و به Home برمی‌گردیم.
     */
    if (!trimmedValue.trim()) {
      setSearchParams({});
      navigate("/");
      return;
    }

    /*
     * If we are already on the search page,
     * only update the query parameter.
     */
    if (window.location.pathname === "/search") {
      setSearchParams({
        q: trimmedValue,
      });
      return;
    }

    /*
     * If we are on another page,
     * navigate to search and pass the query
     * in the same navigation.
     */
    navigate({
      pathname: "/search",
      search: `?q=${encodeURIComponent(trimmedValue)}`,
    });
  };

  const handleSearchClear = () => {
    /*
     * Clear search query from URL
     * and return to Home.
     */
    setSearchParams({});
    navigate("/");
  };

  // =========================================
  // Logout
  // =========================================

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    await handleSignOut();
  };

  return (
    <>
      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-40
          flex
          h-16
          w-full
          items-center
          gap-4
          px-4
          shadow-sm
          backdrop-blur-lg
          transition-all
          duration-300
          dark:border-white/10
          dark:bg-[#0A0A0A99]
          sm:px-5
          lg:px-6
        "
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            flex
            shrink-0
            cursor-pointer
            items-center
            gap-1
          "
          aria-label="Go to home"
        >
          <Logo />

          <h1
            className="
              text-xl
              font-bold
              text-[var(--color-content-primary)]
            "
          >
            Rivo
          </h1>
        </button>

        {/* Navigation */}
        <nav
          className="
            ml-auto
            flex
            shrink-0
            items-center
            gap-1
            sm:gap-2
            lg:gap-3
          "
        >
          {/* Desktop Search */}
          <div
            className="
            mx-auto
            hidden
            min-w-0
            lg:min-w-[400px]
            xl:min-w-[500px]
            flex-1
            lg:block
            md:max-w-[420px]
            lg:max-w-[580px]
            xl:max-w-[620px]
            2xl:max-w-[680px]
          "
          >
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
            />
          </div>

          {/* Mobile Search */}
          <button
            type="button"
            onClick={() => navigate("/search")}
            aria-label="Search"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-[var(--color-content-primary)]
              transition
              duration-200
              hover:bg-black/5
              dark:hover:bg-white/5
              lg:hidden
            "
          >
            <Icon name="Search" size={20} />
          </button>

          {/* Theme Toggle */}
          <div
            className="
              shrink-0
              rounded-xl
              border
              border-[var(--color-border)]
            "
          >
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                flex
                h-10
                w-10
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-xl
                bg-[var(--color-background-secondary)]
                transition-all
                duration-200
                hover:bg-black/5
                dark:hover:bg-white/5
              "
            >
              <Icon name={theme === "dark" ? "Moon" : "Light"} size={18} />
            </button>
          </div>

          {/* Mobile Menu */}
          <Button
            className="w-0 md:!hidden"
            variant="primary"
            icon={<Icon name="Menu" size={18} reverseTheme className="pl-2" />}
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
            variant="pure"
            icon={<Icon name="Home" size={18} />}
            onClick={() => navigate("/")}
          >
            <span className="text-[14px] font-normal">Home</span>
          </Button>

          {isAuthenticated && (
            <>
              {/* Notifications */}
              <Button
                type="button"
                className="!hidden md:!flex"
                variant="pure"
                icon={<Icon name="notif" size={18} />}
                onClick={() => navigate("/notifications")}
              >
                <span className="text-[14px] font-normal">Notifications</span>
              </Button>

              {/* Profile */}
              <Button
                type="button"
                className="!hidden md:!flex"
                variant="pure"
                icon={<Icon name="Person" size={18} />}
                onClick={() => navigate("/profile")}
              >
                <span className="text-[14px] font-normal">Profile</span>
              </Button>
            </>
          )}

          {isAuthenticated ? (
            <>
              {/* Logout */}
              <Button
                type="button"
                className="!hidden md:!flex"
                variant="pure"
                icon={<Icon name="Logout" size={18} />}
                onClick={() => setShowLogoutModal(true)}
                aria-label="Log out"
              >
                <span />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              className="!hidden md:!flex"
              variant="primary"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          )}
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <ConfirmModal
          title="Log out?"
          message="Are you sure you want to log out?"
          confirmLabel="Log out"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
}

export default Header;
