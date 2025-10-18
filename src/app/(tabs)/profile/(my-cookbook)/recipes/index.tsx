import Loading from "@/components/common/Loading/Loading.component";
import { RecipeList } from "@/components/common/RecipeList/RecipeList.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Recipe, User } from "@/entities";
import { me } from "@/services/auth/authServiceTest";
import { getRecipesByUsername } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function MyRecipesScreen() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    if (user?.username) {
      loadRecipes(user?.username);
    }
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await me();
    setUser(user);
  };

  const loadRecipes = async (username: string) => {
    setLoading(true);
    const recipes = await getRecipesByUsername(username);
    setRecipes(recipes);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <RecipeList recipes={recipes} showActionMenu={true} listHeaderComponent={<Text style={styles.title}>Recipes</Text>} />
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
  scrollContent: {
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    color: theme.colors.textDark,
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
  title: { fontSize: 32, fontWeight: "700", color: "#3A5A3D", marginBottom: 8 },
});
