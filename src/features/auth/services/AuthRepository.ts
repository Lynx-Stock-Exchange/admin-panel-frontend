import axios from "axios";
import { apiClient } from "../../../shared/services/apiClient";
import type { AdminUser, LoginCredentials } from "../types";

export const AuthRepository = {
  async login(credentials: LoginCredentials): Promise<AdminUser> {
    try {
      const { data } = await apiClient.post("/auth/login", credentials);
      return data.admin ?? data.user ?? data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) throw err.response.data;
      throw err;
    }
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout").catch(() => {});
  },

  async me(): Promise<AdminUser> {
    const { data } = await apiClient.get("/auth/me");
    return data.admin ?? data.user ?? data;
  },
};
