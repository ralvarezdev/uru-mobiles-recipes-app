import Loading from "@/components/common/Loading/Loading.component";
import { RecipeList } from "@/components/common/RecipeList/RecipeList.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Recipe } from "@/entities";
import { getRecipesByGroup } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const HeaderLeft = () => {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

export default function GroupDetailScreen() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadGroupRecipes();
  }, [groupId]);

  const loadGroupRecipes = async () => {
    setLoading(true);
    const recipes = await getRecipesByGroup(Number(groupId));
    setRecipes(recipes);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
          // headerLeft: HeaderLeft,
        }}
      />
      <Text style={styles.title}>Detalle del grupo</Text>
      <Text style={styles.text}>ID del grupo: {groupId}</Text>
      <RecipeList recipes={recipes} listHeaderComponent={<Text style={styles.subtitle}>Recetas</Text>} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#365C49",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#365C49",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#6B7C70",
  },
});
