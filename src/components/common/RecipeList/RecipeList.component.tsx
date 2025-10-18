import { Recipe } from "@/entities";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import RecipeCard from "../RecipeCard/RecipeCard.component";
import { styles } from "./RecipeList.style";

export interface RecipeListProps {
  recipes: Recipe[];
  notFoundItemText?: string;
  listHeaderComponent?: React.ComponentType<any> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;

  /** --- Selección opcional --- */
  selectable?: boolean;
  selectionMode?: "single" | "multiple";
  initialSelectedIds?: Array<Recipe["id"]>;
  onSelectionChange?: (ids: Array<Recipe["id"]>) => void;
  maxSelected?: number;
}

export const RecipeList = ({
  recipes,
  notFoundItemText,
  listHeaderComponent,
  selectable = false,
  selectionMode = "multiple",
  initialSelectedIds = [],
  onSelectionChange,
  maxSelected,
}: RecipeListProps) => {
  const [selectedIds, setSelectedIds] = useState<Array<Recipe["id"]>>(initialSelectedIds);

  const isSelected = (id: Recipe["id"]) => selectedIds.includes(id);

  const toggleSelect = (id: Recipe["id"]) => {
    if (!selectable) return;

    setSelectedIds((prev) => {
      let next: Array<Recipe["id"]>;
      if (selectionMode === "single") {
        next = isSelected(id) ? [] : [id];
      } else {
        const exists = prev.includes(id);
        if (exists) next = prev.filter((x) => x !== id);
        else {
          if (typeof maxSelected === "number" && prev.length >= maxSelected) return prev;
          next = [...prev, id];
        }
      }
      onSelectionChange?.(next);
      return next;
    });
  };

  const renderItem = ({ item }: { item: Recipe }) => {
    const selected = isSelected(item.id);

    return (
      <View style={styles.itemWrapper}>
        <Pressable onPress={() => toggleSelect(item.id)}>
          <RecipeCard
            recipe={item}
            // @ts-expect-error — por si RecipeCard no tiene estas props
            selected={selected}
          />
        </Pressable>

        {selectable && (
          <Pressable
            hitSlop={10}
            onPress={() => toggleSelect(item.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected }}
            style={styles.checkboxContainer}>
            <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
              {selected && <MaterialIcons name="check" size={16} color="#fff" />}
            </View>
          </Pressable>
        )}
      </View>
    );
  };

  const contentStyle = useMemo(() => (recipes.length === 0 ? styles.emptyContainer : undefined), [recipes.length]);

  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      data={recipes}
      keyExtractor={(item: Recipe) => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={contentStyle}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{notFoundItemText || "No se encontraron recetas"}</Text>
        </View>
      }
    />
  );
};
