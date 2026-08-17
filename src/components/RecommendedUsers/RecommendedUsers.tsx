import Button from "../../components/common/Button/Button";

const recommendedUsers = [
  {
    id: 1,
    username: "Amin",
    followers: 0,
  },
  {
    id: 2,
    username: "salar",
    followers: 1,
  },
  {
    id: 3,
    username: "naem-brm",
    followers: 4,
  },
];

const RecommendedUsers = () => {
  return (
    <aside
      className="
    fixed
    right-4
    top-24
    w-[250px]
    xl:w-[294px]
    2xl:w-[358px]
    h-[280px]
    rounded-2xl
    border border-[#E5E5E5]
    bg-white
    p-5
    shadow-sm
    transition-colors duration-300
    dark:border-white/10
    dark:bg-[#191919]
  "
    >
      <h2 className="text-[20px] font-semibold">Recommended users</h2>

      <div className="mt-7 flex flex-col gap-5">
        {recommendedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-3"
          >
            {/* User */}
            <div className="flex min-w-0 items-center gap-3">
              <img
                src="/profile.png"
                alt={user.username}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />

              <div className="min-w-0">
                <p className="truncate text-[16px] font-medium">
                  {user.username}
                </p>

                <p className="text-[14px] text-gray-500">
                  {user.followers} followers
                </p>
              </div>
            </div>

            {/* Follow */}
            <Button variant="secondary" size="small">
              <span className="text-[14px]">Follow</span>
            </Button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RecommendedUsers;
