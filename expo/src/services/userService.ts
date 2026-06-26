import { apiClient } from "../api/client";
import type { ApiResponse, User, Gym } from "../api/types";

export const userService = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<User>("/api/user/profile");
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiClient.put<User>("/api/user/profile", data);
  },

  getLinkedGym: async (): Promise<ApiResponse<Gym | null>> => {
    return apiClient.get<Gym | null>("/api/user/gym");
  },

  linkGym: async (code: string): Promise<ApiResponse<Gym>> => {
    return apiClient.post<Gym>("/api/user/gym/link", { code });
  },
};
