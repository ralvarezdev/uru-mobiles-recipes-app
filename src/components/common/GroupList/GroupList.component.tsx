import { Group } from "@/entities";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { GroupCard } from "../GroupCard/GroupCard.component";
import { ItemSeparator } from "../ItemSeparatorComponent/ItemSeparator.component";
import { styles } from "./GroupList.style";

export interface GroupListProps {
  groups: Group[];
  notFoundItemText?: string;
  showActionMenu: boolean;
  listHeaderComponent?: React.ComponentType<any> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | null;
}
export const GroupList = ({ groups, notFoundItemText, listHeaderComponent, showActionMenu }: GroupListProps) => {
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
      data={groups}
      keyExtractor={(item) => `${item.id}`}
      // contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <GroupCard
          // title={item.title}
          // recipesCount={item.recipesCount}
          group={item}
          showActionMenu={showActionMenu}
          // onPress={() => handleOpenGroup(item)}
          // onMenuPress={() => handleMenuPress(item)} // ← solo elimina
          // testID={`group-card-${item.id}`}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{notFoundItemText || "No se encontraron grupos"}</Text>
        </View>
      }
    />
  );
};
