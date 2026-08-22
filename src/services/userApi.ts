import { api } from "./api";

export interface User {
  id: string;
  username?: string;
  name: string;
  email: string;
  avatar?: string;
}

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

export interface FollowResponse {
  message: string;
  success: boolean;
  data?: unknown;
}

export const toggleFollowUser = async (userId: string) => {
  const response = await api.patch(`/api/users/${userId}`);

  return response;
};
