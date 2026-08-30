import { useEffect, useState } from "react";

import Avatar from "../../common/Avatar/Avatar";

import {
  getUserFollowers,
  getUserFollowings,
} from "../../../services/userApi";

import type { User } from "../../../types/user";

type ConnectionTab = "followers" | "following";

interface ProfileConnectionsProps {
  userId: string;
  initialTab?: ConnectionTab;
}

const ProfileConnections = ({
  userId,
  initialTab = "followers",
}: ProfileConnectionsProps) => {
  const [activeTab, setActiveTab] =
    useState<ConnectionTab>(initialTab);

  const [followers, setFollowers] = useState<User[]>([]);
  const [followings, setFollowings] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConnections = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [followersData, followingsData] =
          await Promise.all([
            getUserFollowers(userId),
            getUserFollowings(userId),
          ]);

        setFollowers(followersData);
        setFollowings(followingsData);
      } catch (error) {
        console.error(
          "Failed to load profile connections:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load connections.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadConnections();
  }, [userId]);

  const activeUsers =
    activeTab === "followers"
      ? followers
      : followings;

  return (
    <section
      className="
        w-full
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-card)]
        shadow-sm
      "
    >
      {/* Tabs */}
      <div
        className="
          flex
          border-b
          border-[var(--color-border)]
        "
      >
        <button
          type="button"
          onClick={() => setActiveTab("followers")}
          className={`
            flex-1
            cursor-pointer
            px-4
            py-4
            text-[14px]
            font-semibold
            transition-colors
            ${
              activeTab === "followers"
                ? "border-b-2 border-[var(--color-content-primary)] text-[var(--color-content-primary)]"
                : "text-[var(--color-content-secondary)]"
            }
          `}
        >
          Followers
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("following")}
          className={`
            flex-1
            cursor-pointer
            px-4
            py-4
            text-[14px]
            font-semibold
            transition-colors
            ${
              activeTab === "following"
                ? "border-b-2 border-[var(--color-content-primary)] text-[var(--color-content-primary)]"
                : "text-[var(--color-content-secondary)]"
            }
          `}
        >
          Following
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading && (
          <div
            className="
              py-8
              text-center
              text-[14px]
              text-[var(--color-content-secondary)]
            "
          >
            Loading...
          </div>
        )}

        {!isLoading && error && (
          <div
            className="
              py-8
              text-center
              text-[14px]
              text-red-500
            "
          >
            {error}
          </div>
        )}

        {!isLoading &&
          !error &&
          activeUsers.length === 0 && (
            <div
              className="
                py-8
                text-center
                text-[14px]
                text-[var(--color-content-secondary)]
              "
            >
              {activeTab === "followers"
                ? "No followers yet."
                : "Not following anyone yet."}
            </div>
          )}

        {!isLoading &&
          !error &&
          activeUsers.length > 0 && (
            <div className="flex flex-col gap-4">
              {activeUsers.map((connectionUser) => (
                <div
                  key={connectionUser.id}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <Avatar
                    src={connectionUser.image ?? undefined}
                    alt={`${connectionUser.name} avatar`}
                    size={48}
                  />

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        truncate
                        text-[14px]
                        font-semibold
                        text-[var(--color-content-primary)]
                      "
                    >
                      {connectionUser.name}
                    </p>

                    <p
                      className="
                        truncate
                        text-[13px]
                        text-[var(--color-content-secondary)]
                      "
                    >
                      {connectionUser.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </section>
  );
};

export default ProfileConnections;