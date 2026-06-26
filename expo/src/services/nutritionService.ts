import { apiClient } from "../api/client";
import type { ApiResponse, NutritionEntry, NutritionGoals } from "../api/types";

export const nutritionService = {
  getTodayEntries: async (): Promise<ApiResponse<NutritionEntry[]>> => {
    return apiClient.get<NutritionEntry[]>("/api/user/nutrition/today");
  },

  addEntry: async (entry: Omit<NutritionEntry, "_id">): Promise<ApiResponse<NutritionEntry>> => {
    return apiClient.post<NutritionEntry>("/api/user/nutrition/entry", entry);
  },

  getGoals: async (): Promise<ApiResponse<NutritionGoals>> => {
    return apiClient.get<NutritionGoals>("/api/user/nutrition/goals");
  },

  updateGoals: async (goals: NutritionGoals): Promise<ApiResponse<NutritionGoals>> => {
    return apiClient.put<NutritionGoals>("/api/user/nutrition/goals", goals);
  },

  scanFood: async (imageUri: string): Promise<ApiResponse<Partial<NutritionEntry>>> => {
    return apiClient.post<Partial<NutritionEntry>>("/api/user/nutrition/scan", { imageUri });
  },
};
