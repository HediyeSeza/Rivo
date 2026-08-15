export type NotificationType =
  | "like"
  | "comment"
  | "follow";

export interface NotificationActor {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface NotificationPost {
  id: string;
  content: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  actor: NotificationActor;
  post: NotificationPost;
  createdAt: string;
  isRead: boolean;
}