import { theme } from "@/styles/Theme";
import { Stack } from "expo-router";

export default function GroupsLayout() {
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
      <Stack.Screen
        name="index"
        options={{
          title: "Groups",
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="[groupId]/index"
        options={{
          title: "Group Detail",
        }}
      /> */}

      {/* <Stack.Screen
        name="recipes/[recipeId]/index"
        options={{
          title: "Receta en categoría",
        }}
      /> */}

      {/* Ejemplo: crear categoría como modal (opcional) */}
      {/* <Stack.Screen
        name="create"
        options={{
          title: "Nueva categoría",
          presentation: "modal", // iOS: gesto de cerrar hacia abajo
        }}
      /> */}
    </Stack>
  );
}
