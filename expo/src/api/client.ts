import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ApiError, ApiResponse } from "./types";

const BASE_URL = "https://se7enfit-original.onrender.com";
const TIMEOUT_MS = 15000;

const TOKEN_KEY = "se7enfit_tokens";

interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

async function getTokens(): Promise<StoredTokens | null> {
  try {
    const raw = await AsyncStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredTokens;
  } catch {
    return null;
  }
}

async function setTokens(tokens: StoredTokens): Promise<void> {
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

async function clearTokens(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

function isHtmlResponse(text: string): boolean {
  return text.trim().startsWith("<!") || text.trim().startsWith("<html");
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();
    if (isHtmlResponse(text)) {
      throw {
        success: false,
        message: "Server returned an unexpected response. Please try again later.",
        statusCode: response.status,
      } as ApiError;
    }
    throw {
      success: false,
      message: text || "Unexpected server response",
      statusCode: response.status,
    } as ApiError;
  }

  const json = (await response.json()) as ApiResponse<T> | ApiError;

  if (!response.ok) {
    throw {
      success: false,
      message: (json as ApiError).message || `Request failed with status ${response.status}`,
      statusCode: response.status,
    } as ApiError;
  }

  return json as ApiResponse<T>;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth = true
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (requireAuth) {
    const tokens = await getTokens();
    if (tokens?.accessToken) {
      headers["Authorization"] = `Bearer ${tokens.accessToken}`;
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 401 && requireAuth) {
      const tokens = await getTokens();
      if (tokens?.refreshToken) {
        try {
          const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = (await refreshResponse.json()) as ApiResponse<{
              accessToken: string;
              refreshToken: string;
            }>;
            await setTokens({
              accessToken: refreshData.data.accessToken,
              refreshToken: refreshData.data.refreshToken,
            });

            headers["Authorization"] = `Bearer ${refreshData.data.accessToken}`;
            const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
              ...options,
              headers,
            });
            return handleResponse<T>(retryResponse);
          }
        } catch {
          // Refresh failed, clear tokens
        }
      }
      await clearTokens();
      throw {
        success: false,
        message: "Session expired. Please log in again.",
        statusCode: 401,
      } as ApiError;
    }

    return handleResponse<T>(response);
  } catch (error) {
    clearTimeout(timeout);

    if ((error as Error).name === "AbortError") {
      throw {
        success: false,
        message: "Request timed out. Please check your connection.",
        statusCode: 408,
      } as ApiError;
    }

    if ((error as ApiError).success === false) {
      throw error;
    }

    throw {
      success: false,
      message: "Network error. Please check your connection and try again.",
      statusCode: 0,
    } as ApiError;
  }
}

export const apiClient = {
  get: <T>(endpoint: string, requireAuth = true) =>
    request<T>(endpoint, { method: "GET" }, requireAuth),

  post: <T>(endpoint: string, body: unknown, requireAuth = true) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }, requireAuth),

  put: <T>(endpoint: string, body: unknown, requireAuth = true) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }, requireAuth),

  patch: <T>(endpoint: string, body: unknown, requireAuth = true) =>
    request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body) }, requireAuth),

  delete: <T>(endpoint: string, requireAuth = true) =>
    request<T>(endpoint, { method: "DELETE" }, requireAuth),

  getTokens,
  setTokens,
  clearTokens,
  BASE_URL,
};
