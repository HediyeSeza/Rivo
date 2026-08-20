import { useEffect, useState } from "react";

import NotificationCard from "../NotificationCard/NotificationCard";

import type { Notification } from "../../../types/notification";
import { formatDate } from "../../../utils/formatDate";

import { getNotifications } from "../../../services/notificationApi";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNotifications();

        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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
          time={formatDate(notification.createdAt)}
          avatar={notification.creator.image ?? undefined}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
