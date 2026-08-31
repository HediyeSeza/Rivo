import { useEffect, useState } from "react";

import Icon from "../common/Icon/Icon";
import Avatar from "../common/Avatar/Avatar";
import FollowButton from "../FollowButton/FollowButton";
import { Link } from "react-router-dom";

import type { User } from "../../types/user";
import { getRecommendedUsers } from "../../services/userApi";

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
      console.error("Failed to fetch recommended users:", error);

      setError("Failed to load recommended users.");
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        await fetchRecommendedUsers();
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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

        <h2 className="text-[16px] font-bold">Recommended users</h2>
      </div>

      {/* Loading */}
      {loading && (
        <div
          className="
            mt-5
            py-4
            text-center
            text-[13px]
            text-[var(--color-content-secondary)]
          "
        >
          Loading...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          className="
            mt-5
            py-4
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
            mt-5
            py-4
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
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              {/* Avatar */}
              <Avatar
                src={user.image ?? undefined}
                alt={`${user.name} avatar`}
                size={40}
              />

              {/* User Info */}
              <Link to={`/profile/${user.id}`} className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold hover:underline">
                  {user.name}
                </p>
                <p className="truncate text-[12px] text-[var(--color-content-secondary)]">
                  {user._count?.followers ?? 0} followers
                </p>
              </Link>

              {/* Follow / Unfollow */}
              <FollowButton
                userId={user.id}
                onFollowSuccess={fetchRecommendedUsers}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedUsers;
