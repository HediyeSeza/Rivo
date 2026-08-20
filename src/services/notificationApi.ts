import type { Notification } from "../types/notification";

const BASE_URL = "https://socially-nextjs-six.vercel.app";

interface NotificationsResponse {
  message: string;
  success: boolean;
  data: Notification[];
}

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await fetch(`${BASE_URL}/api/notifications`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const result: NotificationsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
};
