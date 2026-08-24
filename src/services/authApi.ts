import { api } from "./api";
import type { AuthResponse, User } from "../types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export const getUser = (response: AuthResponse | User): User =>
  "user" in response && response.user ? response.user : (response as User);

export const login = async (payload: LoginPayload) => {
  const response = await api.post<AuthResponse | User>(
    "/api/authentication/login",
    payload,
  );
  return {
    user: getUser(response),
    token:
      "token" in response ? response.token || response.accessToken : undefined,
  };
};

export const register = async (payload: RegisterPayload) => {
  const response = await api.post<AuthResponse | User>(
    "/api/authentication/register",
    payload,
  );
  return {
    user: getUser(response),
    token:
      "token" in response ? response.token || response.accessToken : undefined,
  };
};

export const getSession = () =>
  api.get<AuthResponse | User>("/api/authentication/session");

export const logout = () => api.post<void>("/api/authentication/logout");
