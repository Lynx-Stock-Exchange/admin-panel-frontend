import { OptionRepository } from "./OptionRepository";
import type { OptionContract, CreateOptionPayload, UpdateOptionPayload } from "../types";

export const OptionManager = {
  async list(): Promise<OptionContract[]> {
    return OptionRepository.list();
  },

  async create(payload: CreateOptionPayload): Promise<OptionContract> {
    return OptionRepository.create(payload);
  },

  async update(optionId: string, payload: UpdateOptionPayload): Promise<OptionContract> {
    return OptionRepository.update(optionId, payload);
  },

  async remove(optionId: string): Promise<void> {
    return OptionRepository.remove(optionId);
  },
};
