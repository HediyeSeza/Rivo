import type { Notification } from "../types/notification";
import { api } from "./api";

interface NotificationsResponse {
  message: string;
  success: boolean;
  data: Notification[];
}

// GET notifications
export const getNotifications = async (): Promise<Notification[]> => {
  const result = await api.get<NotificationsResponse>("/api/notifications");

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
};

// PATCH notifications
export const markNotificationsAsRead = async (ids: string[]): Promise<void> => {
  await api.patch("/api/notifications", { ids });
};
