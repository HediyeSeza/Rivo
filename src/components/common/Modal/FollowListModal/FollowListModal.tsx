import { useEffect, useState } from "react";

import { useAuth } from "../../../../context/AuthContext";

import Avatar from "../../Avatar/Avatar";

import FollowUserButton from "../../../Profile/ProfileConnections/FollowUserButton";

import EmptyState from "../../EmptyState/EmptyState";

import Loading from "../../../loading/Loading";

import {
  getUserFollowers,
  getUserFollowings,
} from "../../../../services/userApi";

import type { User } from "../../../../types/user";

type FollowTab = "followers" | "following";

interface FollowListModalProps {
  isOpen: boolean;
  userId: string;
  initialTab: FollowTab;
  onClose: () => void;
}

const FollowListModal = ({
  isOpen,
  userId,
  initialTab,
  onClose,
}: FollowListModalProps) => {
  const { user: authUser } = useAuth();

  const [activeTab, setActiveTab] = useState<FollowTab>(initialTab);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [followedUserIds, setFollowedUserIds] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen || !authUser?.id) {
      return;
    }

    const loadCurrentUserFollowing = async () => {
      try {
        const followingUsers = await getUserFollowings(authUser.id);

        setFollowedUserIds(
          new Set(followingUsers.map((user) => user.id)),
        );
      } catch (error) {
        console.error(
          "Failed to load current user followings:",
          error,
        );
      }
    };

    void loadCurrentUserFollowing();
  }, [isOpen, authUser?.id]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isCancelled = false;

    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setUsers([]);

        const startTime = Date.now();

        const data =
          activeTab === "followers"
            ? await getUserFollowers(userId)
            : await getUserFollowings(userId);

        /*
         * حتی اگر API سریع جواب بدهد،
         * Loading حداقل 700ms نمایش داده می‌شود.
         */
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(700 - elapsedTime, 0);

        if (remainingTime > 0) {
          await new Promise((resolve) => {
            window.setTimeout(resolve, remainingTime);
          });
        }

        if (isCancelled) {
          return;
        }

        setUsers(data);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        console.error("Failed to load follow list:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load users.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, activeTab, userId]);

  const handleFollowChange = (
    changedUserId: string,
    isFollowing: boolean,
  ) => {
    setFollowedUserIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (isFollowing) {
        nextIds.add(changedUserId);
      } else {
        nextIds.delete(changedUserId);
      }

      return nextIds;
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        px-4
      "
      onClick={onClose}
    >
      <div
        className="
          flex
          h-[min(600px,calc(100vh-32px))]
          w-full
          max-w-[500px]
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          shadow-xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex
            h-14
            shrink-0
            items-center
            justify-between
            border-b
            border-[var(--color-border)]
            px-5
          "
        >
          <h2
            className="
              text-[16px]
              font-semibold
              text-[var(--color-content-primary)]
            "
          >
            Connections
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex
              h-9
              w-9
              cursor-pointer
              items-center
              justify-center
              rounded-full
              text-[22px]
              text-[var(--color-content-secondary)]
              transition-colors
              hover:bg-black/5
              dark:hover:bg-white/5
            "
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div
          className="
            grid
            shrink-0
            grid-cols-2
            border-b
            border-[var(--color-border)]
          "
        >
          <button
            type="button"
            onClick={() => setActiveTab("followers")}
            className={`
              relative
              cursor-pointer
              py-3
              text-[14px]
              font-medium
              transition-colors
              ${
                activeTab === "followers"
                  ? "text-[var(--color-content-primary)]"
                  : "text-[var(--color-content-secondary)]"
              }
            `}
          >
            Followers

            {activeTab === "followers" && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-0.5
                  w-16
                  -translate-x-1/2
                  rounded-full
                  bg-[var(--color-content-primary)]
                "
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("following")}
            className={`
              relative
              cursor-pointer
              py-3
              text-[14px]
              font-medium
              transition-colors
              ${
                activeTab === "following"
                  ? "text-[var(--color-content-primary)]"
                  : "text-[var(--color-content-secondary)]"
              }
            `}
          >
            Following

            {activeTab === "following" && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-0.5
                  w-16
                  -translate-x-1/2
                  rounded-full
                  bg-[var(--color-content-primary)]
                "
              />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1">
          {/* Loading */}
          {isLoading && (
            <div
              className="
                flex
                h-full
                min-h-[300px]
                items-center
                justify-center
                px-5
              "
            >
              <Loading />
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div
              className="
                flex
                h-full
                min-h-[300px]
                items-center
                justify-center
                px-5
                text-center
                text-[14px]
                text-red-500
              "
            >
              {error}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && users.length === 0 && (
            <EmptyState
              variant={
                activeTab === "followers"
                  ? "followers"
                  : "following"
              }
              title={
                activeTab === "followers"
                  ? "No followers yet"
                  : "Not following anyone yet"
              }
              description={
                activeTab === "followers"
                  ? "When people follow you, they’ll appear here."
                  : "People you follow will appear here."
              }
            />
          )}

          {/* Users */}
          {!isLoading && !error && users.length > 0 && (
            <div className="flex flex-col">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-[var(--color-border)]
                    px-5
                    py-3
                    last:border-b-0
                  "
                >
                  <Avatar
                    src={user.image ?? undefined}
                    alt={`${user.name} avatar`}
                    size={44}
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
                      {user.name}
                    </p>

                    <p
                      className="
                        truncate
                        text-[12px]
                        text-[var(--color-content-secondary)]
                      "
                    >
                      @{user.username ?? user.email.split("@")[0]}
                    </p>
                  </div>

                  <FollowUserButton
                    userId={user.id}
                    initialFollowing={followedUserIds.has(user.id)}
                    isFollower={activeTab === "followers"}
                    onFollowChange={handleFollowChange}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowListModal;