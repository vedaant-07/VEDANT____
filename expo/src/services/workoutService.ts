import { apiClient } from "../api/client";
import type { ApiResponse, WorkoutPlan, WorkoutExercise } from "../api/types";

export const workoutService = {
  getTodayPlan: async (): Promise<ApiResponse<WorkoutPlan>> => {
    return apiClient.get<WorkoutPlan>("/api/user/workout/today");
  },

  getHistory: async (): Promise<ApiResponse<WorkoutPlan[]>> => {
    return apiClient.get<WorkoutPlan[]>("/api/user/workout/history");
  },

  startWorkout: async (planId: string): Promise<ApiResponse<WorkoutPlan>> => {
    return apiClient.post<WorkoutPlan>(`/api/user/workout/${planId}/start`, {});
  },

  markSetComplete: async (
    planId: string,
    exerciseId: string,
    setIndex: number
  ): Promise<ApiResponse<WorkoutExercise>> => {
    return apiClient.post<WorkoutExercise>(
      `/api/user/workout/${planId}/exercise/${exerciseId}/complete`,
      { setIndex }
    );
  },

  saveWorkout: async (planId: string): Promise<ApiResponse<WorkoutPlan>> => {
    return apiClient.post<WorkoutPlan>(`/api/user/workout/${planId}/save`, {});
  },
};
