import { theme } from "@/styles/Theme";
import { Stack } from "expo-router";

export default function GroupsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitle: "Back",
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="create/index" />
      <Stack.Screen name="[groupId]" />
    </Stack>
  );
}
