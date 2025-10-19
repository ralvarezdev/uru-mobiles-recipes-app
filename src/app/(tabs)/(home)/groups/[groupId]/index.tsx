import GroupDetail from "@/components/common/GroupDetail/GroupDetail.component";
import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Group, Recipe } from "@/entities";
import { groupService } from "@/services";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

export default function GroupDetailScreen() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group>({} as Group);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const loadGroup = async () => {
    setLoading(true);
    const group = await groupService.getGroup(Number(groupId));
    setGroup(group);
    setLoading(false);
  };

  useEffect(() => {
    loadGroup();
  }, [groupId]);

  // useEffect(() => {
  //   if (group.id) {
  //     loadGroupRecipes();
  //   }
  // }, [group]);

  // const loadGroupRecipes = async () => {
  //   setLoading(true);
  //   const recipes = await recipeService.getRecipesByGroup(Number(groupId));
  //   setRecipes(recipes);
  //   setLoading(false);
  // };

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
      {/* <Text style={styles.title}>Detalle del grupo</Text> */}
      {/* <Text style={styles.text}>ID del grupo: {groupId}</Text>
      <RecipeList recipes={recipes} listHeaderComponent={<Text style={styles.title}>Recetas</Text>} /> */}
      <GroupDetail group={group} />
    </ScreenContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: { fontSize: 32, fontWeight: "700", color: "#3A5A3D", marginBottom: 8 },
//   // title: {
//   //   fontSize: 24,
//   //   fontWeight: "700",
//   //   color: "#365C49",
//   //   marginBottom: 10,
//   // },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#365C49",
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     color: "#6B7C70",
//   },
// });
