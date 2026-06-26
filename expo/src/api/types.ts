/** Core API types for SE7EN FIT */

export type UserRole = "user" | "gym_owner";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  _id: string;
  fullName: string;
  firstName?: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  height?: number;
  weight?: number;
  goal?: string;
  gymId?: string;
  subscriptionStatus?: "free" | "basic" | "premium" | "expired";
  trialEndsAt?: string;
}

export interface GymOwner {
  _id: string;
  ownerName: string;
  email: string;
  phone: string;
  role: "gym_owner";
  gym?: Gym;
}

export interface Gym {
  _id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  logo?: string;
  photos?: string[];
  plans?: MembershipPlan[];
  upiId?: string;
  rating?: number;
  reviewCount?: number;
  amenities?: string[];
  openingHours?: string;
  description?: string;
}

export interface MembershipPlan {
  _id?: string;
  name: string;
  duration: "monthly" | "quarterly" | "yearly";
  price: number;
  features?: string[];
}

export interface Exercise {
  _id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  sets: number;
  reps: number;
  restSeconds: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  formTips: string[];
  commonMistakes: string[];
  adminMeta?: Record<string, unknown>;
  contentStatus: "placeholder" | "ready" | "needs_review";
}

export interface WorkoutPlan {
  _id: string;
  name: string;
  exercises: WorkoutExercise[];
  duration: number;
  difficulty: string;
  targetMuscle?: string;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  restSeconds: number;
  completed: boolean;
}

export interface NutritionEntry {
  _id?: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface TrackingData {
  water: number;
  waterGoal: number;
  steps: number;
  stepGoal: number;
  calories: number;
  calorieGoal: number;
  sleep: number;
  sleepGoal: number;
  weight: number;
  weightGoal: number;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  target: string;
  rewardPoints: number;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "workout" | "steps" | "weight_loss" | "muscle_gain" | "nutrition";
  startDate?: string;
  endDate?: string;
  participants: number;
  progress?: number;
  joined?: boolean;
}

export interface Member {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  membershipStatus: "active" | "expired" | "pending";
  planName?: string;
  joinedAt: string;
  expiresAt?: string;
  paymentStatus: "paid" | "pending" | "overdue";
  attendanceCount?: number;
}

export interface Lead {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  status: "new" | "contacted" | "converted" | "lost";
  followUpDate?: string;
  notes?: string;
  source?: string;
}

export interface AttendanceRecord {
  _id: string;
  memberId: string;
  memberName: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
}

export interface Earning {
  _id?: string;
  type: "membership" | "other";
  amount: number;
  date: string;
  status: "paid" | "pending";
  memberName?: string;
  planName?: string;
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  expiresAt?: string;
  active: boolean;
}

export interface Promotion {
  _id: string;
  title: string;
  description: string;
  cta: string;
  startDate: string;
  endDate: string;
  active: boolean;
  impressions?: number;
  clicks?: number;
}

export interface Reward {
  _id: string;
  name: string;
  description: string;
  pointsNeeded: number;
  image?: string;
  category: "gym" | "challenge" | "referral" | "premium";
  available: boolean;
}

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  reply?: string;
  createdAt: string;
}

export interface Referral {
  code: string;
  conversions: number;
  rewards: number;
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  message: string;
  statusCode?: number;
};
