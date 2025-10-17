import { GroupList } from "@/components/common/GroupList/GroupList.component";
import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Group, User } from "@/entities";
import { me } from "@/services/auth/authServiceTest";
import { getGroupsByUsername } from "@/services/group/groupServiceTest";
import { Ionicons } from "@expo/vector-icons";
import { Href, router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ItemSeparatorComponent = () => <View style={{ height: 12 }} />;

export default function MyGroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (user.username) {
      loadUserGroups();
    }
  }, [user]);

  const loadUserData = async () => {
    const user = await me();
    setUser(user);
  };

  const loadUserGroups = async () => {
    setLoading(true);
    const groups = await getGroupsByUsername(user.username);
    setGroups(groups);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  // const deleteGroup = (groupId: string) => {
  //   console.log("Delete group", groupId);
  //   // await api.delete(`/groups/${groupId}`)
  // };

  const handleAddGroup = () => {
    router.push("/(tabs)/profile/(my-cookbook)/groups/create" as Href);
  };

  // const handleOpenGroup = (group: Group) => {
  //   router.push({ pathname: "/(tabs)/(home)/groups/[groupId]", params: { groupId: group.id } });
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
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
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
      <GroupList groups={groups} showActionMenu={true} />
      {/* <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => (
          <GroupCard
            title={item.title}
            recipesCount={item.recipesCount}
            onPress={() => handleOpenGroup(item)}
            // onMenuPress={() => handleMenuPress(item)} // ← solo elimina
            testID={`group-card-${item.id}`}
          />
        )}
      /> */}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  headerContent: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  textContainer: { flex: 1, paddingRight: 12 },
  title: { fontSize: 32, fontWeight: "700", color: "#3A5A3D", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#8A9A8D", lineHeight: 20, fontWeight: "400", marginBottom: 10 },
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
