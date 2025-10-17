import { Category } from "@/entities";
import React from "react";
import { FlatList, Text, View } from "react-native";
import CategoryCard from "../CategoryCard/CategoryCard.component";
import { styles } from "./CategoryList.style";

export interface CategoryListProps {
  categories: Category[];
  notFoundItemText?: string;
  listHeaderComponent?: React.ComponentType<any> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;
}
export const CategoryList = ({ categories, notFoundItemText, listHeaderComponent }: CategoryListProps) => {
  // const pathname = usePathname();

  // const handleOpenGroup = (group: Group) => {
  //   router.push({ pathname: "/(tabs)/(home)/groups/[groupId]", params: { groupId: group.id } });
  // };

  // const deleteGroup = (groupId: string) => {
  //   console.log("Delete group", groupId);
  //   // await api.delete(`/groups/${groupId}`)
  // };

  // const handleMenuPress = (group: Group) => {
  //   const confirmDelete = () =>
  //     Alert.alert("Delete group", `Are you sure you want to delete "${group.title}"? This action cannot be undone.`, [
  //       { text: "Cancel", style: "cancel" },
  //       { text: "Delete", style: "destructive", onPress: () => deleteGroup(group.id) },
  //     ]);

  //   if (Platform.OS === "ios") {
  //     ActionSheetIOS.showActionSheetWithOptions(
  //       {
  //         options: ["Cancel", "Delete group"],
  //         cancelButtonIndex: 0,
  //         destructiveButtonIndex: 1,
  //         title: group.title,
  //       },
  //       (idx) => {
  //         if (idx === 1) confirmDelete();
  //       }
  //     );
  //   } else {
  //     confirmDelete();
  //   }
  // };

  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      data={categories}
      renderItem={({ item }) => <CategoryCard category={item} />}
      keyExtractor={(item) => `${item.id}`}
      numColumns={2}
      columnWrapperStyle={styles.row}
      // contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{notFoundItemText || "No se encontraron grupos"}</Text>
        </View>
      }
    />
  );
};
