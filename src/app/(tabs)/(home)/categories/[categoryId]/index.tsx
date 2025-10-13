// app/(tabs)/(home)/categories/[categoryId]/index.tsx
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/entities/Recipe";
import { getRecipesByCategory } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { Href, router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet } from "react-native";

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
    const recipes = await getRecipesByCategory(String(categoryId));
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
    <View style={styles.container}>
      <Stack.Screen options={{ title: String(categoryName ?? "Recetas"), headerShown: true }} />
      <FlatList
        data={recipes}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <RecipeCard 
            recipe={item} 
            onPress={(r) => router.push(`/categories/${categoryId}/${r.id}?recipeName=${encodeURIComponent(r.title)}` as Href)} 
          />
        )}
        contentContainerStyle={recipes.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay recetas en esta categoría
            </Text>
          </View>
        }
      />
    </View>
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