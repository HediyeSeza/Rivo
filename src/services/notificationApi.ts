import type { Notification } from "../types/notification";

const BASE_URL = "https://socially-nextjs-six.vercel.app";

interface NotificationsResponse {
  message: string;
  success: boolean;
  data: Notification[];
}

// GET notifications
export const getNotifications = async (): Promise<Notification[]> => {
  const response = await fetch(`${BASE_URL}/api/notifications`, {
    credentials: "include",
  });

  const result: NotificationsResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch notifications");
  }

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
};

// PATCH notifications
export const markNotificationsAsRead = async (ids: string[]): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/notifications`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to mark notifications as read");
  }
};
