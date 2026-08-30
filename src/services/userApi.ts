import { api } from "./api";

import type { Post } from "./postApi";

import type { User } from "../types/user";

export type { User };

/* =========================
   Response Types
========================= */

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

export interface SearchUsersResponse {
  message: string;
  success: boolean;
  data?: User[];
}

export interface FollowResponse {
  message: string;
  success: boolean;
  data?: unknown;
}

/* =========================
   Profile
========================= */

export interface UpdateProfilePayload {
  name: string;
  bio: string;
  location: string;
  website: string;
  image?: string | null;
}

/* =========================
   Helpers / Image Upload
========================= */

const UUID_PATTERN =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

const extractImageId = (value: unknown): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    return trimmed.match(UUID_PATTERN)?.[0] ?? null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;

  const keys = [
    "id",
    "uuid",
    "file",
    "image",
    "url",
    "data",
    "result",
  ];

  for (const key of keys) {
    const found = extractImageId(record[key]);

    if (found) {
      return found;
    }
  }

  try {
    return JSON.stringify(value).match(UUID_PATTERN)?.[0] ?? null;
  } catch {
    return null;
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<unknown>(
    "/api/upload",
    formData,
  );

  const imageId = extractImageId(response);

  if (!imageId) {
    throw new Error(
      "Could not upload photo. Please try again.",
    );
  }

  return imageId;
};

/* =========================
   Get User
========================= */

export const getUserById = async (
  id: string,
): Promise<User> => {
  const response = await api.get<UserResponse | User>(
    `/api/users/${id}`,
  );

  if ("data" in response && response.data) {
    return response.data;
  }

  return response as User;
};

/* =========================
   Update User Profile
========================= */

export const updateUserProfile = async (
  userId: string,
  data: UpdateProfilePayload,
): Promise<User> => {
  await api.put<UserResponse | User>(
    `/api/users/${userId}`,
    data,
  );

  return getUserById(userId);
};

/* =========================
   Recommended Users
========================= */

export const getRecommendedUsers = async (): Promise<User[]> => {
  const response = await api.get<
    RecommendedUsersResponse | User[]
  >("/api/users/recommend");

  if (Array.isArray(response)) {
    return response;
  }

  return response.data ?? [];
};

/* =========================
   User Search
========================= */

export const searchUsers = async (
  query: string,
): Promise<User[]> => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const response = await api.get<SearchUsersResponse>(
    `/api/users/search?q=${encodeURIComponent(trimmedQuery)}`,
  );

  if (!response.success) {
    throw new Error(
      response.message || "Failed to search users.",
    );
  }

  return response.data ?? [];
};

/* =========================
   Follow / Unfollow
========================= */

export const toggleFollowUser = async (
  userId: string,
): Promise<FollowResponse> => {
  const response = await api.patch<FollowResponse>(
    `/api/users/${userId}`,
  );

  window.dispatchEvent(new Event("profile:changed"));

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