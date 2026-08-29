import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { ReactNode } from "react";
import type { User } from "../types/user";

import { getSession, getUser, logout } from "../services/authApi";
import { ApiError } from "../services/api";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (user: User, token?: string) => void;
  updateUser: (user: User) => void;
  signOut: () => Promise<void>;
}

const USER_KEY = "rivo_user";
const TOKEN_KEY = "rivo_token";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(USER_KEY);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as User;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  const validateSession = useCallback(async () => {
    try {
      const response = await getSession();
      const sessionUser = getUser(response);

      setUser(sessionUser);
      localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));

      const sessionToken =
        "data" in response && response.data && "session" in response.data
          ? response.data.session?.token
          : "token" in response
            ? response.token
            : undefined;

      if (sessionToken) {
        localStorage.setItem(TOKEN_KEY, sessionToken);
      }
    } catch (error) {
      // If session fails (401, 403, etc.), clear auth
      if (error instanceof ApiError && [401, 403, 404].includes(error.status)) {
        console.debug("Session validation failed, clearing auth", error.status);
        setUser(null);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      } else {
        console.error("Session validation error:", error);
        // For network errors, don't clear auth - keep existing user if available
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validate session on mount
  useEffect(() => {
    validateSession();
  }, [validateSession]);

  const signIn = useCallback((nextUser: User, token?: string) => {
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }, []);

  const updateUser = useCallback((nextUser: User) => {
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logout();
    } catch {
      // Clear local session even if server request fails.
    } finally {
      setUser(null);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        signIn,
        updateUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
