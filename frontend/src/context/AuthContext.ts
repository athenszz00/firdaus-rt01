import { createContext } from "react";
import type { AuthUser } from "../api/api";

export type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const AuthContext =
  createContext<AuthContextType | undefined>(undefined);