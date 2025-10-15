import { theme } from "@/styles/Theme";
import { Stack } from "expo-router";

export default function RecipesLayout() {
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
          title: "Recipes",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[recipeId]/index"
        options={{
          title: "Recipe Detail",
        }}
      />
      {/* <Stack.Screen
        name="me/index"
        options={{
          title: "My recipes",
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
