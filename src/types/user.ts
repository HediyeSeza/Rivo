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
  token?: string;
  accessToken?: string;
}

export interface AuthApiResponse {
  data?: AuthResponse;
  user?: User;
  token?: string;
  accessToken?: string;
}
