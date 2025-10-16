// app/(tabs)/(home)/categories/[categoryId]/index.tsx
import Loading from "@/components/common/Loading/Loading.component";
import { RecipeList } from "@/components/common/RecipeList/RecipeList.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Recipe } from "@/entities/Recipe";
import { getRecipesByCategory } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function CategoryRecipesScreen() {
  const { categoryId, categoryTitle } = useLocalSearchParams<{ categoryId: string; categoryTitle?: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId && categoryTitle) {
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
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: categoryTitle, headerShown: true }} />
      <RecipeList recipes={recipes} />
      {/* <FlatList
        data={recipes}
        keyExtractor={(item: Recipe) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={(r) => router.push(`/recipes/${r.id}?recipeName=${encodeURIComponent(r.title)}` as Href)} />
        )}
        contentContainerStyle={recipes.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay recetas en esta categoría</Text>
          </View>
        }
      /> */}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
