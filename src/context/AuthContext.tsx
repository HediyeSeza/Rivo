import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { User } from "../types/user";

import { getSession, getUser, logout } from "../services/authApi";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (user: User, token?: string) => void;
  updateUser: (user: User) => void;
  signOut: () => Promise<void>;
}

const USER_KEY = "rivo_user";
const TOKEN_KEY = "rivo_token";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  useEffect(() => {
    let isActive = true;

    getSession()
      .then((response) => {
        if (!isActive) {
          return;
        }

        const sessionUser = getUser(response);

        setUser(sessionUser);

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(sessionUser),
        );

        const sessionToken =
          response &&
          "data" in response &&
          response.data?.session?.token;

        if (sessionToken) {
          localStorage.setItem(TOKEN_KEY, sessionToken);
        }
      })
      .catch((error) => {
        console.error("Failed to get session:", error);

        if (!isActive) {
          return;
        }

        setUser(null);

        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const signIn = (nextUser: User, token?: string) => {
    setUser(nextUser);

    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  };

  const updateUser = (nextUser: User) => {
    setUser(nextUser);

    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };

  const signOut = async () => {
    try {
      await logout();
    } catch {
      // Clear local session even if server request fails.
    } finally {
      setUser(null);

      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
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