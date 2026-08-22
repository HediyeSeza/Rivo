export interface User {
  id: string | number;

  name: string;
  email: string;
  username?: string;

  avatar?: string;

  bio?: string;
  location?: string;
  website?: string;

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
