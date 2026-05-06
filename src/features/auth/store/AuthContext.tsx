import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AuthManager } from "../services/AuthManager";
import type { AdminUser } from "../types";

type AuthContextValue = {
  user: AdminUser | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthManager.getCurrentUser()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  async function signIn(username: string, password: string) {
    const loggedUser = await AuthManager.signIn({ username, password });
    setUser(loggedUser);
  }

  async function signUp(username: string, password: string) {
    const newUser = await AuthManager.signUp({ username, password });
    setUser(newUser);
  }

  async function signOut() {
    await AuthManager.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
