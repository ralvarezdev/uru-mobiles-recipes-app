// app/(tabs)/(home)/categories/[categoryId]/index.tsx
import RecipeCard from "@/components/RecipeCard";
import { getRecipesByCategory } from "@/services/recipe/recipeServiceTest";
import type { Recipe } from "@/services/recipe/types";
import { theme } from "@/styles/Theme";
// import RecipeCard from "components/RecipeCard";
import { Href, router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function CategoryRecipesScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{ categoryId: string; categoryName?: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId && categoryName) {
      loadRecipes();
    }
    // (async () => {
    //   setLoading(true);
    //   setRecipes(await getRecipesByCategory(String(categoryId)));
    //   setLoading(false);
    // })();
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: String(categoryName ?? "Recetas"), headerShown: true }} />
      <FlatList
        data={recipes}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <RecipeCard recipe={item} onPress={(r) => router.push(`/categories/${categoryId}/${r.id}` as Href)} />}
      />
    </>
  );
}
