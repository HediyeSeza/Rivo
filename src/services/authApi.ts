import { api } from "./api";

import type { AuthResponse, User } from "../types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export const getUser = (
  response: AuthResponse | User,
): User => {
  if ("user" in response && response.user) {
    return response.user;
  }

  if ("data" in response && response.data) {
    return response.data;
  }

  return response as User;
};

export const login = async (
  payload: LoginPayload,
) => {
  const response = await api.post<
    AuthResponse | User
  >(
    "/api/authentication/login",
    payload,
  );

  const data = response.data;

  return {
    user: getUser(data),
    token:
      "token" in data
        ? data.token || data.accessToken
        : undefined,
  };
};

export const register = async (
  payload: RegisterPayload,
) => {
  const response = await api.post<
    AuthResponse | User
  >(
    "/api/authentication/register",
    payload,
  );

  const data = response.data;

  return {
    user: getUser(data),
    token:
      "token" in data
        ? data.token || data.accessToken
        : undefined,
  };
};

export const getSession = async () => {
  const response = await api.get<
    AuthResponse | User
  >("/api/authentication/session");

  return response.data;
};

export const logout = () =>
  api.post<void>(
    "/api/authentication/logout",
  );