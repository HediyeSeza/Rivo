export type NotificationType = "LIKE" | "COMMENT" | "FOLLOW";

export interface NotificationCreator {
  id: string;
  name: string;
  image: string | null;
  email: string;
}

export interface NotificationPost {
  content: string;
}

export interface NotificationComment {
  id?: string;
  content?: string;
}

export interface Notification {
  id: string;
  userId: string;
  creatorId: string;
  postId: string | null;
  commentId: string | null;

  type: NotificationType;

  read: boolean;
  createdAt: string;

  creator: NotificationCreator;

  post: NotificationPost | null;
  comment: NotificationComment | null;
}
