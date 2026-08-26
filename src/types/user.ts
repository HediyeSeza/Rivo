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
