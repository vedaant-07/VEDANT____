import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#050505" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="choose-role" />
        <Stack.Screen name="user-login" />
        <Stack.Screen name="user-signup" />
        <Stack.Screen name="owner-login" />
        <Stack.Screen name="owner-signup" />
      </Stack>
    </>
  );
}
