import Button from "../../common/Button/Button";
import Icon from "../../common/Icon/Icon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div className="fixed inset-0 z-[100] md:hidden pointer-events-none ">
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "opacity-0"
        }`}
      />

      {/* Menu */}
      <div
        className={`absolute right-0 top-0 z-10 h-[100rem] w-[75%] bg-white px-5 py-6
    transition-transform duration-300 ease-in-out
    pointer-events-auto
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-semibold">Menu</h2>

          <button
            onClick={onClose}
            className="text-2xl font-light text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-12 flex flex-col items-center gap-7">
          <Button
            className="w-full"
            variant="secondary"
            icon={<Icon name="Home" size={18} />}
          >
            <span className="font-normal text-[16px]">Home</span>
          </Button>

          <Button
            className="w-full"
            variant="secondary"
            icon={<Icon name="notif" size={18} />}
          >
            <span className="font-normal text-[16px]">Notifications</span>
          </Button>

          <Button
            className="w-full"
            variant="secondary"
            icon={<Icon name="Person" size={18} />}
          >
            <span className="font-normal text-[16px]">Profile</span>
          </Button>

          <Button
            className="w-full"
            variant="secondary"
            icon={<Icon name="Tash" size={18} />}
          >
            <span></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
