export interface User {
  id: string | number;

  name: string;
  email: string;
  emailVerified: boolean;
  username?: string;
  avatar?: string;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;

  createdAt: string;
  updatedAt: string;

  postsCount?: number;
  followersCount?: number;
  followingCount?: number;

  isFollowing?: boolean;
}

export type UpdateProfilePayload = Pick<
  User,
  "name" | "bio" | "location" | "website"
>;

export interface AuthResponse {
  user?: User;
  token?: string;
  accessToken?: string;
}
