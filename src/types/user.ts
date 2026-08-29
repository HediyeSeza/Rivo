export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  avatar?: string;

  _count?: {
    followers: number;
    following: number;
    posts: number;
  };
}

export interface AuthResponse {
  user?: User;

  data?: {
    user?: User;
    session?: {
      token?: string;
      expiresAt?: string;
    };
  };

  token?: string;
  accessToken?: string;
}

export interface AuthApiResponse {
  data?: {
    user?: User;
    session?: {
      token?: string;
      expiresAt?: string;
    };
  };
  user?: User;
  token?: string;
  accessToken?: string;
}