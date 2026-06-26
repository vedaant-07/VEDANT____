import { apiClient } from "../api/client";
import type { ApiResponse, Challenge } from "../api/types";

export const challengeService = {
  getAll: async (): Promise<ApiResponse<Challenge[]>> => {
    return apiClient.get<Challenge[]>("/api/user/challenges");
  },

  getActive: async (): Promise<ApiResponse<Challenge[]>> => {
    return apiClient.get<Challenge[]>("/api/user/challenges/active");
  },

  join: async (challengeId: string): Promise<ApiResponse<Challenge>> => {
    return apiClient.post<Challenge>(`/api/user/challenges/${challengeId}/join`, {});
  },

  getLeaderboard: async (challengeId: string): Promise<
    ApiResponse<{ userId: string; name: string; points: number; rank: number }[]>
  > => {
    return apiClient.get(`/api/user/challenges/${challengeId}/leaderboard`);
  },

  getRewards: async (): Promise<ApiResponse<import("../api/types").Reward[]>> => {
    return apiClient.get("/api/user/rewards");
  },

  redeemReward: async (rewardId: string): Promise<ApiResponse<{ success: boolean }>> => {
    return apiClient.post(`/api/user/rewards/${rewardId}/redeem`, {});
  },
};
