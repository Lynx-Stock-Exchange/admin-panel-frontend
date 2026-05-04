import { API_BASE_URL } from "../../../shared/constants/config";
import type { AdminUser, LoginCredentials } from "../types";

export const AuthRepository = {
  async login(credentials: LoginCredentials): Promise<AdminUser> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw await res.json();
    const data = await res.json();
    return data.admin ?? data.user ?? data;
  },

  async logout(): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },

  async me(): Promise<AdminUser> {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Unauthorized");
    const data = await res.json();
    return data.admin ?? data.user ?? data;
  },
};
