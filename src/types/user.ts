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
