// app/(tabs)/(home)/categories/[categoryId]/index.tsx
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import RecipeCard from "@/components/common/RecipeCard/RecipeCard.component";
import { Recipe } from "@/entities/Recipe";
import { getRecipesByCategory } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { Href, router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function CategoryRecipesScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{ categoryId: string; categoryName?: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId && categoryName) {
      loadRecipes();
    }
  }, [categoryId]);

  const loadRecipes = async () => {
    setLoading(true);
    const recipes = await getRecipesByCategory(Number(categoryId));
    console.log("recipes", recipes);
    setRecipes(recipes);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: String(categoryName ?? "Recetas"), headerShown: true }} />
      <FlatList
        data={recipes}
        keyExtractor={(item: Recipe) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={(r) => router.push(`/categories/${categoryId}/${r.id}?recipeName=${encodeURIComponent(r.title)}` as Href)}
          />
        )}
        contentContainerStyle={recipes.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay recetas en esta categoría</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.gray400,
    textAlign: "center",
  },
});
