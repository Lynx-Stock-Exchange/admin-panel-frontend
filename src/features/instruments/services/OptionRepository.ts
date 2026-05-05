import { apiClient } from "../../../shared/services/apiClient";
import type { OptionContract, CreateOptionPayload, UpdateOptionPayload } from "../types";

export const OptionRepository = {
  async list(): Promise<OptionContract[]> {
    const { data } = await apiClient.get("/api/admin/options");
    return data.options ?? data;
  },

  async create(payload: CreateOptionPayload): Promise<OptionContract> {
    const { data } = await apiClient.post("/api/admin/options", payload);
    return data.option ?? data;
  },

  async update(optionId: string, payload: UpdateOptionPayload): Promise<OptionContract> {
    const { data } = await apiClient.put(`/api/admin/options/${optionId}`, payload);
    return data.option ?? data;
  },

  async remove(optionId: string): Promise<void> {
    await apiClient.delete(`/api/admin/options/${optionId}`);
  },
};
