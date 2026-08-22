import { api } from "./api";
import type { AuthResponse, User } from "../types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

export const getUser = (response: AuthResponse | User): User => {
  const root = asRecord(response) ?? {};
  const data = asRecord(root.data);
  const rootUser = asRecord(root.user);
  const dataUser = data ? asRecord(data.user) : null;

  const candidate = (dataUser ?? rootUser ?? data ?? root) as unknown as User & { _id?: string | number }


  const rawId = candidate?.id ?? candidate?._id;

  if (rawId === undefined || rawId === null || String(rawId).trim() === "") {
    return candidate;
  }

  return {
    ...candidate,
    id: String(rawId),
  };
};

const getToken = (response: AuthResponse | User): string | undefined => {
  const root = asRecord(response);
  if (!root) return undefined;

  const data = asRecord(root.data);
  const candidates = [
    root.token,
    root.accessToken,
    data?.token,
    data?.accessToken,
  ];

  const token = candidates.find(
    (value): value is string =>
      typeof value === "string" && value.trim() !== "",
  );

  return token;
};

export const login = async (payload: LoginPayload) => {
  const response = await api.post<AuthResponse | User>(
    "/api/authentication/login",
    payload,
  );

  return {
    user: getUser(response),
    token: getToken(response),
  };
};

export const register = async (payload: RegisterPayload) => {
  const response = await api.post<AuthResponse | User>(
    "/api/authentication/register",
    payload,
  );

  return {
    user: getUser(response),
    token: getToken(response),
  };
};

export const getSession = () =>
  api.get<AuthResponse | User>("/api/authentication/session");

export const logout = () => api.post<void>("/api/authentication/logout");
