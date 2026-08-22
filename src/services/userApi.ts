import api from "./api";
import type { Post } from "../types/post";
import type { UpdateProfilePayload, User } from "../types/user";

export const userApi = {
  // Get user profile by username
  getUserByUsername: async (username: string): Promise<User> => {
    return api.get<User>(`/api/users/${username}/profile`);
  },

  // Get user by id
  getUserById: async (id: string | number): Promise<User> => {
    return api.get<User>(`/api/users/${id}`);
  },

  // Get user's posts
  getUserPosts: async (id: string | number): Promise<Post[]> => {
    return api.get<Post[]>(`/api/users/${id}/posts`);
  },

  // Get posts liked by user
  getUserLikes: async (id: string | number): Promise<Post[]> => {
    return api.get<Post[]>(`/api/users/${id}/likes`);
  },

  // Follow / Unfollow user
  toggleFollow: async (id: string | number): Promise<void> => {
    await api.patch(`/api/users/${id}`);
  },

  // Update profile
  updateProfile: async (
    id: string | number,
    data: UpdateProfilePayload,
  ): Promise<User> => {
    return api.put<User>(`/api/users/${id}`, data);
  },



// Get recommended users 
  getRecommendedUsers: async (): Promise<User[]> => {
    const response = await api.get<{
      message: string;
      success: boolean;
      data: User[];
    }>("/api/users/recommend");
    return response.data;
  },
};