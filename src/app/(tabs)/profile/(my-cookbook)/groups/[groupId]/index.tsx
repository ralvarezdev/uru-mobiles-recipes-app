import GroupDetail from "@/components/common/GroupDetail/GroupDetail.component";
import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Group } from "@/entities";
import { groupService } from "@/services";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

export default function GroupScreen() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group>({} as Group);
  // const [recipes, setRecipes] = useState<Recipe[]>([]);

  const loadGroup = async () => {
    setLoading(true);
    const group = await groupService.getGroup(groupId);
    setGroup(group);
    setLoading(false);
  };

  useEffect(() => {
    loadGroup();
  }, [groupId]);

  // useEffect(() => {
  //   loadGroupRecipes();
  // }, [groupId]);

  // const loadGroupRecipes = async () => {
  //   setLoading(true);
  //   const recipes = await getRecipesByGroup(Number(groupId));
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
      {/* <Text style={styles.title}>Detalle del grupo</Text>
      <Text style={styles.text}>ID del grupo: {groupId}</Text>
      <RecipeList recipes={recipes} listHeaderComponent={<Text style={styles.subtitle}>Recetas</Text>} /> */}
      <GroupDetail group={group} />
    </ScreenContainer>
  );
}
