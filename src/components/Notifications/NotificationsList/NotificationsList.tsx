import NotificationCard from "../NotificationCard/NotificationCard";

import type { Notification } from "../../../types/notification";

import { formatDate } from "../../../utils/formatDate";

import EmptyState from "../../common/EmptyState/EmptyState";

import Loading from "../../loading/Loading";

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
      <div
        className="
          flex
          min-h-[300px]
          w-full
          items-center
          justify-center
        "
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          flex
          min-h-[300px]
          w-full
          items-center
          justify-center
          px-6
          py-8
          text-center
          text-[14px]
          text-red-500
        "
      >
        {error}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <EmptyState
        variant="notifications"
        title="No notifications yet"
        description="You're all caught up! When someone interacts with you, you'll see it here."
      />
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
          commentContent={
            notification.comment?.content ?? ""
          }
          time={formatDate(notification.createdAt)}
          avatar={
            notification.creator.image ?? undefined
          }
          read={notification.read}
        />
      ))}
    </div>
  );
};

export default NotificationsList;