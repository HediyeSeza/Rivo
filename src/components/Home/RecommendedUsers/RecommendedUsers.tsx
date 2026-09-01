import { useEffect, useState } from "react";

import Icon from "../../common/Icon/Icon";

import FollowButton from "../../FollowButton/FollowButton";

import type { User } from "../../../types/user";

import { getRecommendedUsers } from "../../../services/userApi";

const CDN_BASE =
  "https://1p5nep1spk.ucarecd.net";

const resolveAvatarUrl = (
  image: string | null | undefined,
) => {
  if (!image) {
    return null;
  }

  if (
    image.startsWith("http") ||
    image.startsWith("blob:") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  const uuid = image.replace(/^\/+|\/+$/g, "");

  return `${CDN_BASE}/${uuid}/`;
};

const RecommendedUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendedUsers = async () => {
    try {
      setError(null);

      const data = await getRecommendedUsers();

      setUsers(data);
    } catch (error) {
      console.error(
        "Failed to fetch recommended users:",
        error,
      );

      setUsers([]);

      setError("Failed to load recommended users.");
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadUsers = async () => {
      setLoading(true);

      const startTime = Date.now();

      try {
        await fetchRecommendedUsers();

        /*
         * حتی اگر API خیلی سریع جواب بده،
         * لودینگ حداقل 700ms نمایش داده می‌شود.
         */
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(
          700 - elapsedTime,
          0,
        );

        if (remainingTime > 0) {
          await new Promise<void>((resolve) => {
            window.setTimeout(resolve, remainingTime);
          });
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section
      className="
        w-full
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-card)]
        p-4
        text-[var(--color-content-primary)]
        transition-colors
        duration-200
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon name="Person" size={18} />

        <h2 className="text-[16px] font-bold">
          Recommended for you
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <div
          className="
            flex
            min-h-[90px]
            items-center
            justify-center
          "
        >
          <div
            className="
              h-6
              w-6
              animate-spin
              rounded-full
              border-2
              border-[var(--color-border)]
              border-t-[var(--color-content-primary)]
            "
            aria-label="Loading recommended users"
          />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          className="
            py-5
            text-center
            text-[13px]
            text-red-500
          "
        >
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && users.length === 0 && (
        <div
          className="
            py-5
            text-center
            text-[13px]
            text-[var(--color-content-secondary)]
          "
        >
          No recommendations available.
        </div>
      )}

      {/* Users */}
      {!loading && !error && users.length > 0 && (
        <div className="mt-5 flex flex-col gap-4">
          {users.map((user) => {
            const avatarUrl = resolveAvatarUrl(
              user.image,
            );

            return (
              <div
                key={user.id}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                {/* Avatar */}
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-[var(--color-border)]
                  "
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={`${user.name} avatar`}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <Icon
                      name="Person"
                      size={18}
                    />
                  )}
                </div>

                {/* User Info */}
                <div className="min-w-0 flex-1">
                  <p
                    className="
                      truncate
                      text-[14px]
                      font-bold
                    "
                  >
                    {user.name}
                  </p>

                  <p
                    className="
                      truncate
                      text-[12px]
                      text-[var(--color-content-secondary)]
                    "
                  >
                    {user._count?.followers ?? 0} followers
                  </p>
                </div>

                {/* Follow */}
                <FollowButton
                  userId={user.id}
                  onFollowSuccess={
                    fetchRecommendedUsers
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecommendedUsers;