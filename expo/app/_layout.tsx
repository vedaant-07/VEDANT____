import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../src/hooks/useAuth";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function AuthRouter() {
  const { isAuthenticated, isLoading, role } = useAuth();
  const segments = useSegments();

  const redirectIfNeeded = useCallback(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/welcome");
    } else if (isAuthenticated && role) {
      if (inAuthGroup) {
        router.replace(role === "gym_owner" ? "/(gym-owner)/(tabs)/home" : "/(user)/(tabs)/home");
      }
    }
  }, [isAuthenticated, isLoading, role, segments]);

  useEffect(() => {
    redirectIfNeeded();
  }, [redirectIfNeeded]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(gym-owner)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <AuthRouter />
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
