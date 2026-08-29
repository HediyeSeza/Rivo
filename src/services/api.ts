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

interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  retryOn?: number[];
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 2,
  retryDelay: 1000,
  retryOn: [408, 429, 500, 502, 503, 504],
};

const request = async <T>(
  endpoint: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = DEFAULT_RETRY_OPTIONS,
): Promise<T> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      "VITE_API_URL is not configured. Add it to the project's .env file.",
      0,
    );
  }

  const maxRetries =
    retryOptions.maxRetries ?? DEFAULT_RETRY_OPTIONS.maxRetries ?? 2;
  const retryDelay =
    retryOptions.retryDelay ?? DEFAULT_RETRY_OPTIONS.retryDelay ?? 1000;
  const retryOn = retryOptions.retryOn ?? DEFAULT_RETRY_OPTIONS.retryOn ?? [];

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const token = localStorage.getItem("rivo_token");
      const isFormData = options.body instanceof FormData;
      const headers = new Headers(options.headers);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (isFormData) {
        headers.delete("Content-Type");
      } else if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers,
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

        const error = new ApiError(message, response.status);
        lastError = error;

        // Retry if status code is in retryOn list and we have retries left
        if (retryOn.includes(response.status) && attempt < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay * (attempt + 1)),
          );
          continue;
        }

        throw error;
      }

      if (response.status === 204) {
        return undefined as T;
      }

      const raw = await response.text();

      if (!raw) {
        return undefined as T;
      }

      try {
        return JSON.parse(raw) as T;
      } catch {
        return raw as T;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // For network errors, retry if we have retries left
      if (error instanceof TypeError && attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * (attempt + 1)),
        );
        continue;
      }

      throw lastError;
    }
  }

  throw lastError || new ApiError("Unknown error occurred", 0);
};

const serializeBody = (body?: unknown): BodyInit | undefined => {
  if (body === undefined) return undefined;
  if (body instanceof FormData) return body;
  return JSON.stringify(body);
};

export const api = {
  get: <T>(endpoint: string, retryOptions?: RetryOptions) =>
    request<T>(
      endpoint,
      {
        method: "GET",
      },
      retryOptions,
    ),

  post: <T>(endpoint: string, body?: unknown, retryOptions?: RetryOptions) =>
    request<T>(
      endpoint,
      {
        method: "POST",
        body: serializeBody(body),
      },
      retryOptions,
    ),

  put: <T>(endpoint: string, body?: unknown, retryOptions?: RetryOptions) =>
    request<T>(
      endpoint,
      {
        method: "PUT",
        body: serializeBody(body),
      },
      retryOptions,
    ),

  patch: <T>(endpoint: string, body?: unknown, retryOptions?: RetryOptions) =>
    request<T>(
      endpoint,
      {
        method: "PATCH",
        body: serializeBody(body),
      },
      retryOptions,
    ),

  delete: <T>(endpoint: string, retryOptions?: RetryOptions) =>
    request<T>(
      endpoint,
      {
        method: "DELETE",
      },
      retryOptions,
    ),
};
