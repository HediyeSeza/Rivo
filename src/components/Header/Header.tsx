import Logo from "../common/Logo/Logo";
import Icon from "../common/Icon/Icon";
import Button from "../common/Button/Button";
import { useState } from "react";
import MobileMenu from "./MobileMenu/MobileMenu";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="flex w-full h-16 items-center justify-between border border-[#E5E5E5] fixed left-0 right-0 top-0 z-40 bg-white/30 backdrop-blur-xl dark:bg-[#0A0A0A99]">
      <div className="flex items-center pl-2">
        <Logo />
        <h1 className="font-bold text-xl text-[]">ivo</h1>
      </div>

      <nav className="flex items-center gap-4 mr-2 relative">
        <button>
          <div className="flex border border-[#E5E5E5] bg-white hover:bg-gray-100 rounded-md items-center justify-center p-2 drop-shadow-2xl">
            <Icon name="Light" size={16} />
          </div>
        </button>
        <Button
          className="md:!hidden"
          variant="primary"
          icon={<Icon name="Person" size={18} />}
          onClick={() => setIsMenuOpen(true)}
        >
          <span></span>
        </Button>
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <Button
          className="!hidden md:!flex"
          variant="secondary"
          icon={<Icon name="Home" size={18} />}
        >
          <span className="font-normal text-[14px]">Home</span>
        </Button>
        <Button
          className="!hidden md:!flex"
          variant="secondary"
          icon={<Icon name="notif" size={18} />}
        >
          <span className="font-normal text-[14px]">Notification</span>
        </Button>
        <Button
          className="!hidden md:!flex"
          variant="secondary"
          icon={<Icon name="Person" size={18} />}
        >
          <span className="font-normal text-[14px]">Profile</span>
        </Button>
        <Button
          className="!hidden md:!flex w-2 "
          variant="secondary"
          icon={<Icon name="Tash" size={18} />}
        >
          <span></span>
        </Button>
      </nav>
    </header>
  );
}

export default Header;
