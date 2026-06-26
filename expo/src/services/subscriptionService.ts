import { apiClient } from "../api/client";
import type { ApiResponse } from "../api/types";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: "monthly" | "quarterly" | "yearly";
  features: string[];
  highlighted?: boolean;
  trialDays?: number;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free_trial",
    name: "Free Trial",
    price: 0,
    currency: "₹",
    period: "monthly",
    features: [
      "7 days limited access",
      "Basic workouts",
      "Water tracking",
      "Limited AI tips",
    ],
    trialDays: 7,
  },
  {
    id: "basic_monthly",
    name: "Basic Monthly",
    price: 299,
    currency: "₹",
    period: "monthly",
    features: [
      "All workouts",
      "Nutrition tracking",
      "Basic AI trainer",
      "Progress tracking",
      "Challenges",
    ],
  },
  {
    id: "premium_monthly",
    name: "Premium Monthly",
    price: 499,
    currency: "₹",
    period: "monthly",
    features: [
      "Everything in Basic",
      "Advanced AI Trainer",
      "Food Scan AI",
      "Custom meal plans",
      "Video exercise guides",
      "Priority support",
      "Ad-free experience",
    ],
    highlighted: true,
  },
  {
    id: "premium_quarterly",
    name: "Premium Quarterly",
    price: 2999,
    currency: "₹",
    period: "quarterly",
    features: [
      "Everything in Premium",
      "Save 50% vs monthly",
      "Exclusive challenges",
      "Early access to features",
    ],
  },
  {
    id: "premium_yearly",
    name: "Premium Annual",
    price: 5999,
    currency: "₹",
    period: "yearly",
    features: [
      "Everything in Premium",
      "Save 66% vs monthly",
      "Personal AI coach",
      "Exclusive rewards",
      "Gym partner matching",
    ],
    highlighted: true,
  },
];

export const subscriptionService = {
  getPlans: (): SubscriptionPlan[] => SUBSCRIPTION_PLANS,

  getActiveSubscription: async (): Promise<
    ApiResponse<{ planId: string; status: string; expiresAt: string }>
  > => {
    return apiClient.get("/api/user/subscription");
  },

  subscribe: async (
    planId: string,
    paymentToken: string
  ): Promise<ApiResponse<{ success: boolean }>> => {
    return apiClient.post("/api/user/subscription/subscribe", { planId, paymentToken });
  },

  cancelSubscription: async (): Promise<ApiResponse<{ success: boolean }>> => {
    return apiClient.post("/api/user/subscription/cancel", {});
  },
};
