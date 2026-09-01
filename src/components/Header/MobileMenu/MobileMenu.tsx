import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../common/Button/Button";

import Icon from "../../common/Icon/Icon";

import ConfirmModal from "../../common/Modal/ConfirmModal";

import { useAuth } from "../../../context/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();

  const { signOut, isAuthenticated } = useAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  // =========================================
  // Logout
  // =========================================

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      onClose();
      await signOut();
      navigate("/login");
    } finally {
      setShowLogoutModal(false);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className="pointer-events-none fixed inset-0 z-[100] md:hidden">
        {/* Overlay */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isOpen ? "pointer-events-auto opacity-100" : "opacity-0"
          }`}
        />

        {/* Menu */}
        <div
          className={`pointer-events-auto absolute right-0 top-0 z-10 h-[100rem] w-[75%] bg-white px-5 py-6 transition-transform duration-300 ease-in-out dark:bg-black ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between">
            <h2
              className="
                text-[20px]
                font-semibold
                text-[var(--color-content-primary)]
              "
            >
              Menu
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                cursor-pointer
                text-2xl
                font-light
                text-gray-600
                dark:text-gray-400
              "
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Menu Items */}
          <div className="mt-12 flex flex-col items-center gap-7">
            {/* Home */}
            <Button
              type="button"
              className="w-full"
              variant="secondary"
              icon={<Icon name="Home" size={18} />}
              onClick={() => handleNavigate("/")}
            >
              <span className="text-[16px] font-normal">Home</span>
            </Button>

            {isAuthenticated && (
              <>
                {/* Notifications */}
                <Button
                  type="button"
                  className="w-full"
                  variant="secondary"
                  icon={<Icon name="notif" size={18} />}
                  onClick={() => handleNavigate("/notifications")}
                >
                  <span className="text-[16px] font-normal">Notifications</span>
                </Button>

                {/* Profile */}
                <Button
                  type="button"
                  className="w-full"
                  variant="secondary"
                  icon={<Icon name="Person" size={18} />}
                  onClick={() => handleNavigate("/profile")}
                >
                  <span className="text-[16px] font-normal">Profile</span>
                </Button>
              </>
            )}

            {isAuthenticated ? (
              /* Logout */
              <Button
                type="button"
                className="w-full"
                variant="secondary"
                icon={<Icon name="Logout" size={18} />}
                onClick={handleLogoutClick}
                aria-label="Log out"
              >
                <span>Log out</span>
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full"
                variant="primary"
                onClick={() => handleNavigate("/login")}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <ConfirmModal
          title="Log out?"
          message="Are you sure you want to log out?"
          confirmLabel="Log out"
          isLoading={isLoggingOut}
          onCancel={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
};

export default MobileMenu;
