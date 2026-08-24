export interface User {
  id: string | number;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
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
