import NotificationCard from "../NotificationCard/NotificationCard";

import type { Notification } from "../../../types/notification";
import { formatDate } from "../../../utils/formatDate";

const notifications: Notification[] = [
  {
    id: "1",
    type: "like",
    actor: {
      id: "1",
      name: "Hediye Seza",
      username: "hediyeseza",
    },
    post: {
      id: "101",
      content: "آقای کماشبان 2",
    },
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "2",
    type: "like",
    actor: {
      id: "2",
      name: "Hediye Seza",
      username: "hediyeseza",
    },
    post: {
      id: "102",
      content: "آقای کماشبان 2",
    },
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "3",
    type: "comment",
    actor: {
      id: "3",
      name: "Hediye Seza",
      username: "hediyeseza",
    },
    post: {
      id: "103",
      content: "dvd,dmv...",
    },
    createdAt: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
    isRead: true,
  },
];

const NotificationsList = () => {
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          type={notification.type}
          username={notification.actor.username}
          postContent={notification.post.content}
          time={formatDate(notification.createdAt)}
          avatar={notification.actor.avatar}
        />
      ))}
    </div>
  );
};

export default NotificationsList;