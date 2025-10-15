import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/entities";
import { getRecipes } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    const recipes = await getRecipes();
    setRecipes(recipes);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      {/* <Stack.Screen options={{ title: "Recipes", headerShown: true }} /> */}
      <FlatList
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
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: theme.colors.textDark,
  },
  loadingContainer: {
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
