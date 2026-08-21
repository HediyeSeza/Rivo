import NotificationCard from "../NotificationCard/NotificationCard";

import type { Notification } from "../../../types/notification";
import { formatDate } from "../../../utils/formatDate";

interface NotificationsListProps {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const NotificationsList = ({
  notifications,
  loading,
  error,
}: NotificationsListProps) => {
  if (loading) {
    return (
      <div className="py-8 text-center text-[14px] text-[var(--color-content-secondary)]">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-[14px] text-red-500">{error}</div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center text-[14px] text-[var(--color-content-secondary)]">
        No notifications yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          type={notification.type}
          username={notification.creator.name}
          postContent={notification.post?.content ?? ""}
          commentContent={notification.comment?.content ?? ""}
          time={formatDate(notification.createdAt)}
          avatar={notification.creator.image ?? undefined}
          read={notification.read}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
