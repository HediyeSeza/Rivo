import Icon from "../common/Icon/Icon";
import { useTheme } from "../../context/ThemeContext";

const ProfileSidebar = () => {
  const { theme } = useTheme();

  console.log("Sidebar theme:", theme);

  console.log("Sidebar theme:", theme);
  return (
    <aside className="fixed w-[356px] rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm dark:bg-[#0A0A0A] dark:border-[#262626]">
      <div className="flex justify-center items-center">
        <div className="w-full">
          {/* Profile */}
          <div className="flex flex-col items-center">
            <img
              src="src\assets\Avatar\a.png"
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />

            <h2 className="mt-3 text-[20px] font-semibold">Pedram</h2>

            <span className="mt-1 text-[14px] text-gray-500">iran</span>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-[#E5E5E5]" />

          {/* Followers */}
          <div className="flex items-center justify-between text-center">
            <div>
              <p className="text-[18px] font-medium">2</p>

              <span className="text-[14px] text-gray-500">Followings</span>
            </div>

            <div>
              <p className="text-[18px] font-medium">2</p>

              <span className="text-[14px] text-gray-500">Followers</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-[#E5E5E5]" />

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-500">
            <Icon name="Location" size={20} />

            <span className="text-[14px]">No location</span>
          </div>

          {/* Website */}
          <div className="mt-4 flex items-center gap-2 text-gray-500">
            <Icon name="Link" size={20} />

            <span className="text-[14px]">No website</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
