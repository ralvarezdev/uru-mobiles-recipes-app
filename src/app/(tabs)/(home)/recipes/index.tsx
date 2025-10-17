import Loading from "@/components/common/Loading/Loading.component";
import { RecipeList } from "@/components/common/RecipeList/RecipeList.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Recipe } from "@/entities";
import { getRecipes } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

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
      <RecipeList recipes={recipes} listHeaderComponent={<Text style={styles.title}>Recipes</Text>} />
      {/* <FlatList
        data={recipes}
        keyExtractor={(item: Recipe) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={(r) => router.push({ pathname: `/recipes/${r.id}` as RelativePathString, params: { recipeTitle: r.title } })}
          />
        )}
        contentContainerStyle={recipes.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay recetas en esta categoría</Text>
          </View>
        }
        style={{ margin: 5 }}
      /> */}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 32, fontWeight: "700", color: "#3A5A3D", marginBottom: 8 },
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
