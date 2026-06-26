import { apiClient } from "../api/client";
import type { ApiResponse, AuthTokens, User, GymOwner, UserRole } from "../api/types";

interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

interface SignupUserPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
}

interface SignupOwnerPayload {
  ownerName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface GoogleAuthPayload {
  idToken: string;
  accessToken: string;
  role: UserRole;
}

interface AuthResponse {
  user: User | GymOwner;
  tokens: AuthTokens;
}

/**
 * Temporary APK test mode.
 * Keep this enabled while building demo APKs without a live backend.
 * Set to false when your real backend auth endpoints are ready.
 */
const DEMO_AUTH_ENABLED = true;

export const DEMO_LOGINS = {
  user: {
    email: "user@se7en.fit",
    password: "user123",
  },
  gym_owner: {
    email: "owner@se7en.fit",
    password: "owner123",
  },
} as const;

function createDemoTokens(role: UserRole): AuthTokens {
  return {
    accessToken: `demo:${role}:access`,
    refreshToken: `demo:${role}:refresh`,
  };
}

function getRoleFromDemoToken(token?: string): UserRole | null {
  if (token?.startsWith("demo:gym_owner:")) return "gym_owner";
  if (token?.startsWith("demo:user:")) return "user";
  return null;
}

function createDemoUser(email: string = DEMO_LOGINS.user.email, fullName: string = "Vedant Demo User"): User {
  return {
    _id: "demo-user-001",
    fullName,
    firstName: fullName.split(" ")[0] || "Vedant",
    email,
    phone: "+91 99999 99999",
    role: "user",
    height: 175,
    weight: 72,
    goal: "Build muscle and lose fat",
    gymId: "demo-gym-001",
    subscriptionStatus: "premium",
    trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

function createDemoOwner(
  email: string = DEMO_LOGINS.gym_owner.email,
  ownerName: string = "Vedant Gym Owner",
  phone: string = "+91 88888 88888"
): GymOwner {
  return {
    _id: "demo-owner-001",
    ownerName,
    email,
    phone,
    role: "gym_owner",
    gym: {
      _id: "demo-gym-001",
      name: "SE7EN FIT Demo Gym",
      ownerName,
      phone,
      email,
      address: "Demo Road, Maharashtra",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440001",
      rating: 4.8,
      reviewCount: 127,
      amenities: ["Strength Training", "Cardio", "Personal Training", "Locker"],
      openingHours: "5:00 AM - 11:00 PM",
      description: "Temporary demo gym profile for APK testing.",
      plans: [
        {
          _id: "plan-monthly",
          name: "Monthly",
          duration: "monthly",
          price: 999,
          features: ["Gym access", "Basic workout plan", "Attendance tracking"],
        },
        {
          _id: "plan-quarterly",
          name: "Quarterly",
          duration: "quarterly",
          price: 2499,
          features: ["Gym access", "AI challenges", "Progress tracking"],
        },
      ],
      upiId: "se7enfit@upi",
    },
  };
}

function demoAuthResponse(role: UserRole, email?: string, displayName?: string): ApiResponse<AuthResponse> {
  const tokens = createDemoTokens(role);
  const user =
    role === "gym_owner"
      ? createDemoOwner(email || DEMO_LOGINS.gym_owner.email, displayName || "Vedant Gym Owner")
      : createDemoUser(email || DEMO_LOGINS.user.email, displayName || "Vedant Demo User");

  return {
    success: true,
    data: { user, tokens },
    message: "Demo login success",
  };
}

export const authService = {
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    if (DEMO_AUTH_ENABLED) {
      const res = demoAuthResponse(payload.role, payload.email);
      await apiClient.setTokens(res.data.tokens);
      return res;
    }

    const endpoint =
      payload.role === "gym_owner" ? "/api/auth/owner/login" : "/api/auth/user/login";
    const res = await apiClient.post<AuthResponse>(endpoint, payload, false);
    if (res.data?.tokens) {
      await apiClient.setTokens(res.data.tokens);
    }
    return res;
  },

  signupUser: async (payload: SignupUserPayload): Promise<ApiResponse<AuthResponse>> => {
    if (DEMO_AUTH_ENABLED) {
      const res = demoAuthResponse("user", payload.email, payload.fullName);
      await apiClient.setTokens(res.data.tokens);
      return res;
    }

    const res = await apiClient.post<AuthResponse>("/api/auth/user/register", payload, false);
    if (res.data?.tokens) {
      await apiClient.setTokens(res.data.tokens);
    }
    return res;
  },

  signupOwner: async (payload: SignupOwnerPayload): Promise<ApiResponse<AuthResponse>> => {
    if (DEMO_AUTH_ENABLED) {
      const res = demoAuthResponse("gym_owner", payload.email, payload.ownerName);
      await apiClient.setTokens(res.data.tokens);
      return res;
    }

    const res = await apiClient.post<AuthResponse>("/api/auth/owner/register", payload, false);
    if (res.data?.tokens) {
      await apiClient.setTokens(res.data.tokens);
    }
    return res;
  },

  googleAuth: async (payload: GoogleAuthPayload): Promise<ApiResponse<AuthResponse>> => {
    if (DEMO_AUTH_ENABLED) {
      const res = demoAuthResponse(payload.role);
      await apiClient.setTokens(res.data.tokens);
      return res;
    }

    const res = await apiClient.post<AuthResponse>("/api/auth/google", payload, false);
    if (res.data?.tokens) {
      await apiClient.setTokens(res.data.tokens);
    }
    return res;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    if (DEMO_AUTH_ENABLED) {
      const role = getRoleFromDemoToken(refreshToken) ?? "user";
      return {
        success: true,
        data: createDemoTokens(role),
      };
    }

    return apiClient.post<AuthTokens>(
      "/api/auth/refresh",
      { refreshToken },
      false
    );
  },

  getProfile: async (): Promise<ApiResponse<User | GymOwner>> => {
    if (DEMO_AUTH_ENABLED) {
      const tokens = await apiClient.getTokens();
      const role = getRoleFromDemoToken(tokens?.accessToken) ?? "user";
      return {
        success: true,
        data: role === "gym_owner" ? createDemoOwner() : createDemoUser(),
      };
    }

    return apiClient.get<User | GymOwner>("/api/auth/me");
  },

  logout: async (): Promise<void> => {
    if (!DEMO_AUTH_ENABLED) {
      try {
        await apiClient.post("/api/auth/logout", {});
      } catch {
        // Swallow — clear tokens regardless
      }
    }
    await apiClient.clearTokens();
  },

  isAuthenticated: async (): Promise<boolean> => {
    const tokens = await apiClient.getTokens();
    return !!tokens?.accessToken;
  },

  getStoredRole: async (): Promise<UserRole | null> => {
    try {
      const tokens = await apiClient.getTokens();
      if (!tokens?.accessToken) return null;

      if (DEMO_AUTH_ENABLED) {
        return getRoleFromDemoToken(tokens.accessToken);
      }

      const res = await apiClient.get<User | GymOwner>("/api/auth/me");
      return res.data?.role ?? null;
    } catch {
      return null;
    }
  },
};
