import { RecipeList } from "@/components/common/RecipeList/RecipeList.component";
import { Group, Recipe } from "@/entities";
import { getRecipesByGroup } from "@/services/recipe/recipeServiceTest";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Loading from "../Loading/Loading.component";
import { styles } from "./GroupDetail.style";

export interface GroupDetailProps {
  group: Group;
}

export default function GroupDetail({ group }: Readonly<GroupDetailProps>) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadGroupRecipes();
  }, []);

  const loadGroupRecipes = async () => {
    setLoading(true);
    console.log("loadRecipes");
    const recipes = await getRecipesByGroup(Number(group.id));
    console.log("recipes", recipes);
    setRecipes(recipes);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text style={styles.title}>Detalle del grupo</Text>
      {/* <Text style={styles.text}>ID: {group.id}</Text> */}
      <Text style={styles.text}>Title: {group.title}</Text>
      <Text style={styles.text}>Author: {group.author}</Text>
      <RecipeList recipes={recipes} showActionMenu={true} listHeaderComponent={<Text style={styles.subtitle}>Recetas</Text>} />
    </View>
  );
}
