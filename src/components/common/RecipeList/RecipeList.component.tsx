import { Recipe } from "@/entities";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import RecipeCard from "../RecipeCard/RecipeCard.component";
import { styles } from "./RecipeList.style";

export interface RecipeListProps {
  recipes: Recipe[];
  notFoundItemText?: string;
  listHeaderComponent?: React.ComponentType<any> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;
}

export const RecipeList = ({ recipes, notFoundItemText, listHeaderComponent }: RecipeListProps) => (
  <FlatList
    ListHeaderComponent={listHeaderComponent}
    data={recipes}
    keyExtractor={(item: Recipe) => `${item.id}`}
    renderItem={({ item }) => (
      <RecipeCard
        recipe={item}
        onPress={(r) => router.push({ pathname: `/recipes/${r.id}` as RelativePathString, params: { recipeTitle: r.title } })}
      />
    )}
    contentContainerStyle={recipes.length === 0 ? styles.emptyContainer : undefined}
    ListEmptyComponent={
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{notFoundItemText || "No se encontraron recetas"}</Text>
      </View>
    }
    // style={{ margin: 5 }}
  />
);
