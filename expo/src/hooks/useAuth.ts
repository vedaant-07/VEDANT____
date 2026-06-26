import createContextHook from "@nkzw/create-context-hook";
import { useState, useEffect, useCallback } from "react";
import type { User, GymOwner, UserRole } from "../api/types";
import { authService } from "../services/authService";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: (User | GymOwner) | null;
  role: UserRole | null;
}

interface AuthActions {
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (
    data: {
      fullName?: string;
      ownerName?: string;
      mobile?: string;
      email: string;
      password: string;
      confirmPassword: string;
      referralCode?: string;
    },
    role: UserRole
  ) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    role: null,
  });

  const refreshUser = useCallback(async () => {
    try {
      const res = await authService.getProfile();
      if (res.success && res.data) {
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          user: res.data as User | GymOwner,
          role: res.data.role,
          isLoading: false,
        }));
      }
    } catch {
      // Session might be expired
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        role: null,
      });
    }
  }, []);

  const restoreSession = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const hasTokens = await authService.isAuthenticated();
    if (!hasTokens) {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        role: null,
      });
      return;
    }
    await refreshUser();
  }, [refreshUser]);

  const login = useCallback(
    async (email: string, password: string, role: UserRole) => {
      const res = await authService.login({ email, password, role });
      if (res.success && res.data) {
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: res.data.user,
          role: res.data.user.role,
        });
      }
    },
    []
  );

  const signup = useCallback(
    async (
      data: {
        fullName?: string;
        ownerName?: string;
        mobile?: string;
        email: string;
        password: string;
        confirmPassword: string;
        referralCode?: string;
      },
      role: UserRole
    ) => {
      let res;
      if (role === "gym_owner") {
        res = await authService.signupOwner({
          ownerName: data.ownerName || data.fullName || "",
          mobile: data.mobile || "",
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
      } else {
        res = await authService.signupUser({
          fullName: data.fullName || "",
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          referralCode: data.referralCode,
        });
      }
      if (res.success && res.data) {
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: res.data.user,
          role: res.data.user.role,
        });
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      role: null,
    });
  }, []);

  // Restore session on mount
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return {
    ...state,
    login,
    signup,
    logout,
    restoreSession,
    refreshUser,
  } as AuthState & AuthActions;
});
