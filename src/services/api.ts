const API_BASE_URL = import.meta.env.VITE_API_URL || "";
export const API_ERROR_EVENT = "rivo:api-error";
export const API_ERROR_MESSAGE = "Something went wrong. Please try again.";

const notifyApiError = () => {
  window.dispatchEvent(new CustomEvent(API_ERROR_EVENT));
};

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
  const token = localStorage.getItem("rivo_token");

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...options.headers,
      },
    });
  } catch (error) {
    notifyApiError();
    throw error;
  }

  if (!response.ok) {
    notifyApiError();
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
