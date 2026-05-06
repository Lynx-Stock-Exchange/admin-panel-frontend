import { AuthRepository } from "./AuthRepository";
import type { AdminUser, LoginCredentials, RegisterCredentials } from "../types";

export const AuthManager = {
  async signIn(credentials: LoginCredentials): Promise<AdminUser> {
    try {
      return await AuthRepository.login(credentials);
    } catch (err: unknown) {
      const message =
        (err as { error?: { message?: string } })?.error?.message ??
        "Invalid credentials.";
      throw new Error(message);
    }
  },

  async signUp(credentials: RegisterCredentials): Promise<AdminUser> {
    try {
      return await AuthRepository.register(credentials);
    } catch (err: unknown) {
      const message =
        (err as { error?: { message?: string } })?.error?.message ??
        "Registration failed.";
      throw new Error(message);
    }
  },

  async signOut(): Promise<void> {
    try {
      await AuthRepository.logout();
    } catch {
      // ignore — session already invalid
    }
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    try {
      return await AuthRepository.me();
    } catch {
      return null;
    }
  },
};
