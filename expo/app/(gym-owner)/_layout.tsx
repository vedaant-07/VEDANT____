import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function GymOwnerLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#050505" },
          animation: "slide_from_right",
        }}
      />
    </>
  );
}
