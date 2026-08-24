import { api } from "./api";
import type { AuthApiResponse, AuthResponse, User } from "../types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

const unwrapResponse = (
  response: AuthApiResponse | User,
): AuthResponse | User =>
  "data" in response && response.data ? response.data : response;

export const getUser = (response: AuthApiResponse | User): User => {
  const data = unwrapResponse(response);
  return "user" in data && data.user ? data.user : (data as User);
};

const getToken = (response: AuthApiResponse | User) => {
  const data = unwrapResponse(response);
  return "token" in data ? data.token || data.accessToken : undefined;
};

export const login = async (payload: LoginPayload) => {
  const response = await api.post<AuthApiResponse | User>(
    "/api/authentication/login",
    payload,
  );
  return {
    user: getUser(response),
    token: getToken(response),
  };
};

export const register = async (payload: RegisterPayload) => {
  const response = await api.post<AuthApiResponse | User>(
    "/api/authentication/register",
    payload,
  );
  return {
    user: getUser(response),
    token: getToken(response),
  };
};

export const getSession = () =>
  api.get<AuthApiResponse | User>("/api/authentication/session");

export const logout = () => api.post<void>("/api/authentication/logout");
