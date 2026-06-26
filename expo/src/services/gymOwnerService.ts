import { apiClient } from "../api/client";
import type {
  ApiResponse,
  Gym,
  Member,
  Lead,
  AttendanceRecord,
  Earning,
  Announcement,
  Promotion,
  Reward,
  Review,
  Referral,
  Challenge,
  MembershipPlan,
} from "../api/types";

export const gymOwnerService = {
  // Gym profile
  getGym: async (): Promise<ApiResponse<Gym>> => {
    return apiClient.get<Gym>("/api/owner/gym");
  },

  updateGym: async (data: Partial<Gym>): Promise<ApiResponse<Gym>> => {
    return apiClient.put<Gym>("/api/owner/gym", data);
  },

  // Onboarding
  submitOnboarding: async (data: Partial<Gym>): Promise<ApiResponse<Gym>> => {
    return apiClient.post<Gym>("/api/owner/onboarding", data);
  },

  // Members
  getMembers: async (status?: string): Promise<ApiResponse<Member[]>> => {
    const qs = status ? `?status=${status}` : "";
    return apiClient.get<Member[]>(`/api/owner/members${qs}`);
  },

  getMemberDetails: async (memberId: string): Promise<ApiResponse<Member>> => {
    return apiClient.get<Member>(`/api/owner/members/${memberId}`);
  },

  addMember: async (data: Partial<Member>): Promise<ApiResponse<Member>> => {
    return apiClient.post<Member>("/api/owner/members", data);
  },

  searchMembers: async (query: string): Promise<ApiResponse<Member[]>> => {
    return apiClient.get<Member[]>(`/api/owner/members/search?q=${encodeURIComponent(query)}`);
  },

  // Attendance
  getTodayAttendance: async (): Promise<ApiResponse<AttendanceRecord[]>> => {
    return apiClient.get<AttendanceRecord[]>("/api/owner/attendance/today");
  },

  checkIn: async (memberId: string): Promise<ApiResponse<AttendanceRecord>> => {
    return apiClient.post<AttendanceRecord>("/api/owner/attendance/checkin", { memberId });
  },

  getAttendanceHistory: async (): Promise<ApiResponse<AttendanceRecord[]>> => {
    return apiClient.get<AttendanceRecord[]>("/api/owner/attendance/history");
  },

  // Leads
  getLeads: async (): Promise<ApiResponse<Lead[]>> => {
    return apiClient.get<Lead[]>("/api/owner/leads");
  },

  addLead: async (data: Partial<Lead>): Promise<ApiResponse<Lead>> => {
    return apiClient.post<Lead>("/api/owner/leads", data);
  },

  updateLead: async (leadId: string, data: Partial<Lead>): Promise<ApiResponse<Lead>> => {
    return apiClient.put<Lead>(`/api/owner/leads/${leadId}`, data);
  },

  // Earnings
  getEarnings: async (period?: string): Promise<ApiResponse<Earning[]>> => {
    const qs = period ? `?period=${period}` : "";
    return apiClient.get<Earning[]>(`/api/owner/earnings${qs}`);
  },

  getEarningsSummary: async (): Promise<
    ApiResponse<{
      thisMonth: number;
      total: number;
      pending: number;
      paid: number;
    }>
  > => {
    return apiClient.get("/api/owner/earnings/summary");
  },

  // Announcements
  getAnnouncements: async (): Promise<ApiResponse<Announcement[]>> => {
    return apiClient.get<Announcement[]>("/api/owner/announcements");
  },

  createAnnouncement: async (
    data: Partial<Announcement>
  ): Promise<ApiResponse<Announcement>> => {
    return apiClient.post<Announcement>("/api/owner/announcements", data);
  },

  // Promotions
  getPromotions: async (): Promise<ApiResponse<Promotion[]>> => {
    return apiClient.get<Promotion[]>("/api/owner/promotions");
  },

  createPromotion: async (data: Partial<Promotion>): Promise<ApiResponse<Promotion>> => {
    return apiClient.post<Promotion>("/api/owner/promotions", data);
  },

  // Challenges
  getChallenges: async (): Promise<ApiResponse<Challenge[]>> => {
    return apiClient.get<Challenge[]>("/api/owner/challenges");
  },

  createChallenge: async (data: Partial<Challenge>): Promise<ApiResponse<Challenge>> => {
    return apiClient.post<Challenge>("/api/owner/challenges", data);
  },

  // Rewards
  getRewards: async (): Promise<ApiResponse<Reward[]>> => {
    return apiClient.get<Reward[]>("/api/owner/rewards");
  },

  createReward: async (data: Partial<Reward>): Promise<ApiResponse<Reward>> => {
    return apiClient.post<Reward>("/api/owner/rewards", data);
  },

  // Reviews
  getReviews: async (): Promise<ApiResponse<Review[]>> => {
    return apiClient.get<Review[]>("/api/owner/reviews");
  },

  replyToReview: async (reviewId: string, reply: string): Promise<ApiResponse<Review>> => {
    return apiClient.post<Review>(`/api/owner/reviews/${reviewId}/reply`, { reply });
  },

  // Referrals
  getReferrals: async (): Promise<ApiResponse<Referral>> => {
    return apiClient.get<Referral>("/api/owner/referrals");
  },

  // Plans
  updatePlans: async (plans: MembershipPlan[]): Promise<ApiResponse<MembershipPlan[]>> => {
    return apiClient.put<MembershipPlan[]>("/api/owner/plans", plans);
  },
};
