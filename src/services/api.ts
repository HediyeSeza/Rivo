const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://socially-nextjs-six.vercel.app";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const request = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      "VITE_API_URL is not configured. Add it to the project's .env file.",
      0,
    );
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("rivo_token")
        ? { Authorization: `Bearer ${localStorage.getItem("rivo_token")}` }
        : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `API Error: ${response.status}`;

    try {
      const errorBody = (await response.json()) as {
        message?: string;
        error?: string;
        detail?: string;
      };
      message =
        errorBody.message || errorBody.error || errorBody.detail || message;
    } catch {
      // Some error responses do not contain JSON.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
};

export const api = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "GET",
    }),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};

export default api;