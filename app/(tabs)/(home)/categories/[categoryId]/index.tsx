// app/(tabs)/(home)/categories/[categoryId]/index.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import type { Recipe } from '@/services/recipe/types';
import RecipeCard from 'components/RecipeCard';
import { theme } from '@/styles/Theme';
import { getRecipesByCategory } from '@/services/recipe/recipeServiceTest';

export default function CategoryRecipesScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{categoryId: string; categoryName?: string;}>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setRecipes(await getRecipesByCategory(String(categoryId)));
      setLoading(false);
    })();
  }, [categoryId]);

  if (loading) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:theme.colors.background}}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>;
  }

  return (
    <>
      <Stack.Screen options={{ title: String(categoryName ?? 'Recetas'), headerShown: true }} />
      <FlatList
        data={recipes}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={(r) => router.push(`/categories/${categoryId}/${r.id}` as any)} />
        )}
      />
    </>
  );
}
