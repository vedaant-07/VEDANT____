import { apiClient } from "../api/client";
import type { ApiResponse, TrackingData } from "../api/types";

export const trackingService = {
  getToday: async (): Promise<ApiResponse<TrackingData>> => {
    return apiClient.get<TrackingData>("/api/user/tracking/today");
  },

  logWater: async (amount: number): Promise<ApiResponse<TrackingData>> => {
    return apiClient.post<TrackingData>("/api/user/tracking/water", { amount });
  },

  logSteps: async (steps: number): Promise<ApiResponse<TrackingData>> => {
    return apiClient.post<TrackingData>("/api/user/tracking/steps", { steps });
  },

  logWeight: async (weight: number): Promise<ApiResponse<TrackingData>> => {
    return apiClient.post<TrackingData>("/api/user/tracking/weight", { weight });
  },

  logSleep: async (hours: number): Promise<ApiResponse<TrackingData>> => {
    return apiClient.post<TrackingData>("/api/user/tracking/sleep", { hours });
  },

  updateGoals: async (goals: Partial<TrackingData>): Promise<ApiResponse<TrackingData>> => {
    return apiClient.put<TrackingData>("/api/user/tracking/goals", goals);
  },
};
