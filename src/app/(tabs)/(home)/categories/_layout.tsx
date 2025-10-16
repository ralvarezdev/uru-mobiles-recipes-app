import { theme } from "@/styles/Theme";
import { Stack } from "expo-router";

export default function CategoriesLayout() {
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
          title: "Categories",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[categoryId]/index"
        options={{
          title: "Category Detail",
        }}
      />

      {/* <Stack.Screen
        name="recipes/[recipeId]/index"
        options={{
          title: "Recipe",
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
