import { Recipe } from "@/entities";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, router, usePathname } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ActionMenu } from "../ActionMenu/ActionMenu.component";
import { styles } from "./RecipeCard.style";

interface RecipeCardProps {
  recipe: Recipe;
  showActionMenu: boolean;
}

export default function RecipeCard({ recipe, showActionMenu }: Readonly<RecipeCardProps>) {
  const pathname = usePathname();
  const handleOnPress = () => {
    console.log(`${pathname}/${recipe.id}`);
    router.push({
      pathname: `${pathname}/${recipe.id}` as RelativePathString,
      params: { recipeTitle: recipe.title },
    });
  };
  const handleOnDelete = () => {};
  const handleOnEdit = () => {};
  const actions = [
    // { text: "Add recipe", action: handleOnAddRecipe },
    { text: "Edit recipe", action: handleOnEdit },
    { text: "Delete recipe", action: handleOnDelete },
  ];

  return (
    <View style={styles.shadowWrap}>
      <TouchableOpacity style={styles.card} onPress={handleOnPress} activeOpacity={0.8}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>
          <View style={styles.info}>
            <Ionicons name="time-outline" size={16} color={theme.colors.textMuted} />
            <Text style={styles.time}>
              {recipe.prepareTime} {recipe.unitPrepareTime}
            </Text>
            <Ionicons name="person" size={16} color={theme.colors.textMuted} />
            <Text style={styles.time}>{recipe.author}</Text>
          </View>
        </View>
        <ActionMenu show={showActionMenu} actions={actions} optionIconColor={"fff"} iconStyle={{ bottom: -80, left: -10 }} />
      </TouchableOpacity>
    </View>
  );
}
