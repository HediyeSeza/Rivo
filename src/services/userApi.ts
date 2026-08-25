import { api } from "./api";
import type { Post } from "./postApi";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;

  _count?: {
    followers: number;
    followings: number;
    posts: number;
  };
}

interface UserResponse {
  message: string;
  success: boolean;
  data?: User;
}

interface RecommendedUsersResponse {
  message: string;
  success: boolean;
  data?: User[];
}

interface PostsResponse {
  message?: string;
  success?: boolean;
  data?: Post[];
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<UserResponse | User>(
    `/api/users/${id}`,
  );

  if ("data" in response && response.data) {
    return response.data;
  }

  return response as User;
};

export const getRecommendedUsers = async (): Promise<User[]> => {
  const response = await api.get<
    RecommendedUsersResponse | User[]
  >("/api/users/recommend");

  if (Array.isArray(response)) {
    return response;
  }

  return response.data ?? [];
};

export interface FollowResponse {
  message: string;
  success: boolean;
  data?: unknown;
}

export const toggleFollowUser = async (
  userId: string,
): Promise<FollowResponse> => {
  const response = await api.patch<FollowResponse>(
    `/api/users/${userId}`,
  );

  return response;
};

/* =========================
   Profile Posts
========================= */

export type ProfilePost = Post;

export const getUserPosts = async (
  userId: string,
): Promise<ProfilePost[]> => {
  const response = await api.get<
    PostsResponse | ProfilePost[]
  >(`/api/users/${userId}/posts`);

  if (Array.isArray(response)) {
    return response;
  }

  return response.data ?? [];
};

/* =========================
   Profile Likes
========================= */

export const getUserLikedPosts = async (
  userId: string,
): Promise<ProfilePost[]> => {
  const response = await api.get<
    PostsResponse | ProfilePost[]
  >(`/api/users/${userId}/likes`);

  if (Array.isArray(response)) {
    return response;
  }

  return response.data ?? [];
};