import Avatar from "../../common/Avatar/Avatar";
import FollowUserButton from "./FollowUserButton";

import type { User } from "../../../types/user";

import { getUsernameFromEmail } from "../../../utils/getUsernameFromEmail";

type ConnectionTab = "followers" | "following";

interface ConnectionUserItemProps {
  user: User;
  tab: ConnectionTab;
  currentUserId?: string;
  onFollowChange?: (
    userId: string,
    isFollowing: boolean,
  ) => void;
}

const ConnectionUserItem = ({
  user,
  tab,
  currentUserId,
  onFollowChange,
}: ConnectionUserItemProps) => {
  const username = getUsernameFromEmail(user.email);


  const initialFollowing = tab === "following";

  
  const isCurrentUser =
    Boolean(currentUserId) &&
    currentUserId === user.id;

  return (
    <div
      className="
        flex
        w-full
        items-center
        gap-3
        py-2
      "
    >
      {/* Avatar */}
      <Avatar
        src={user.image ?? undefined}
        alt={`${user.name} avatar`}
        size={48}
      />

      {/* User information */}
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
            mt-0.5
            truncate
            text-[13px]
            text-[var(--color-content-secondary)]
          "
        >
          {username}
        </p>
      </div>

      {/* Follow / Unfollow */}
      {!isCurrentUser && (
        <FollowUserButton
          userId={user.id}
          initialFollowing={initialFollowing}
          onFollowChange={onFollowChange}
        />
      )}
    </div>
  );
};

export default ConnectionUserItem;