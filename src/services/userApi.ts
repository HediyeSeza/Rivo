import { api } from "./api";
import type { User } from "../types/user";

interface RecommendedUsersResponse {
  message: string;
  success: boolean;
  data: User[];
}

export const getRecommendedUsers = async (): Promise<User[]> => {
  const response = await api.get<RecommendedUsersResponse>(
    "/api/users/recommend",
  );

  return response.data;
};

interface UserResponse {
  message: string;
  success: boolean;
  data: User;
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<UserResponse>(`/api/users/${id}`);

  return response.data;
};
