import { theme } from "@/styles/Theme";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function CategoriesStack() {
  return (
    <>
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
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
