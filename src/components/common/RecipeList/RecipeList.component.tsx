import { Recipe } from "@/entities";
import React from "react";
import { FlatList, Text, View } from "react-native";
import RecipeCard from "../RecipeCard/RecipeCard.component";
import { styles } from "./RecipeList.style";

export interface RecipeListProps {
  recipes: Recipe[];
  notFoundItemText?: string;
  listHeaderComponent?: React.ComponentType<any> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;
}

export const RecipeList = ({ recipes, notFoundItemText, listHeaderComponent }: RecipeListProps) => {
  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      data={recipes}
      keyExtractor={(item: Recipe) => `${item.id}`}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      contentContainerStyle={recipes.length === 0 ? styles.emptyContainer : undefined}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{notFoundItemText || "No se encontraron recetas"}</Text>
        </View>
      }
    />
  );
};
