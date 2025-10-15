import { theme } from "@/styles/Theme";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: { fontWeight: "bold" },
      }}>
      <Stack.Screen name="index" options={{ title: "My Profile", headerShown: false }} />
      {/* Apuntas al SEGMENTO carpeta; su _layout interno manejará los tabs */}
      <Stack.Screen name="my-recipes" options={{ title: "My Recipes" }} />
    </Stack>
  );
}
