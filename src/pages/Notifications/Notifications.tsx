import { useEffect, useState } from "react";

import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import NotificationsList from "../../components/Notifications/NotificationsList/NotificationsList";

import { useAuth } from "../../context/AuthContext";

import type { Notification } from "../../types/notification";

import {
  getNotifications,
  markNotificationsAsRead,
} from "../../services/notificationApi";

const Notifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingAsRead, setMarkingAsRead] = useState(false);

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

    void fetchNotifications();
  }, []);

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  );

  const unreadCount = unreadNotifications.length;

  const handleMarkAsRead = async () => {
    if (unreadCount === 0 || markingAsRead) {
      return;
    }

    try {
      setMarkingAsRead(true);

      const ids = unreadNotifications.map(
        (notification) => notification.id,
      );

      await markNotificationsAsRead(ids);

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      );
    } catch (error) {
      console.error(
        "Failed to mark notifications as read:",
        error,
      );
    } finally {
      setMarkingAsRead(false);
    }
  };

  return (
    <main
      className="
        mx-auto
        grid
        w-full
        max-w-[1450px]
        grid-cols-1
        gap-6
        px-4
        pt-24
        md:grid-cols-[350px_minmax(0,1fr)]
      "
    >
      {/* Left Sidebar */}
      <aside className="hidden min-w-0 md:block">
        <ProfileSidebar user={user} />
      </aside>

      {/* Notifications */}
      <section
        className="
          min-w-0
          w-full
          h-[450px]
          flex
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-card)]
          p-7
          text-[var(--color-content-primary)]
          shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          transition-colors
          duration-200
          dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-bold">
            Notifications
          </h1>

          <div className="flex items-center gap-5">
            <span
              className="
                text-[14px]
                text-[var(--color-content-secondary)]
              "
            >
              {unreadCount} unread
            </span>

            <button
              type="button"
              onClick={handleMarkAsRead}
              disabled={unreadCount === 0 || markingAsRead}
              className="
                cursor-pointer
                text-[14px]
                font-medium
                text-[var(--color-content-primary)]
                transition-opacity
                duration-200
                hover:opacity-70
                disabled:cursor-default
                disabled:opacity-40
              "
            >
              {markingAsRead
                ? "Marking..."
                : "Mark as read"}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="mt-7 min-h-0 flex-1 overflow-y-auto">
          <NotificationsList
            notifications={notifications}
            loading={loading}
            error={error}
          />
        </div>
      </section>
    </main>
  );
};

export default Notifications;