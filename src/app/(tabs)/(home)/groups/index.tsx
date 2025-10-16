import { GroupCard } from "@/components/common/GroupCard/GroupCard.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useCallback } from "react";
import { ActionSheetIOS, Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";

type GroupItem = { id: string; title: string; recipesCount?: number };

const MOCK: GroupItem[] = [
  { id: "1", title: "Personas con hambre", recipesCount: 13 },
  { id: "2", title: "Veganos felices", recipesCount: 8 },
  { id: "3", title: "Postres de domingo", recipesCount: 21 },
  { id: "4", title: "Cocina rápida", recipesCount: 5 },
  { id: "5", title: "Amantes del picante", recipesCount: 12 },
  { id: "6", title: "Cocina internacional", recipesCount: 7 },
  { id: "7", title: "Recetas familiares", recipesCount: 9 },
  { id: "8", title: "Cocina saludable", recipesCount: 15 },
];

const deleteGroup = (groupId: string) => {
  console.log("Delete group", groupId);
  // await api.delete(`/groups/${groupId}`)
};

export default function GroupsScreen() {
  const handleAddGroup = useCallback(() => {
    router.push("/(tabs)/(home)/groups/create");
  }, []);

  const handleOpenGroup = useCallback((group: GroupItem) => {
    router.push({ pathname: "/(tabs)/(home)/groups/[groupId]", params: { groupId: group.id } });
  }, []);

  const handleMenuPress = useCallback((group: GroupItem) => {
    const confirmDelete = () =>
      Alert.alert("Delete group", `Are you sure you want to delete "${group.title}"? This action cannot be undone.`, [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteGroup(group.id) },
      ]);

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Delete group"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 1,
          title: group.title,
        },
        (idx) => {
          if (idx === 1) confirmDelete();
        }
      );
    } else {
      confirmDelete();
    }
  }, []);

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Groups</Text>
            <Text style={styles.subtitle}>Create and share groups with others or simply browse and follow any group of interesting to you.</Text>
          </View>
          <Pressable style={styles.addButton} onPress={handleAddGroup} accessibilityLabel="Crear grupo">
            <Ionicons name="add" size={20} color="#4A5F4D" />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={MOCK}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <GroupCard
            title={item.title}
            recipesCount={item.recipesCount}
            onPress={() => handleOpenGroup(item)}
            onMenuPress={() => handleMenuPress(item)} // ← solo elimina
            testID={`group-card-${item.id}`}
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  headerContent: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  textContainer: { flex: 1, paddingRight: 12 },
  title: { fontSize: 32, fontWeight: "700", color: "#3A5A3D", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#8A9A8D", lineHeight: 20, fontWeight: "400" },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4A5F4D",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
});
