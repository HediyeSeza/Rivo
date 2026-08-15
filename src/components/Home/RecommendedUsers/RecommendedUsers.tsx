import Button from "../../common/Button/Button";
import Icon from "../../common/Icon/Icon";

const users = [
  {
    id: 1,
    name: "Amin",
    username: "amin",
    followers: 120,
  },
  {
    id: 2,
    name: "Sara",
    username: "sara",
    followers: 86,
  },
  {
    id: 3,
    name: "Matin",
    username: "matin",
    followers: 54,
  },
];

const RecommendedUsers = () => {
  return (
    <section
      className="
        w-full
        rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-card)]
        p-4
        text-[var(--color-content-primary)]
        transition-colors duration-200
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon name="Person" size={18} />

        <h2 className="text-[16px] font-bold">
          Recommended for you
        </h2>
      </div>

      {/* Users */}
      <div className="mt-5 flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="
              flex
              items-center
              gap-3
            "
          >
            {/* Temporary Avatar */}
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border border-[var(--color-border)]
              "
            >
              <Icon name="Person" size={18} />
            </div>

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold">
                {user.name}
              </p>

              <p
                className="
                  truncate
                  text-[12px]
                  text-[var(--color-content-secondary)]
                "
              >
                @{user.username}
              </p>
            </div>

            {/* Follow */}
            <Button
              variant="secondary"
              className="shrink-0"
            >
              <span className="text-[12px] font-normal">
                Follow
              </span>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedUsers;