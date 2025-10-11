// app/(tabs)/(home)/categories/[categoryId]/[recipeId].tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import type { Recipe } from '@/services/recipe/types';
import { theme } from '@/styles/Theme';
import { getRecipeById } from '@/services/recipe/recipeServiceTest';
import RecipeDetail from 'components/RecipeDetail';

export default function RecipeDetailScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getRecipeById(String(recipeId)); // Recipe | null
      setRecipe(data); // ✅ sin undefined
      setLoading(false);
    })();
  }, [recipeId]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ title: '', headerShown: true }} />
      {loading ? (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
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
