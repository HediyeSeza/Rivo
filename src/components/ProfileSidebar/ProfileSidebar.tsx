import Icon from "../common/Icon/Icon";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import avatarImage from "../../assets/Avatar/a.png";

const ProfileSidebar = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  console.log("Sidebar theme:", theme);
  console.log("Sidebar user:", user);

  // اگر کاربری لاگین نکرده باشد، Sidebar نمایش داده نمی‌شود
  if (!user) {
    return null;
  }

  return (
    <aside
      className="
        fixed
        left-6
        top-24
        w-[230px]
        xl:w-[294px]
        2xl:w-[358px]
        rounded-2xl
        border border-[#E5E5E5]
        bg-white
        p-5
        shadow-sm
        transition-colors duration-300
        dark:border-[#262626]
        dark:bg-[#191919]
      "
    >
      <div className="flex items-center justify-center">
        <div className="w-full">

          {/* Profile */}
          <div className="flex flex-col items-center">
            <img
              src={user.avatar || avatarImage}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover"
            />

            <h2 className="mt-3 text-[20px] font-semibold">
              {user.name}
            </h2>

            {user.username ? (
              <span className="mt-1 text-[14px] text-gray-500">
                @{user.username}
              </span>
            ) : null}
          </div>

          {/* Bio */}
          {user.bio ? (
            <p className="mt-3 text-center text-[14px] text-gray-600 dark:text-gray-300">
              {user.bio}
            </p>
          ) : null}

          {/* Divider */}
          <div className="my-8 h-px w-full bg-[#E5E5E5]" />

          {/* Followers */}
          <div className="flex items-center justify-between text-center">
            <div>
              <p className="text-[18px] font-medium">
                {user.followingCount ?? 0}
              </p>

              <span className="text-[14px] text-gray-500">
                Followings
              </span>
            </div>

            <div>
              <p className="text-[18px] font-medium">
                {user.followersCount ?? 0}
              </p>

              <span className="text-[14px] text-gray-500">
                Followers
              </span>
            </div>

            <div>
              <p className="text-[18px] font-medium">
                {user.postsCount ?? 0}
              </p>

              <span className="text-[14px] text-gray-500">
                Posts
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-[#E5E5E5]" />

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-500">
            <Icon name="Location" size={20} />

            <span className="text-[14px]">
              {user.location || "No location"}
            </span>
          </div>

          {/* Website */}
          <div className="mt-4 flex items-center gap-2 text-gray-500">
            <Icon name="Link" size={20} />

            {user.website ? (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="text-[14px] underline"
              >
                {user.website}
              </a>
            ) : (
              <span className="text-[14px]">
                No website
              </span>
            )}
          </div>

        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;