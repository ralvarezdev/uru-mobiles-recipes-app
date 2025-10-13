import { Stack } from "expo-router";

export default function CategoriesStack() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Atrás",
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Categorías",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="[categoryId]/index"
        options={{
          title: "Detalle de categoría",
        }}
      />

      <Stack.Screen
        name="[categoryId]/[recipeId]/index"
        options={{
          title: "Receta en categoría",
        }}
      />

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
