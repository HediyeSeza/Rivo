import type { User } from "../../../types/user";

import SearchUserCard from "../SearchUserCard/SearchUserCard";

interface SearchResultsProps {
  users: User[];
  query: string;
  followingIds?: string[];
  isLoading?: boolean;
  error?: string | null;
}

const SearchResults = ({
  users,
  query,
  followingIds = [],
  isLoading = false,
  error = null,
}: SearchResultsProps) => {
  if (!query.trim()) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {isLoading && (
        <div
          className="
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-background-secondary)]
            px-4
            py-6
            text-center
            text-sm
            text-[var(--color-content-secondary)]
          "
        >
          Searching...
        </div>
      )}

      {!isLoading && error && (
        <div
          className="
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-background-secondary)]
            px-4
            py-6
            text-center
            text-sm
            text-[var(--color-content-secondary)]
          "
        >
          {error}
        </div>
      )}

      {!isLoading && !error && users.length === 0 && (
        <div
          className="
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-background-secondary)]
            px-4
            py-6
            text-center
            text-sm
            text-[var(--color-content-secondary)]
          "
        >
          No users found.
        </div>
      )}

      {!isLoading && !error && users.length > 0 && (
        <div className="flex w-full flex-col gap-3">
          {users.map((user) => {
            const isFollowing = followingIds.includes(
              user.id,
            );

            return (
              <SearchUserCard
                key={user.id}
                user={user}
                initialFollowing={isFollowing}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;