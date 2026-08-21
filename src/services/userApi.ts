import { api } from "./api";

export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

interface UserResponse {
  message: string;
  success: boolean;
  data: User;
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<UserResponse>(`/api/users/${id}`);
  return response.data;
};