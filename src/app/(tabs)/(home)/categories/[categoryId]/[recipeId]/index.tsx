// app/(tabs)/(home)/categories/[categoryId]/[recipeId].tsx
import RecipeDetail from "@/components/RecipeDetail";
import { Recipe } from "@/entities/Recipe";
import { getRecipeById } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
// import RecipeDetail from 'components/RecipeDetail';

export default function RecipeDetailScreen() {
  const { recipeId, recipeName } = useLocalSearchParams<{ recipeId: string; recipeName: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipeId && recipeName) {
      loadRecipe();
    }
  }, [recipeId]);

  const loadRecipe = async () => {
    setLoading(true);
    const recipe = await getRecipeById(String(recipeId));
    console.log("recipe", recipe);
    setRecipe(recipe);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.gray400 }}>
      <Stack.Screen options={{ title: "", headerShown: true }} />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : recipe ? (
        <RecipeDetail recipe={recipe} />
      ) : (
        <Text style={{ padding: 16 }}>No se encontró la receta.</Text>
      )}
    </View>
  );
}
