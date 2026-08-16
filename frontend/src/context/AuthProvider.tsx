import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  logoutUser,
  type AuthUser,
} from "../api/api";

import { AuthContext } from "./AuthContext";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch {
      setUser(null);
    }
  }

  async function handleLogout() {
    await logoutUser();
    setUser(null);
  }

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();

        if (mounted) {
          setUser(currentUser);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout: handleLogout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}