import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import RecipeDetail from "@/components/RecipeDetail";
import { Recipe } from "@/entities/Recipe";
import { getRecipeById } from "@/services/recipe/recipeServiceTest";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

export default function RecipeDetailScreen() {
  const { recipeId, recipeTitle } = useLocalSearchParams<{ recipeId: string; recipeTitle: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipeId && recipeTitle) {
      loadRecipe();
    }
  }, [recipeId]);

  const loadRecipe = async () => {
    setLoading(true);
    const recipe = await getRecipeById(Number(recipeId));
    setRecipe(recipe);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: "", headerShown: true }} />
      {recipe ? <RecipeDetail recipe={recipe} /> : <Text style={{ padding: 16 }}>No se encontró la receta.</Text>}
    </ScreenContainer>
  );
}
